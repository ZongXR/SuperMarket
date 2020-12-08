package com.supermarket.instantbuy.controller;

import com.supermarket.common.domain.InstantBuyItem;
import com.supermarket.common.vo.SysResult;
import com.supermarket.instantbuy.exception.MsgException;
import com.supermarket.instantbuy.service.InstantBuyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
//@RequestMapping("/instantbuy")
public class InstantBuyController {
    @Autowired
    private InstantBuyService instantBuyService = null;

    /**
     * 查询所有秒杀商品
     *
     * @return 可以秒杀商品的列表
     */
    @RequestMapping("/manage/list")
    @ResponseBody
    public List<InstantBuyItem> queryItems() {
        return this.instantBuyService.queryItems();
    }

    /**
     * 查询一个秒杀商品
     *
     * @param itemId 秒杀商品id
     * @return 秒杀商品
     */
    @RequestMapping("/manage/detail")
    @ResponseBody
    public InstantBuyItem queryItem(
            @RequestParam("itemId") String itemId
    ) {
        return this.instantBuyService.queryItem(itemId);
    }

    /**
     * 发起秒杀
     *
     * @param itemId   商品id
     * @param userName 用户名
     * @return vo
     */
    @RequestMapping("/manage/{itemId}/{userName}")
    @ResponseBody
    public SysResult startBuy(
            @PathVariable("itemId") String itemId,
            @PathVariable("userName") String userName
    ) {
        try {
            if (userName == null)
                throw new MsgException("用户尚未登录");
            this.instantBuyService.startBuy(itemId, userName);
            return SysResult.ok();
        } catch (MsgException e) {
            return SysResult.build(201, e.getMessage(), e);
        } catch (Exception e) {
            e.printStackTrace();
            return SysResult.build(500, e.getMessage(), e);
        }
    }
}
