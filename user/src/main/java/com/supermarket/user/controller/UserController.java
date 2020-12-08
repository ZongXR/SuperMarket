package com.supermarket.user.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.supermarket.common.domain.User;
import com.supermarket.common.utils.CookieUtils;
import com.supermarket.common.vo.SysResult;
import com.supermarket.user.exception.MsgException;
import com.supermarket.user.service.UserService;
import org.apache.ibatis.annotations.Param;
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
                return new SysResult(201, "用户名已存在", null);
            else
                return new SysResult(200, "用户名可用", null);
        }catch(Exception e){
            return new SysResult(500, e.getMessage(), e);
        }
    }

    /**
     * 注册用户
     * @param user 请求参数封装的bean
     * @param userPassword2 确认密码
     * @param valistr 验证码
     * @param token 验证码的key
     * @param errors bean校验出的错
     * @return 200成功，201后台校验错误，500异常
     */
    @RequestMapping("/manage/save")
    @ResponseBody
    public SysResult registUser(
            @Valid User user,
            @RequestParam("userPassword2") String userPassword2,
            @RequestParam("valistr") String valistr,
            @RequestParam("token") String token,
            Errors errors
    ){
        try {
            this.userService.registUser(user, errors, userPassword2, valistr, token);
            return new SysResult(200, "ok", null);
        }catch (MsgException e){
            // 出现后台校验错误
            e.printStackTrace();
            return new SysResult(201, e.getMessage(), e);
        }catch(Exception e){
            // 出现其他错误
            e.printStackTrace();
            return new SysResult(500, e.getMessage(), e);
        }
    }

    /**
     * 登录用户
     * @param user 参数封装的bean
     * @return 成功200，用户不存在201，异常500
     */
    @RequestMapping("/manage/login")
    @ResponseBody
    public SysResult loginUser(
            User user,
            @RequestParam("valistr") String valistr,
            @RequestParam("token") String token,
            @RequestParam(value = "remname") boolean remname,
            @RequestParam(value = "autologin") boolean autologin,
            HttpServletRequest request,
            HttpServletResponse response
    ){
        try {
            String ticket = this.userService.loginUser(user, valistr, token);
            if (StringUtils.isEmpty(ticket))
                return SysResult.build(201, "用户不存在", null);
            else {
                // 这里的EM_TICKET类似于JSESSIONID
                CookieUtils.setCookie(request, response, "EM_TICKET", ticket, -1, true);
                if (remname || autologin)
                    CookieUtils.setCookie(request, response, "USERNAME", user.getUserName(), Integer.MAX_VALUE, true);
                if (autologin)
                    CookieUtils.setCookie(request, response, "PASSWORD", user.getUserPassword(), 2592000, true);
                return SysResult.ok();
            }
        }catch (MsgException e){
            return SysResult.build(202, e.getMessage(), e);
        }catch(Exception e){
            e.printStackTrace();
            return SysResult.build(500, e.getMessage(), e);
        }
    }

    /**
     * 自动登录
     * @param user bean
     * @param request 请求
     * @param response 响应
     * @return vo
     */
    @RequestMapping("/manage/autologin")
    @ResponseBody
    public SysResult autoLogin(
            User user,
            HttpServletRequest request,
            HttpServletResponse response
    ){
        try {
            String ticket = this.userService.loginUser(user);
            if (StringUtils.isEmpty(ticket))
                return SysResult.build(201, "间隔时间太短", null);
            else {
                // 这里的EM_TICKET类似于JSESSIONID
                CookieUtils.setCookie(request, response, "EM_TICKET", ticket, -1, true);
                return SysResult.ok(user);
            }
        }catch (MsgException e){
            return SysResult.build(201, e.getMessage(), e);
        }catch(Exception e){
            return SysResult.build(500, e.getMessage(), e);
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
            @PathVariable String ticket,
            HttpServletRequest request,
            HttpServletResponse response
    ){
        try{
            String user = this.userService.loginState(ticket);
            if (user == null) {
                // 如果没有登录则删除cookie
                CookieUtils.deleteCookie(request, response, "EM_TICKET");
                CookieUtils.deleteCookie(request, response, "USERNAME");
                CookieUtils.deleteCookie(request, response, "PASSWORD");
                return SysResult.build(201, "尚未登陆", null);
            }else
                return SysResult.ok(user);
        }catch (Exception e){
            e.printStackTrace();
            return SysResult.build(500, e.getMessage(), e);
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
            CookieUtils.deleteCookie(request, response, "USERNAME");
            CookieUtils.deleteCookie(request, response, "PASSWORD");
            return SysResult.ok();
        }catch (Exception e){
            e.printStackTrace();
            return SysResult.build(500, e.getMessage(), e);
        }
    }

    /**
     * 查询用户的权限
     * @param ticket 登录凭据
     * @return 空表示没查到，数字表示权限
     */
    @RequestMapping("/query/userType")
    @ResponseBody
    public Integer queryUserType(
            @RequestParam("ticket") String ticket
    ){
        try {
            return this.userService.queryUserType(ticket);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }
}
