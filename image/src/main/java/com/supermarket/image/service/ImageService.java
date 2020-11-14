package com.supermarket.image.service;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import java.io.OutputStream;

public interface ImageService {
    /**
     * 上传图片
     * @param pic 上传的图片
     * @return 存储路径
     */
    public String uploadImg(MultipartFile pic);

    /**
     * 生成验证码
     * @param out 输出流
     * @return 验证码
     */
    public String generateValistr(String token, OutputStream out);

    /**
     * 删除验证码在redis中的缓存
     * @param token redis中的key
     */
    public void delValistr(String token);
}
