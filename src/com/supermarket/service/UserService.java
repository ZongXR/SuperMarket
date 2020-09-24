package com.supermarket.service;

import com.supermarket.domain.User;
import com.supermarket.domain.UserImpl;
import com.supermarket.exception.MsgException;
import org.springframework.validation.Errors;

import javax.servlet.http.HttpServletRequest;

/**
 * 该类用于处理和User相关的业务逻辑
 */
public interface UserService {

    /**
     * 登录用户
     * @param user 请求的bean
     * @param valistr 前端传过来的验证码
     * @param valicode session中的验证码
     * @return 从数据库中查到的用户
     * @throws MsgException 反馈给浏览器的提示信息
     */
    public User login (User user, String valistr, String valicode) throws MsgException;

    /**
     * 注册用户
     * @param user 请求的bean
     * @param password2 确认密码请求参数
     * @param valistr 前端传过来的验证码
     * @param valicode session中的验证码
     * @param errors bean校验的错误信息
     * @return 从数据库中查到的user
     * @throws MsgException 反馈给浏览器的信息
     */
    public User regist (User user, String password2, String valistr, String valicode, Errors errors) throws MsgException;

    /**
     * 判断用户名是否可用
     * @param username 用户名
     * @return 是否可用
     */
    public boolean isUsernameAvailable(String username);
}
