package com.supermarket.search.service;

import com.supermarket.common.domain.Product;
import com.supermarket.common.vo.CommonResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@FeignClient("product")
public interface ProductService {
    /**
     * 查询全部商品
     * @return 全部商品列表
     */
    @RequestMapping(value = "/manage/query", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult<List<Product>> queryProducts();
}
