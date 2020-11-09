package com.supermarket.image.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    public String uploadImg(MultipartFile pic);
}
