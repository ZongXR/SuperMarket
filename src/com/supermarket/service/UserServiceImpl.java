package com.supermarket.service;

import com.supermarket.dao.UserDao;
import com.supermarket.domain.User;
import com.supermarket.domain.UserImpl;
import com.supermarket.exception.MsgException;
import com.supermarket.exception.MsgRollbackException;
import com.supermarket.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private ValistrService valistrService = null;

    @Autowired
    private UserDao userDao = null;

    @Override
    public User login(User user, String valistr, String valicode) throws MsgException {
        // 校验验证码
        this.valistrService.check(valistr, valicode);
        user = this.userDao.queryUser(user);
        if (user == null)
            throw new MsgException("用户名密码不正确");
        else
            return user;
    }

    @Transactional(rollbackOn = {RuntimeException.class, MsgRollbackException.class})
    @Override
    public User regist(
            @Valid User user,
            String password2,
            String valistr,
            String valicode,
            Errors errors
    ) throws MsgException {
        // 验证码校验
        this.valistrService.check(valistr, valicode);
        // 密码一致性校验
        if (password2 == null || !password2.equals(user.getPassword()))
            throw new MsgException("两次密码输入不一致");
        // bean校验
        List<FieldError> errorsLst = errors.getFieldErrors();
        if (!errorsLst.isEmpty()){
            StringBuilder builder = new StringBuilder();
            for (FieldError error : errorsLst) {
                builder.append(error.getDefaultMessage());
            }
            throw new MsgException(builder.toString());
        }
        // 用户名可用性校验
        if (!this.isUsernameAvailable(user.getUsername()))
            throw new MsgException("用户名已被注册");
        // 通过以上校验，插入数据
        this.userDao.insertUser(user);
        // 检查数据库该用户名只有一个
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("username", user.getUsername());
        List<? extends User> users = this.userDao.queryUsers(map);
        if (users.size() > 1)
            throw new MsgRollbackException("用户名已被注册");
        return user;
    }

    @Override
    public boolean isUsernameAvailable(String username) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("username", username);
        return this.userDao.queryUsers(map).size() == 0;
    }
}
