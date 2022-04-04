package com.supermarket.instantbuy.controller;

import com.supermarket.common.domain.InstantBuyItem;
import com.supermarket.common.vo.CommonResult;
import com.supermarket.instantbuy.exception.MsgException;
import com.supermarket.instantbuy.service.InstantBuyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@Api(tags = "抢购微服务")
//@RequestMapping("/instantbuy")
public class InstantBuyController {

    private static final Logger LOGGER = LogManager.getLogger(InstantBuyController.class);

    @Autowired
    private InstantBuyService instantBuyService = null;

    /**
     * 查询所有秒杀商品
     * @return 可以秒杀商品的列表
     */
    @ApiOperation("查询所有秒杀商品，该接口慎用，将全表扫描")
    @RequestMapping(value = "/manage/list", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult<List<InstantBuyItem>> queryItems() {
        List<InstantBuyItem> result = this.instantBuyService.queryItems();
        return CommonResult.success(result);
    }

    /**
     * 查询一个秒杀商品
     * @param itemId 秒杀商品id
     * @return 秒杀商品
     */
    @ApiOperation("查询一个秒杀商品")
    @ApiImplicitParam(name = "itemId", value = "商品id")
    @RequestMapping(value = "/manage/detail", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult<InstantBuyItem> queryItem(
            @RequestParam("itemId") String itemId
    ) {
        InstantBuyItem result = this.instantBuyService.queryItem(itemId);
        return CommonResult.success(result);
    }

    /**
     * 发起秒杀
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
    public CommonResult<?> startBuy(
            @PathVariable("itemId") String itemId,
            @PathVariable("userName") String userName
    ) {
        if (userName == null)
            return CommonResult.unauthorized("用户尚未登录");
        this.instantBuyService.startBuy(itemId, userName);
        return CommonResult.success("开始抢购");
    }

    /**
     * 统一的异常处理器
     * @param e 异常
     * @return 返回结果
     */
    @ExceptionHandler(Throwable.class)
    @ResponseBody
    public CommonResult<Object> handleException(
            Exception e
    ){
        InstantBuyController.LOGGER.error(ExceptionUtils.getStackTrace(e));
        if (e instanceof MsgException)
            return new CommonResult<Object>(201, e.getMessage(), e);
        return CommonResult.failed(e.getMessage());
    }
}
