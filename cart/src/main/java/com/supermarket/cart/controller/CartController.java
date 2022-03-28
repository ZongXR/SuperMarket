package com.supermarket.cart.controller;

import com.supermarket.cart.exception.MsgException;
import com.supermarket.cart.service.CartService;
import com.supermarket.common.domain.Cart;
import com.supermarket.common.domain.OrderItem;
import com.supermarket.common.vo.SysResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@Api(tags = "购物车微服务")
//@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService = null;

    /**
     * 购物车中的商品查询
     * @param userId 用户编号
     * @return 购物车中的商品
     */
    @ApiOperation("购物车中的商品查询")
    @ApiImplicitParam(name = "userId", value = "用户id")
    @RequestMapping(value = "/manage/query", method = RequestMethod.GET)
    @ResponseBody
    public List<Cart> queryCart(
            @RequestParam("userId") String userId
    ){
        return this.cartService.queryCart(userId);
    }

    /**
     * 加入购物车
     * @param cart 购物车
     * @return vo
     */
    @ApiOperation("加入购物车")
    @ApiImplicitParam(name = "cart", value = "购物车的bean")
    @RequestMapping(value = "/manage/save", method = RequestMethod.POST)
    @ResponseBody
    public SysResult addCart(
            Cart cart
    ){
        try {
            this.cartService.addCart(cart);
            return SysResult.ok();
        }catch (MsgException e) {
            return SysResult.build(201, e.getMessage(), e);
        }catch(Exception e){
            e.printStackTrace();
            return SysResult.build(500, e.getMessage(), e);
        }
    }

    /**
     * 更新购物车
     * @param cart 新的购物车数据
     * @return vo
     */
    @ApiOperation("更新购物车")
    @ApiImplicitParam(name = "cart", value = "购物车的bean")
    @RequestMapping(value = "/manage/update", method = RequestMethod.GET)
    @ResponseBody
    public SysResult updateCart(
            Cart cart
    ){
        try{
            this.cartService.update(cart);
            return SysResult.ok();
        }catch (MsgException e){
            return SysResult.build(201, e.getMessage(), e);
        }catch(Exception e){
            e.printStackTrace();
            return SysResult.build(500, e.getMessage(), e);
        }
    }

    /**
     * 删除购物车
     * @param cart 购物车数据
     * @return vo
     */
    @ApiOperation("删除购物车")
    @ApiImplicitParam(name = "cart", value = "购物车的bean")
    @RequestMapping(value = "/manage/delete", method = RequestMethod.GET)
    @ResponseBody
    public SysResult deleteCart(
            Cart cart
    ){
        try{
            this.cartService.delete(cart);
            return SysResult.ok();
        }catch (MsgException e){
            return SysResult.build(201, e.getMessage(), e);
        }catch(Exception e){
            e.printStackTrace();
            return SysResult.build(500, e.getMessage(), e);
        }
    }

    /**
     * 查询指定商品价格
     * @param productId 商品id
     * @param userId 用户id
     * @return 总价格
     */
    @ApiOperation("查询指定商品的价格")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "productIds", value = "商品的价格"),
            @ApiImplicitParam(name = "productNums", value = "商品的数量"),
            @ApiImplicitParam(name = "userId", value = "用户id")
    })
    @RequestMapping("/get/money")
    @ResponseBody
    public SysResult getMoney(
            @RequestParam("productIds") String productIds,
            @RequestParam("productNums") String productNums,
            @RequestParam("userId") String userId
    ){
        try {
            Double money = this.cartService.getMoney(productIds, productNums, userId);
            System.out.println(money);
            return SysResult.ok(money);
        }catch (MsgException e){
            return SysResult.build(201, e.getMessage(), e);
        }catch (Exception e){
            e.printStackTrace();
            return SysResult.build(500, e.getMessage(), e);
        }
    }
}
