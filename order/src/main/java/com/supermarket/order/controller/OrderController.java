package com.supermarket.order.controller;

import com.supermarket.common.domain.Order;
import com.supermarket.common.vo.SysResult;
import com.supermarket.order.exception.MsgException;
import com.supermarket.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
//@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService = null;

    /**
     * 新增订单
     * @param order bean缺少orderId
     * @return vo
     */
    @RequestMapping("/manage/save")
    @ResponseBody
    public SysResult addOrder(
            Order order
    ){
        try{
            this.orderService.addOrder(order);
            return SysResult.ok();
        }catch (MsgException e){
            return SysResult.build(201, e.getMessage(), e);
        }catch (Exception e){
            e.printStackTrace();
            return SysResult.build(500, e.getMessage(), e);
        }
    }

    /**
     * 订单查询
     * @param userId 用户id
     * @return 订单列表
     */
    @RequestMapping("/manage/query/{userId}")
    @ResponseBody
    public List<Order> orderQuery(
            @PathVariable("userId") String userId
    ){
        return this.orderService.queryOrder(userId);
    }

    /**
     * 删除订单
     * @param orderId 用户id
     * @return vo
     */
    @RequestMapping("/manage/delete/{orderId}")
    @ResponseBody
    public SysResult deleteOrder(
            @PathVariable("orderId") String orderId
    ){
        try {
            this.orderService.deleteOrder(orderId);
            return SysResult.ok();
        }catch (MsgException e){
            return SysResult.build(201, e.getMessage(), e);
        }catch (Exception e){
            e.printStackTrace();
            return SysResult.build(500, e.getMessage(), e);
        }
    }
}
