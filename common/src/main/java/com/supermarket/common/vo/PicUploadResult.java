package com.supermarket.common.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@ApiModel("图片上传的响应对象")
public class PicUploadResult {

    @ApiModelProperty("状态码, 0表示无异常, 1表示异常")
    private Integer error=0;

    @ApiModelProperty("浏览器能解析的url")
    private String url;
}
