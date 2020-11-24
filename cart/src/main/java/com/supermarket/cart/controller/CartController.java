package com.supermarket.cart.controller;

import com.supermarket.cart.exception.MsgException;
import com.supermarket.cart.service.CartService;
import com.supermarket.common.domain.Cart;
import com.supermarket.common.domain.OrderItem;
import com.supermarket.common.vo.SysResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
//@RequestMapping("/cart")
public class CartController {
    @Autowired
    private CartService cartService = null;

    /**
     * 购物车中的商品查询
     * @param userId 用户编号
     * @return 购物车中的商品
     */
    @RequestMapping("/manage/query")
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
    @RequestMapping("/manage/save")
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
    @RequestMapping("/manage/update")
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
    @RequestMapping("/manage/delete")
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
