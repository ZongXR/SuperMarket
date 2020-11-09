package com.supermarket.common.vo;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PicUploadResult {
    private Integer error=0;		//图片上传错误不能抛出，抛出就无法进行jsp页面回调，所以设置这个标识，0表示无异常，1代表异常
    private String url;             //应该是浏览器能够解析的具体页面路径  相对路径http://image.jt/1212.jpg
}
