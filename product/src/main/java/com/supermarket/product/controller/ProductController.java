package com.supermarket.product.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.supermarket.common.domain.Product;
import com.supermarket.common.vo.CommonResult;
import com.supermarket.product.service.ProductService;
import com.supermarket.common.dto.PageDataDto;
import io.swagger.annotations.*;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@Api(tags = "商品微服务")
@Controller
//@RequestMapping("/product")
public class ProductController {

    private static final Logger LOGGER = LogManager.getLogger(ProductController.class);

    @Autowired
    private ProductService productService = null;

    /**
     * 分页查询
     * @param page 查询第几页
     * @param rows 查询几条记录
     * @return 查询的商品列表
     */
    @ApiOperation("分页查询全部商品")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "查询第几页，从1开始"),
            @ApiImplicitParam(name = "rows", value = "查询几条记录")
    })
    @RequestMapping(value = "/manage/pageManage", method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public CommonResult<PageDataDto> pageManage(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "rows", defaultValue = "30") Integer rows
    ) {
        PageDataDto result = this.productService.queryByPage(page, rows);
        return CommonResult.success(result);
    }

    /**
     * 商品查询
     * @param productId 商品id
     * @return 查询的商品
     */
    @ApiOperation("单个商品查询")
    @ApiImplicitParam(name = "productId", value = "商品id")
    @RequestMapping(value = "/manage/item/{productId}", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<Product> queryProduct(
            @PathVariable("productId") String productId
    ) throws IOException {
            Product result = this.productService.queryByProductId(productId);
            return CommonResult.success(result);
    }

    /**
     * 商品新增
     * @param product 新增的商品，productId为null
     * @return SysResult
     */
    @ApiOperation("新增一个商品")
    @ApiImplicitParam(name = "product", value = "新增商品的bean")
    @RequestMapping(value = "/manage/save", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<?> addProduct(
            @RequestBody Product product
    ) {
        this.productService.addProduct(product);
        return CommonResult.success("新增商品成功");
    }

    /**
     * 商品修改
     * @param product 修改的商品
     * @return SysResult
     */
    @ApiOperation("修改一个商品")
    @RequestMapping(value = "/manage/update", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<?> updateProduct(
            @ApiParam(name = "product", value = "商品的bean") @ModelAttribute("product") Product product
    ) throws JsonProcessingException {
        this.productService.updateProduct(product);
        return CommonResult.success("更新商品成功");
    }

    /**
     * 查询全部商品
     * @return 全部商品列表
     */
    @ApiOperation("查询全部商品，全表扫描，该接口慎用")
    @RequestMapping(value = "/manage/query", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult<List<Product>> queryProducts(){
        List<Product> result = this.productService.queryProducts();
        return CommonResult.success(result);
    }

    /**
     * 统一的异常处理器
     * @param e 异常
     * @return 返回结果
     */
    @ExceptionHandler
    public CommonResult<Object> handleException(
            Exception e
    ){
        ProductController.LOGGER.error(ExceptionUtils.getStackTrace(e));
        return CommonResult.failed(e.getMessage());
    }
}
