package com.supermarket.order.controller;

import com.supermarket.common.domain.Order;
import com.supermarket.common.vo.SysResult;
import com.supermarket.order.exception.MsgException;
import com.supermarket.order.service.OrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@Api(tags = "订单微服务")
//@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService = null;

    /**
     * 新增订单
     * @param order bean缺少orderId
     * @return vo
     */
    @ApiOperation("新增订单")
    @ApiImplicitParam(name = "order", value = "订单的bean")
    @RequestMapping(value = "/manage/save", method = RequestMethod.POST)
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
    @ApiOperation("订单查询")
    @ApiImplicitParam(name = "userId", value = "用户id")
    @RequestMapping(value = "/manage/query/{userId}", method = RequestMethod.GET)
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
    @ApiOperation("删除订单")
    @ApiImplicitParam(name = "orderId", value = "订单id")
    @RequestMapping(value = "/manage/delete/{orderId}", method = RequestMethod.GET)
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
