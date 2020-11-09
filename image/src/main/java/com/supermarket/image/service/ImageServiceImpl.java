package com.supermarket.image.service;

import com.supermarket.common.utils.UploadUtils;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class ImageServiceImpl implements ImageService{
    @Value("${custom.imglocal}")
    private String imgLocal = null;

    @Value("${custom.imgweb}")
    private String imgWeb = null;

    @Override
    public String uploadImg(MultipartFile pic) {
        // TODO 处理图片
        String fileName = pic.getOriginalFilename();
        if (
                fileName != null        // 文件名非空
                && (fileName.endsWith(".jpg") || fileName.endsWith(".png") || fileName.endsWith(".jpeg") || fileName.endsWith(".gif"))  // 后缀符合要求
                && Strings.isNotBlank(fileName.substring(0, fileName.lastIndexOf(".")))    // 前缀非空
        ){
            // TODO 处理文件
            String path = UploadUtils.getUploadPath(fileName, "/upload");
            String suffixName = fileName.substring(fileName.lastIndexOf("."));
            boolean mkdirs = false;
            if (! new File(imgLocal + path).exists())
                mkdirs = new File(imgLocal + path).mkdirs();
                String fullName = path + "/" + UUID.randomUUID().toString() + suffixName;
                try {
                    pic.transferTo(new File(imgLocal + fullName));
                } catch (IOException e) {
                    e.printStackTrace();
                    throw new RuntimeException("路径不存在");
                }
                return imgWeb + fullName;
        }else{
            throw new RuntimeException("文件非法");
        }
    }
}
