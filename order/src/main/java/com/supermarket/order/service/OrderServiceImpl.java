package com.supermarket.order.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.supermarket.common.domain.Order;
import com.supermarket.common.domain.OrderItem;
import com.supermarket.common.vo.SysResult;
import com.supermarket.order.dao.OrderDao;
import com.supermarket.order.exception.MsgException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderDao orderDao = null;

    @Autowired
    private CartService cartService = null;

    @Autowired
    private ObjectMapper mapper = null;

    @Override
    public void addOrder(Order order) throws Exception {
        order.setOrderId(UUID.randomUUID().toString());
        order.setOrderTime(new Date());
        order.setOrderPaystate(0);
        List<OrderItem> items = order.getOrderItems();
        List<String> productIds = new LinkedList<String>();
        List<Integer> productNums  = new LinkedList<Integer>();
        for (OrderItem item : items) {
            productIds.add(item.getProductId());
            productNums.add(item.getNum());
        }
        SysResult result = this.cartService.getMoney(
                this.mapper.writeValueAsString(productIds),
                this.mapper.writeValueAsString(productNums),
                order.getUserId()
        );
        if (result == null){
            throw new MsgException("查询出错");
        }
        if (result.getStatus() == 200){
            Double money = (Double) result.getData();
            if (Math.abs(money - order.getOrderMoney()) > 0.0001)
                throw new MsgException("后端金额校验出错");
            this.orderDao.addOrderAndItem(order);
        }else{
            Exception e = (Exception) result.getData();
            if (e == null)
                throw new MsgException("e是空指针");
            else
                throw e;
        }
    }

    @Override
    public List<Order> queryOrder(String userId) {
        // TODO 先用userId查orderId，再用orderId查商品
        List<Order> orders = this.orderDao.selectOrder(new Order(null, null, null, null, null, userId));
        for (Order order : orders) {
            List<OrderItem> orderItems = this.orderDao.selectOrderItems(new OrderItem(
                    null, order.getOrderId(), null, null, null, null, null
            ));
            order.setOrderItems(orderItems);
        }
        return orders;
    }

    @Override
    public void deleteOrder(String orderId) {
        this.orderDao.deleteOrder(new Order(
                orderId, null, null, null, null, null
        ));
        this.orderDao.deleteOrderItems(new Order(
                orderId, null, null, null, null, null
        ));
    }
}
