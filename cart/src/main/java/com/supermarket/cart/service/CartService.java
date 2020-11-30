package com.supermarket.cart.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.supermarket.common.domain.Cart;
import com.supermarket.common.domain.OrderItem;

import java.io.IOException;
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

    /**
     * 获取真实价钱，并进行数量校验
     * @param productIds 商品id列表
     * @param productNums 商品数量列表
     * @param userId 用户id
     * @return 总钱数
     */
    public Double getMoney(String productIds, String productNums, String userId) throws IOException;
}
