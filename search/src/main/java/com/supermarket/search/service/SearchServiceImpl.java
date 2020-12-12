package com.supermarket.search.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.supermarket.common.domain.Product;
import com.supermarket.search.dao.ProductDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.stereotype.Service;
import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.multiMatchQuery;

@Service
public class SearchServiceImpl implements SearchService{

    @Autowired
    private ElasticsearchTemplate elasticsearchTemplate = null;

    @Autowired
    private ProductDao productDao = null;

    @Autowired
    private ProductService productService = null;

    @Autowired
    private ObjectMapper mapper = null;

    @Override
    public List<Product> searchProducts(String query, Integer page, Integer rows) {
        SearchQuery searchQuery = new NativeSearchQueryBuilder()
                .withQuery(multiMatchQuery(query, "productName", "productCategory", "productDescription"))
                .withPageable(PageRequest.of(page - 1, rows))
                .build();
        return this.elasticsearchTemplate.queryForList(searchQuery, Product.class);
    }

    @Override
    public void createIndex(Class<? extends Object> type) {
        // 创建索引
        this.elasticsearchTemplate.createIndex(type);
        // 创建Mapping
        this.elasticsearchTemplate.putMapping(type);
        // 添加文档
        List<Product> products = this.productService.queryProducts();
        if (products == null)
            return;
        this.addProducts(products);
    }

    @Override
    public void deleteIndex(String indexName) {
        this.elasticsearchTemplate.deleteIndex(indexName);
    }

    @Override
    public void deleteIndex(Class<?> type) {
        this.elasticsearchTemplate.deleteIndex(type);
    }

    @Override
    public void deleteProduct(Product product){
        this.elasticsearchTemplate.delete(Product.class, product.getProductId());
    }

    @Override
    public void addProducts(List<Product> products) {
        this.productDao.saveAll(products);
    }

    @Override
    public void addProduct(Product product) {
        this.productDao.save(product);
    }
}
