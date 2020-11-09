package com.supermarket.image.controller;

import com.supermarket.common.vo.PicUploadResult;
import com.supermarket.image.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Controller
//@RequestMapping("/pic")
public class ImageController {
    @Autowired
    private ImageService imageService = null;

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
}
