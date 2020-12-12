package com.supermarket.product.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.supermarket.product.dao.ProductDao;
import com.supermarket.common.domain.Product;
import com.supermarket.common.vo.SupermarketResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class ProductServiceImpl implements ProductService{
    @Autowired
    private ProductDao productDao = null;

    @Autowired
    private StringRedisTemplate template = null;

    @Autowired
    private ObjectMapper mapper = null;

    @Override
    public SupermarketResult queryByPage(Integer page, Integer rows) {
        // 非框架类对象不建议从容器中拿
        Integer total = this.productDao.selectCount();
        int start = (page - 1) * rows;
        List<Product> products = this.productDao.queryProductsByPage(start, rows);
        SupermarketResult result = new SupermarketResult();
        result.setRows(products);
        result.setTotal(total);
        return result;
    }

    @Override
    public Product queryByProductId(String productId) throws IOException {
        // TODO 使用redis缓存商品信息
        Boolean exits = null;
        try {
            exits = this.template.hasKey("PROD_" + productId);
        }catch (RedisConnectionFailureException e){
            // redis未连接
            return this.productDao.queryByProductId(productId);
        }
        if (exits == null || !exits) {
            // 如果redis中没有数据，查出来之后缓存进redis
            Product product = this.productDao.queryByProductId(productId);
            this.template.opsForValue().set("PROD_" + productId, this.mapper.writeValueAsString(product), 30, TimeUnit.MINUTES);
            return product;
        }else {
            // 如果redis有数据，直接从redis中拿数据
            return this.mapper.readValue(this.template.opsForValue().get("PROD_" + productId), Product.class);
        }
    }

    @Override
    public void addProduct(Product product) {
        UUID uuid = UUID.randomUUID();
        product.setProductId(String.valueOf(uuid));
        this.productDao.insertProduct(product);
    }

    @Override
    public void updateProduct(Product product) throws JsonProcessingException {
        this.productDao.updateProduct(product);
    }

    @Override
    public List<Product> queryProducts() {
        return this.productDao.selectProducts();
    }
}
