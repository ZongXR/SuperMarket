package com.supermarket.user.service;

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
    public void registUser(User user, Errors errors);
}
