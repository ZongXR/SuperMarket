package com.supermarket.order.service;

import com.supermarket.common.vo.SysResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@FeignClient(name = "cart")
public interface CartService {
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
    );
}
