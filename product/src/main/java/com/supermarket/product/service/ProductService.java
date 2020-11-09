package com.supermarket.product.service;

import com.supermarket.common.domain.Product;
import com.supermarket.common.vo.SupermarketResult;

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
    public Product queryByProductId(String productId);

    /**
     * 商品新增
     * @param product 新增的商品
     */
    public void addProduct(Product product);

    /**
     * 修改商品
     * @param product 修改的商品
     */
    public void updateProduct(Product product);
}
