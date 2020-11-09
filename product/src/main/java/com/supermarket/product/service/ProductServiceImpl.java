package com.supermarket.product.service;

import com.supermarket.product.dao.ProductDao;
import com.supermarket.common.domain.Product;
import com.supermarket.common.vo.SupermarketResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService{
    @Autowired
    private ProductDao productDao = null;

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
    public Product queryByProductId(String productId) {
        return this.productDao.queryByProductId(productId);
    }

    @Override
    public void addProduct(Product product) {
        UUID uuid = UUID.randomUUID();
        product.setProductId(String.valueOf(uuid));
        this.productDao.insertProduct(product);
    }

    @Override
    public void updateProduct(Product product) {
        this.productDao.updateProduct(product);
    }
}
