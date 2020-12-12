package com.supermarket.product.service;

import com.supermarket.common.domain.Product;
import com.supermarket.common.vo.SysResult;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@FeignClient(name = "search")
public interface SearchService {
    /**
     * 删除商品
     * @param product 商品
     * @return vo
     */
    @RequestMapping("/manage/delete")
    @ResponseBody
    public SysResult deleteProduct(
            @RequestBody Product product
    );

    /**
     * 新增商品
     * @param product 商品
     * @return vo
     */
    @RequestMapping("/manage/add")
    @ResponseBody
    public SysResult addProduct(
            @RequestBody Product product
    );
}
