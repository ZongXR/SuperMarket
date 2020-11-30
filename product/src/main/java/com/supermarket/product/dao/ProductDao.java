package com.supermarket.product.dao;

import com.supermarket.common.domain.Product;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDao {
    /**
     * 统计有多少商品
     * @return 商品总数
     */
    public Integer selectCount();

    /**
     * 分页查询
     * @param start 起始的商品条目
     * @param rows 查询的数量
     * @return 商品列表
     */
    public List<Product> queryProductsByPage(@Param("start") int start, @Param("rows") Integer rows);

    /**
     * 查询单个商品
     * @param productId 商品id
     * @return 单个商品
     */
    public Product queryByProductId(@Param("productId") String productId);

    /**
     * 商品新增
     * @param product 新增的商品
     */
    public void insertProduct(Product product);

    /**
     * 商品修改
     * @param product 修改的商品
     */
    public void updateProduct(Product product);

    /**
     * 查询全部商品
     * @return 全部商品列表
     */
    public List<Product> selectProducts();
}
