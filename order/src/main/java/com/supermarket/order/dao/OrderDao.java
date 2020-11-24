package com.supermarket.order.dao;

import com.supermarket.common.domain.Order;
import com.supermarket.common.domain.OrderItem;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface OrderDao {
    /**
     * 增加订单和商品
     * @param order bean
     */
    public void addOrderAndItem(Order order);

    /**
     * 增加订单
     * @param order bean
     */
    public void addOrder(Order order);

    /**
     * 查询订单
     * @param order bean
     * @return 订单列表
     */
    public List<Order> selectOrder(Order order);

    /**
     * 查看订单总金额
     * @param order
     * @return 总金额
     */
    public Double selectItemsMoney(OrderItem orderItem);

    /**
     * 查询订单商品
     * @param orderItem 订单商品
     * @return 符合条件的订单商品
     */
    public List<OrderItem> selectOrderItems(OrderItem orderItem);

    /**
     * 删除订单
     * @param order 订单
     */
    public void deleteOrder(Order order);

    /**
     * 删除订单商品
     * @param order 订单
     */
    public void deleteOrderItems(Order order);
}
