package com.supermarket.user.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.supermarket.common.domain.User;
import com.supermarket.common.utils.MD5Utils;
import com.supermarket.common.utils.TimeUtils;
import com.supermarket.user.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.Errors;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.validation.FieldError;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao = null;

    @Autowired
    private StringRedisTemplate template = null;

    @Autowired
    private ObjectMapper mapper = null;

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
    public void registUser(User user, Errors errors, String userPassword2) {
        // 进行bean校验
        if (! user.getUserPassword().equals(userPassword2))
            throw new RuntimeException("两次密码输入不一致");
        List<FieldError> fieldErrors = errors.getFieldErrors();
        if (fieldErrors.isEmpty()) {
            // bean校验无误，进行用户名重复性校验
            if (this.checkUserName(user.getUserName())) {
                // 用户名不存在，可用
                user.setUserId(UUID.randomUUID().toString());
                user.setUserPassword(MD5Utils.md5(user.getUserPassword()));
                this.userDao.insertUser(user);
            } else {
                throw new RuntimeException("用户名已存在");
            }
        } else {
            throw new RuntimeException(fieldErrors.get(0).getDefaultMessage());
        }
    }

    @Override
    public String loginUser(User user) throws JsonProcessingException {
        // 传过来请求的密码没加密
        user.setUserPassword(MD5Utils.md5(user.getUserPassword()));
        List<User> users = this.userDao.selectUsers(user);
        if (users.size() == 0)
            return null;
        String ticket = "EM_TICKET_" + users.get(0).getUserName();
        String value = this.mapper.writeValueAsString(users.get(0));
        this.template.opsForHash().put(ticket, "data", value);
        this.template.opsForHash().put(ticket, "timestamp", TimeUtils.getTimestamp());
        this.template.expire(ticket, 30, TimeUnit.MINUTES);
        return ticket + this.template.opsForHash().get(ticket, "timestamp");
    }

    @Override
    public String loginState(String ticket) {
        String key = TimeUtils.cutTimestamp(ticket);
        String timestamp = TimeUtils.subTimestamp(ticket);
        if (timestamp != null && timestamp.equals(this.template.opsForHash().get(key, "timestamp")))
            return (String) this.template.opsForHash().get(key, "data");
        else
            return null;
    }

    @Override
    public void deleteTicket(String ticket) {
        String key = TimeUtils.cutTimestamp(ticket);
        this.template.delete(key);
    }
}
