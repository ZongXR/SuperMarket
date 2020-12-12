package com.supermarket.gateway.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@FeignClient(name = "user")
public interface UserService {
    /**
     * 查询用户的权限
     * @param ticket 登录凭据
     * @return 空表示没查到，数字表示权限
     */
    @RequestMapping("/query/userType")
    @ResponseBody
    public Integer queryUserType(
            @RequestParam("ticket") String ticket
    );
}
