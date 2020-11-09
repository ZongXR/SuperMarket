package com.supermarket.user.service;

import com.supermarket.common.domain.User;
import com.supermarket.common.utils.MD5Utils;
import com.supermarket.user.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao = null;

    @Override
    public boolean checkUserName(String userName) {
        int num = this.userDao.selectCount(new User(
                null,
                userName,
                null,
                null,
                null,
                null
        ));
        return num == 0;
    }

    @Override
    public void registUser(User user, Errors errors) {
        // 进行bean校验
        List<FieldError> fieldErrors = errors.getFieldErrors();
        if (fieldErrors.isEmpty()){
            // bean校验无误，进行用户名重复性校验
            if (this.checkUserName(user.getUserName())){
                // 用户名不存在，可用
                user.setUserId(UUID.randomUUID().toString());
                user.setUserPassword(MD5Utils.md5(user.getUserPassword()));
                this.userDao.insertUser(user);
            }else{
                throw new RuntimeException("用户名已存在");
            }
        }else{
            throw new RuntimeException(fieldErrors.get(0).getDefaultMessage());
        }
    }
}
