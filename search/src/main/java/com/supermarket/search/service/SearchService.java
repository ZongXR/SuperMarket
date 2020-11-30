package com.supermarket.search.service;

import com.supermarket.common.domain.Product;

import java.util.List;

public interface SearchService {
    /**
     * 分页查询
     * @param query 查询词
     * @param page 起始页
     * @param rows 条目数
     * @return 查询结果
     */
    public List<Product> searchProducts(String query, Integer page, Integer rows);

    /**
     * 创建索引
     * @param indexName 索引名称
     * @param type 类型名称
     */
    public void createIndex(Class<? extends Object> type);

    /**
     * 删除索引
     * @param indexName 索引名称
     */
    public void deleteIndex(String indexName);

    /**
     * 删除索引
     * @param type 索引 - 类型
     */
    public void deleteIndex(Class<? extends Object> type);

    /**
     * 批量增加文档
     * @param products 要添加的文档对象
     */
    public void addProducts(List<Product> products);

    /**
     * 增加一个文档
     * @param product 文档对象
     */
    public void addProduct(Product product);

    /**
     * 删除文档
     * @param product 商品
     */
    public void deleteProduct(Product product);
}
