package com.supermarket.image.controller;

import com.supermarket.common.vo.CommonResult;
import com.supermarket.image.service.ImageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Api(tags = "和验证码相关的微服务")
public class ValistrController {

    private static final Logger LOGGER = LogManager.getLogger(ValistrController.class);

    @Autowired
    private ImageService imageService = null;

    /**
     * 生成验证码
     * @param token token
     */
    @ApiOperation("生成验证码")
    @ApiImplicitParam(name = "token", value = "浏览器的token")
    @RequestMapping(value = "/valistr", method = RequestMethod.GET, produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public byte[] valiCode(
            @RequestParam("token") String token
    ){
        Pair<String, byte[]> valistrBytes = this.imageService.generateValistr(token);
        byte[] result = valistrBytes.getRight();
        return result;
    }

    /**
     * 删除验证码
     * @param token token
     */
    @ApiOperation("删除验证码")
    @ApiImplicitParam(name = "token", value = "浏览器的token")
    @RequestMapping(value = "/valistrdel", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult<?> delValistr(
            @RequestParam("token") String token
    ){
        this.imageService.delValistr(token);
        return CommonResult.success(null);
    }

}
