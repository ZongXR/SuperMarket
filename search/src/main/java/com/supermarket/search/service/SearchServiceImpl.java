package com.supermarket.search.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.supermarket.common.domain.Product;
import com.supermarket.search.dao.ProductDao;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.elasticsearch.index.query.QueryBuilders.multiMatchQuery;

@Service
public class SearchServiceImpl implements SearchService{

    @Autowired
    private ElasticsearchTemplate elasticsearchTemplate = null;

    @Autowired
    private ProductDao productDao = null;

    @Autowired
    private RestTemplate restTemplate = null;

    @Autowired
    private ObjectMapper mapper = null;

    @Override
    public List<Product> searchProducts(String query, Integer page, Integer rows) {
        int start = (page - 1) * rows;
        SearchQuery searchQuery = new NativeSearchQueryBuilder()
                .withQuery(multiMatchQuery(query, "productName", "productCategory", "productDescription"))
                .withPageable(PageRequest.of(start, rows))
                .build();
        return this.elasticsearchTemplate.queryForList(searchQuery, Product.class);
    }

    @Override
    public void createIndex(Class<? extends Object> type) {
        if(this.elasticsearchTemplate.typeExists("supermarket", type.getSimpleName()))
            return;
        // 创建索引
        this.elasticsearchTemplate.createIndex(type);
        // 创建Mapping
        this.elasticsearchTemplate.putMapping(type);
        // 添加文档
        Product[] products = this.restTemplate.getForObject(
                "http://product/manage/query",
                Product[].class
        );
        if (products == null)
            return;
        List<Product> productList = Arrays.asList(products);
        this.addProducts(productList);
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
