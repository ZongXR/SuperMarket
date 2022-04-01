package com.supermarket.product.service;

import com.supermarket.common.domain.Product;
import com.supermarket.common.vo.CommonResult;
import com.supermarket.common.vo.SysResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@FeignClient(name = "search")
public interface SearchService {
    /**
     * 删除商品
     * @param product 商品
     * @return vo
     */
    @RequestMapping(value = "/manage/delete", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<?> deleteProduct(
            @RequestBody Product product
    );

    /**
     * 新增商品
     * @param product 商品
     * @return vo
     */
    @RequestMapping(value = "/manage/add", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<?> addProduct(
            @RequestBody Product product
    );
}
