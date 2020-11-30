package com.supermarket.product.controller;

import com.supermarket.common.domain.Product;
import com.supermarket.common.vo.SysResult;
import com.supermarket.product.service.ProductService;
import com.supermarket.common.vo.SupermarketResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
//@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductService productService = null;

    /**
     * 分页查询
     * @param page 查询第几页
     * @param rows 查询几条记录
     * @return 查询的商品列表
     */
    @RequestMapping(value = "/manage/pageManage")
    @ResponseBody
    public SupermarketResult pageManage(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "rows", defaultValue = "30") Integer rows
    ) {
        return this.productService.queryByPage(page, rows);
    }

    /**
     * 商品查询
     * @param productId 商品id
     * @return 查询的商品
     */
    @RequestMapping(value = "/manage/item/{productId}")
    @ResponseBody
    public Product queryProduct(
            @PathVariable("productId") String productId
    ) {
        try {
            return this.productService.queryByProductId(productId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 商品新增
     * @param product 新增的商品，productId为null
     * @return SysResult
     */
    @RequestMapping("/manage/save")
    @ResponseBody
    public SysResult addProduct(
            Product product
    ) {
        try {
            // TODO 业务逻辑
            this.productService.addProduct(product);
            return SysResult.ok();
        } catch (Exception e) {
            e.printStackTrace();
            return new SysResult(501, e.getMessage(), e);
        }
    }

    /**
     * 商品修改
     * @param product 修改的商品
     * @return SysResult
     */
    @RequestMapping("/manage/update")
    @ResponseBody
    public SysResult updateProduct(
            Product product
    ) {
        try {
            // TODO 业务逻辑
            this.productService.updateProduct(product);
            return SysResult.ok();
        } catch (Exception e) {
            e.printStackTrace();
            return new SysResult(501, e.getMessage(), e);
        }
    }

    /**
     * 查询全部商品
     * @return 全部商品列表
     */
    @RequestMapping("/manage/query")
    @ResponseBody
    public List<Product> queryProducts(){
        return this.productService.queryProducts();
    }
}
