package com.supermarket.search.controller;

import com.supermarket.common.domain.Product;
import com.supermarket.common.vo.CommonResult;
import com.supermarket.search.service.SearchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@Api(tags = "检索微服务")
//@RequestMapping("/search")
public class SearchController {

    private static final Logger LOGGER = LogManager.getLogger(SearchController.class);

    @Autowired
    private SearchService searchService = null;

    /**
     * 查询商品
     * @param query 查询词
     * @param page 起始页
     * @param rows 查询条数
     * @return 商品列表
     */
    @ApiOperation("商品的模糊查询")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "query", value = "查询条件"),
            @ApiImplicitParam(name = "page", value = "第几页"),
            @ApiImplicitParam(name = "rows", value = "查询多少条数据")
    })
    @RequestMapping(value = "/manage/query", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult<List<Product>> searchProducts(
            @RequestParam("query") String query,
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "rows", defaultValue = "30") Integer rows
    ){
        List<Product> products = this.searchService.searchProducts(query, page, rows);
        return CommonResult.success(products);
    }

    /**
     * 新增商品
     * @param product 商品
     * @return vo
     */
    @ApiOperation("增加商品")
    @ApiImplicitParam(name = "product", value = "商品的bean")
    @RequestMapping(value = "/manage/add", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<?> addProduct(
            @RequestBody Product product
    ){
        this.searchService.addProduct(product);
        return CommonResult.success("新增商品成功");
    }

    /**
     * 删除商品
     * @param product 商品
     * @return vo
     */
    @ApiOperation("删除商品")
    @ApiImplicitParam(name = "product", value = "商品的bean")
    @RequestMapping(value = "/manage/delete", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<?> deleteProduct(
            @RequestBody Product product
    ){
        this.searchService.deleteProduct(product);
        return CommonResult.success("删除商品成功");
    }

    /**
     * 统一的异常处理器
     * @param e 异常
     * @return 返回结果
     */
    @ExceptionHandler
    @ResponseBody
    public CommonResult<Object> handleException(
            Exception e
    ){
        SearchController.LOGGER.error(ExceptionUtils.getStackTrace(e));
        return CommonResult.failed(e.getMessage());
    }
}
