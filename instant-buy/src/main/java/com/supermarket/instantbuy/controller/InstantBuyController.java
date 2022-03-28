package com.supermarket.instantbuy.controller;

import com.supermarket.common.domain.InstantBuyItem;
import com.supermarket.common.vo.SysResult;
import com.supermarket.instantbuy.exception.MsgException;
import com.supermarket.instantbuy.service.InstantBuyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@Api(tags = "抢购微服务")
//@RequestMapping("/instantbuy")
public class InstantBuyController {
    @Autowired
    private InstantBuyService instantBuyService = null;

    /**
     * 查询所有秒杀商品
     *
     * @return 可以秒杀商品的列表
     */
    @ApiOperation("查询所有秒杀商品")
    @RequestMapping(value = "/manage/list", method = RequestMethod.GET)
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
    @ApiOperation("查询一个秒杀商品")
    @ApiImplicitParam(name = "itemId", value = "商品id")
    @RequestMapping(value = "/manage/detail", method = RequestMethod.GET)
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
    @ApiOperation("开始抢购")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "itemId", value = "商品id"),
            @ApiImplicitParam(name = "userName", value = "用户名")
    })
    @RequestMapping(value = "/manage/{itemId}/{userName}", method = RequestMethod.GET)
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
