package com.supermarket.order.service;

import com.supermarket.common.domain.Order;
import com.supermarket.common.domain.Product;

import java.util.List;

public interface OrderService {
    /**
     * 新增订单
     * @param order bean 缺少orderId
     */
    public void addOrder(Order order) throws Exception;

    /**
     * 查询用户订单
     * @param userId 用户id
     * @return 用户订单列表
     */
    public List<Order> queryOrder(String userId);

    /**
     * 删除用户订单
     * @param orderId 用户id
     */
    public void deleteOrder(String orderId);

}
