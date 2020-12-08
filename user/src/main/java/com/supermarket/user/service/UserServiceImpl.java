package com.supermarket.user.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.supermarket.common.domain.User;
import com.supermarket.common.utils.MD5Utils;
import com.supermarket.common.utils.TimeUtils;
import com.supermarket.user.dao.UserDao;
import com.supermarket.user.exception.MsgException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
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
    public void registUser(User user, Errors errors, String userPassword2, String valistr, String token) {
        // 密码一致性校验
        if (!user.getUserPassword().equals(userPassword2))
            throw new MsgException("两次密码输入不一致");
        // 验证码非空校验
        if (StringUtils.isEmpty(valistr))
            throw new MsgException("验证码不能为空");
        // 验证码一致性校验
        if (!valistr.equalsIgnoreCase(this.template.opsForValue().get(token)))
            throw new MsgException("验证码不对");
        // 进行bean校验
        List<FieldError> fieldErrors = errors.getFieldErrors();
        if (fieldErrors.isEmpty()) {
            // bean校验无误，进行用户名重复性校验
            try {
                user.setUserId(UUID.randomUUID().toString());
                user.setUserPassword(MD5Utils.md5(user.getUserPassword()));
                this.userDao.insertUser(user);
                // 注册完成后删除redis中的验证码缓存
                this.template.delete(TimeUtils.cutTimestamp(token));
                this.template.delete(token);
            } catch (DuplicateKeyException e) {
                e.printStackTrace();
                throw new MsgException("用户名已存在");
            }
        } else {
            throw new MsgException(fieldErrors.get(0).getDefaultMessage());
        }
    }

    @Override
    public String loginUser(User user, String valistr, String token) throws JsonProcessingException {
        // TODO 先进行验证码校验
        String valicode = this.template.opsForValue().get(token);
        if (valicode == null || !valicode.equalsIgnoreCase(valistr)) {
            throw new MsgException("验证码不正确");
        }
        // 传过来请求的密码没加密
        user.setUserPassword(MD5Utils.md5(user.getUserPassword()));
        List<User> users = this.userDao.selectUsers(user);
        if (users.size() == 0)
            return null;
        // 找到了用户名，进行登录
        String ticket = "EM_TICKET_" + users.get(0).getUserName();
        // TODO 应该在token中加入UUID，再加盐，当前版本未解决

        String value = this.mapper.writeValueAsString(users.get(0));
        this.template.opsForHash().put(ticket, "data", value);
        this.template.opsForHash().put(ticket, "timestamp", TimeUtils.getTimestamp());
        this.template.expire(ticket, 30, TimeUnit.MINUTES);
        this.template.delete(token);
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

    @Override
    public String loginUser(User user) throws JsonProcessingException {
        // cookie保存的是加密密码，不需要再次MD5
        // TODO 需要进行时间校验
        String key = "AUTOLOGIN_" + user.getUserName();
        String value = String.valueOf(System.currentTimeMillis());
        this.template.opsForList().leftPush(key, value);
        this.template.expire(key, 30, TimeUnit.MINUTES);
        List<String> lst = this.template.opsForList().range(key, 0, -1);
        if (lst == null || lst.size() == 0)
            return null;
        if (lst.size() > 1){
            String oldValue = this.template.opsForList().rightPop(key);
            if (oldValue == null || Long.parseLong(value) - Long.parseLong(oldValue) < 500000)
                // 间隔小于500000毫秒，返回
                return null;
        }
        List<User> users = this.userDao.selectUsers(user);
        if (users.size() == 0)
            throw new MsgException("用户名或密码错误");
        // 找到了用户名，进行登录
        String ticket = "EM_TICKET_" + users.get(0).getUserName();
        // TODO 应该在token中加入UUID，再加盐，当前版本未解决

        String data = this.mapper.writeValueAsString(users.get(0));
        this.template.opsForHash().put(ticket, "data", data);
        this.template.opsForHash().put(ticket, "timestamp", TimeUtils.getTimestamp());
        this.template.expire(ticket, 30, TimeUnit.MINUTES);
        return ticket + this.template.opsForHash().get(ticket, "timestamp");
    }

    @Override
    public Integer queryUserType(String ticket) throws JsonProcessingException {
        ticket = ticket.substring(0, ticket.length() - 13);
        String data = (String) this.template.opsForHash().get(ticket, "data");
        if (data == null)
            return null;
        User user = this.mapper.readValue(data, User.class);
        return user.getUserType();
    }
}
