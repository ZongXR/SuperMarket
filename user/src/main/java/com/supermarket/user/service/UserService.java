package com.supermarket.user.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.supermarket.common.domain.User;
import org.springframework.validation.Errors;

public interface UserService {
    /**
     * 检查用户名是否可用
     * @param userName 用户名
     * @return 是否可用
     */
    public boolean checkUserName(String userName);

    /**
     * 注册用户
     * @param user 用户的bean
     * @param errors 校验错误
     * @param userPassword2 确认密码
     * @param valistr 验证码
     * @param token 验证码的key
     */
    public void registUser(User user, Errors errors, String userPassword2, String valistr, String token);

    /**
     * 登录用户
     * @param user 用户的bean，密码未加密
     * @param valistr 前端传过来的验证码
     * @param token 验证码的key
     * @return 用户在redis的key
     * @throws JsonProcessingException 向上抛出
     */
    public String loginUser(User user, String valistr, String token) throws JsonProcessingException;

    /**
     * 检查用户登录状态
     * @param ticket redis的key
     * @return 是否已登录
     */
    public String loginState(String ticket);

    /**
     * 删除redis的数据
     * @param ticket redis的key
     */
    public void deleteTicket(String ticket);

    /**
     * 免密码登录，此方法是loginUser的绕过验证码版本，不能无限制调用.
     * @param user bean
     * @return json
     */
    public String loginUser(User user) throws JsonProcessingException;

    /**
     * 查询用户的权限等级
     * @param ticket 用户登录凭据
     * @return 权限等级
     */
    public Integer queryUserType(String ticket) throws JsonProcessingException;
}
