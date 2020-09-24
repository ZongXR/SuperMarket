package com.supermarket.decorator;

import com.supermarket.domain.User;
import com.supermarket.domain.UserImpl;
import com.supermarket.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

public class UserDecorator extends UserImpl {
    private User user = null;

    public UserDecorator(User user){
        this.user = user;
    }

    public UserDecorator() {
    }

    /**
     * 对用户密码进行加密
     * @param password 用户密码
     */
    @Override
    public void setPassword(String password) {
        super.setPassword(WebUtils.md5(password));
    }
}
