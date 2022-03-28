package com.supermarket.search.controller;

import com.supermarket.common.domain.Product;
import com.supermarket.common.vo.SysResult;
import com.supermarket.search.exception.MsgException;
import com.supermarket.search.service.SearchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@Api(tags = "搜索微服务")
//@RequestMapping("/search")
public class SearchController {
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
    public List<Product> searchProducts(
            @RequestParam("query") String query,
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "rows", defaultValue = "30") Integer rows
    ){
        try{
            return this.searchService.searchProducts(query, page, rows);
        }catch (MsgException e){
            return null;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 新增商品
     * @param product 商品
     * @return vo
     */
    @ApiOperation("增加商品")
    @ApiImplicitParam(name = "product", value = "商品的bean")
    @RequestMapping("/manage/add")
    @ResponseBody
    public SysResult addProduct(
            @RequestBody Product product
    ){
        try{
            this.searchService.addProduct(product);
            return SysResult.ok();
        }catch(MsgException e){
            return SysResult.build(201, e.getMessage(), e);
        }catch (Exception e){
            e.printStackTrace();
            return SysResult.build(500, e.getMessage(), e);
        }
    }

    /**
     * 删除商品
     * @param product 商品
     * @return vo
     */
    @ApiOperation("删除商品")
    @ApiImplicitParam(name = "product", value = "商品的bean")
    @RequestMapping("/manage/delete")
    @ResponseBody
    public SysResult deleteProduct(
            @RequestBody Product product
    ){
        try{
            this.searchService.deleteProduct(product);
            return SysResult.ok();
        }catch (MsgException e){
            return SysResult.build(201, e.getMessage(), e);
        }catch (Exception e){
            e.printStackTrace();
            return SysResult.build(500, e.getMessage(), e);
        }
    }


}
