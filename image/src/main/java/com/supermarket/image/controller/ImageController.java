package com.supermarket.image.controller;

import com.supermarket.common.vo.PicUploadResult;
import com.supermarket.image.service.ImageService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import java.io.IOException;

@Controller
@Api(tags = "图片微服务")
//@RequestMapping("/pic")
public class ImageController {

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
    public PicUploadResult imgUpload(
            MultipartFile pic
    ){
        PicUploadResult result = new PicUploadResult();
        try{
            String url = this.imageService.uploadImg(pic);
            result.setUrl(url);
            result.setError(0);
            return result;
        }catch (Exception e){
            e.printStackTrace();
            result.setError(1);
            result.setUrl(e.getMessage());
            return result;
        }
    }

    /**
     * 生成验证码
     * @param token token
     * @param response 相应
     */
    @ApiOperation("生成验证码")
    @ApiImplicitParam(name = "token", value = "浏览器的token")
    @RequestMapping("/valistr")
    public void valiCode(
            @RequestParam("token") String token,
            HttpServletResponse response
    ){
        try {
            String valistr = this.imageService.generateValistr(token, response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 删除验证码
     * @param token token
     */
    @ApiOperation("删除验证码")
    @ApiImplicitParam(name = "token", value = "浏览器的token")
    @RequestMapping("/valistrdel")
    public void delValistr(
            @RequestParam("token") String token
    ){
        try{
            this.imageService.delValistr(token);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
