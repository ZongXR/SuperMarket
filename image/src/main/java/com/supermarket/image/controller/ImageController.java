package com.supermarket.image.controller;

import com.supermarket.common.vo.CommonResult;
import com.supermarket.common.vo.PicUploadResult;
import com.supermarket.image.service.ImageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.io.OutputStream;

@Controller
@Api(tags = "图片上传相关的微服务")
//@RequestMapping("/image")
public class ImageController {

    private static final Logger LOGGER = LogManager.getLogger(ImageController.class);

    @Autowired
    private ImageService imageService = null;

    /**
     * 上传图片
     * @param pic 图片
     * @return vo
     */
    @ApiOperation("上传图片")
    @ApiImplicitParam(name = "pic", value = "图片文件")
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<?> imgUpload(
            @RequestParam(value = "pic", required = true) MultipartFile pic
    ){
        String url = this.imageService.uploadImg(pic);
        return CommonResult.success(null, url);
    }

    /**
     * 统一的异常处理器
     * @param e 异常
     * @return 返回结果
     */
    @ExceptionHandler(Throwable.class)
    @ResponseBody
    public CommonResult<Object> handleException(
            Exception e
    ){
        ImageController.LOGGER.error(ExceptionUtils.getStackTrace(e));
        return CommonResult.failed(e.getMessage());
    }

}
