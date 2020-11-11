package com.supermarket.user.controller;

import com.supermarket.common.domain.User;
import com.supermarket.common.utils.CookieUtils;
import com.supermarket.common.vo.SysResult;
import com.supermarket.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@Controller
//@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService = null;

    /**
     * 检查用户名是否可用
     * @param userName 用户名
     * @return 200可用，201不可用，500异常
     */
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

    /**
     * 注册用户
     * @param user 请求参数封装的bean
     * @param errors bean校验出的错
     * @return 200成功，500异常
     */
    @RequestMapping("/manage/save")
    @ResponseBody
    public SysResult registUser(
            @Valid User user,
            @RequestParam("userPassword2") String userPassword2,
            Errors errors
    ){
        try{
            this.userService.registUser(user, errors, userPassword2);
            return new SysResult(200, "ok", null);
        }catch(Exception e){
            e.printStackTrace();
            return new SysResult(500, "other exception", e);
        }
    }

    /**
     * 登录用户
     * @param user 参数封装的bean
     * @return 成功200，不存在201，异常500
     */
    @RequestMapping("/manage/login")
    @ResponseBody
    public SysResult loginUser(
            User user,
            HttpServletRequest request,
            HttpServletResponse response
    ){
        try{
            String ticket = this.userService.loginUser(user);
            if (StringUtils.isEmpty(ticket))
                return SysResult.build(201, "用户不存在", null);
            else {
                CookieUtils.setCookie(request, response, "EM_TICKET", ticket);
                return SysResult.ok();
            }
        }catch(Exception e){
            e.printStackTrace();
            return SysResult.build(500, "other exception", e);
        }
    }

    /**
     * 获取用户登录状态
     * @param ticket redis的key
     * @return 200已登录，201未登录，500异常
     */
    @RequestMapping("/manage/query/{ticket}")
    @ResponseBody
    public SysResult loginState(
            @PathVariable String ticket
    ){
        try{
            String user = this.userService.loginState(ticket);
            if (user == null)
                return  SysResult.build(201, "尚未登陆", null);
            else
                return SysResult.ok(user);
        }catch (Exception e){
            e.printStackTrace();
            return SysResult.build(500, "other exception", e);
        }
    }

    /**
     * 用户登出
     * @return vo
     */
    @RequestMapping("/manage/logout")
    @ResponseBody
    public SysResult logoutUser(
            @CookieValue("EM_TICKET") String ticket,
            HttpServletRequest request,
            HttpServletResponse response
    ){
        try{
            this.userService.deleteTicket(ticket);
            CookieUtils.deleteCookie(request, response, "EM_TICKET");
            return SysResult.ok();
        }catch (Exception e){
            e.printStackTrace();
            return SysResult.build(500, "other exception", e);
        }
    }
}
