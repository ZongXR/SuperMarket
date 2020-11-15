package com.supermarket.cart.service;

import com.supermarket.common.domain.Cart;

import java.util.List;

public interface CartService {
    /**
     * 查询用户购物车中的商品
     * @param userId 用户id
     * @return 购物车中的商品
     */
    public List<Cart> queryCart(String userId);

    /**
     * 新增购物车：先去查询该商品；再去查询购物车有无该商品，有则update，无则insert
     * @param cart 购物车
     */
    public void addCart(Cart cart);

    /**
     * 更新购物车数据
     * @param cart 购物车
     */
    public void update(Cart cart);

    /**
     * 删除购物车
     * @param cart 购物车
     */
    public void delete(Cart cart);
}
