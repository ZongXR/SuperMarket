package com.supermarket.product.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.supermarket.common.domain.Product;
import com.supermarket.common.vo.SupermarketResult;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    /**
     * 分页查询
     * @param page 查询第几页
     * @param rows 查询几条
     * @return SupermarketResult
     */
    public SupermarketResult queryByPage(Integer page, Integer rows);

    /**
     * 查询单个商品
     * @param productId 商品id
     * @return 查询出的商品
     */
    public Product queryByProductId(String productId) throws IOException;

    /**
     * 商品新增
     * @param product 新增的商品
     */
    public void addProduct(Product product);

    /**
     * 修改商品
     * @param product 修改的商品
     */
    public void updateProduct(Product product) throws JsonProcessingException;

    /**
     * 查询全部商品
     * @return 全部商品列表
     */
    public List<Product> queryProducts();
}
