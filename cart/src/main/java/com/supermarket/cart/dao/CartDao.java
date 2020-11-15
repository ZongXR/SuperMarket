package com.supermarket.cart.dao;

import com.supermarket.common.domain.Cart;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDao {

    /**
     * 查询购物车中的商品
     * @param cart bean
     * @return 购物车中的商品
     */
    public List<Cart> selectCarts(Cart cart);

    /**
     * 查询购物车中的商品
     * @param userId 用户名
     * @return 购物车中的商品
     */
    public List<Cart> selectCarts(
            @Param("id") Integer id,
            @Param("userId") String userId,
            @Param("productId") String productId,
            @Param("productImage") String productImage,
            @Param("productName") String productName,
            @Param("productPrice") Double productPrice,
            @Param("num") Integer num
    );

    /**
     * 新增商品
     * @param cart 要加入的商品
     */
    public void insert(Cart cart);

    /**
     * 加入已有的商品
     * @param cart 要新增的商品
     */
    public void updateCart(Cart cart);

    /**
     * 更新购物车数据
     * @param cart 新的购物车数据
     */
    public void update(Cart cart);

    /**
     * 删除购物车数据
     * @param cart 购物车数据
     */
    public void delete(Cart cart);
}
