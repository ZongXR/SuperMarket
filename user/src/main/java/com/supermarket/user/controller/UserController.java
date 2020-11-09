package com.supermarket.user.controller;

import com.supermarket.common.domain.User;
import com.supermarket.common.vo.SysResult;
import com.supermarket.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;

@Controller
//@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService = null;

    @RequestMapping("/manage/checkUserName")
    @ResponseBody
    public SysResult checkUserName(
            @RequestParam("userName") String userName
    ) {
        try{
            boolean available = this.userService.checkUserName(userName);
            if (! available)
                return new SysResult(201, "ok", null);
            else
                return new SysResult(200, "ok", null);
        }catch(Exception e){
            return new SysResult(500, "other exception", e);
        }
    }

    @RequestMapping("/manage/save")
    @ResponseBody
    public SysResult registUser(
            @Valid User user,
            Errors errors
    ){
        try{
            this.userService.registUser(user, errors);
            return new SysResult(200, "ok", null);
        }catch(Exception e){
            e.printStackTrace();
            return new SysResult(500, "other exception", e);
        }
    }
}
