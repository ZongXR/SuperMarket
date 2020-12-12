package com.supermarket.search.service;

import com.supermarket.common.domain.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@FeignClient("product")
public interface ProductService {
    /**
     * 查询全部商品
     * @return 全部商品列表
     */
    @RequestMapping("/manage/query")
    @ResponseBody
    public List<Product> queryProducts();
}
