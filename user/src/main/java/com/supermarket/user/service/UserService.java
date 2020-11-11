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
     * @param user 用户bean
     */
    public void registUser(User user, Errors errors, String userPassword);

    /**
     * 登录用户
     * @param user 用户bean
     * @return 存储到redis的ticket
     */
    public String loginUser(User user) throws JsonProcessingException;

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
}
