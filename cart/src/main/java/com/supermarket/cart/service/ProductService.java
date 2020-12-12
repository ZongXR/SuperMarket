package com.supermarket.cart.service;

import com.supermarket.common.domain.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@FeignClient(name = "product")
public interface ProductService {
    /**
     * 商品查询
     * @param productId 商品id
     * @return 查询的商品
     */
    @RequestMapping(value = "/manage/item/{productId}")
    @ResponseBody
    public Product queryProduct(
            @PathVariable("productId") String productId
    );
}
