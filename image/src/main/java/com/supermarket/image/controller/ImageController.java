package com.supermarket.image.controller;

import com.supermarket.common.vo.PicUploadResult;
import com.supermarket.image.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotNull;
import java.io.IOException;

@Controller
//@RequestMapping("/pic")
public class ImageController {
    @Autowired
    private ImageService imageService = null;

    /**
     * 上传图片
     * @param pic 图片
     * @return vo
     */
    @RequestMapping("/upload")
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
