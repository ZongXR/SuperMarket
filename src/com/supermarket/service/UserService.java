package com.supermarket.service;

import com.supermarket.dao.UserDao;
import com.supermarket.domain.User;
import com.supermarket.exception.MsgException;
import com.supermarket.exception.RunSQLException;
import com.supermarket.utils.VerifyCode;
import com.supermarket.utils.WebUtils;

import java.util.Objects;

public class UserService {
    private UserDao userDao = new UserDao();
    private ValistrService valistrService = new ValistrService();

    /**
     * 判断用户是否能登录
     * @param username 用户名
     * @param password 密码
     * @return 用户对象
     * @throws RunSQLException 执行SQL错误
     * @throws MsgException 不能登录提示信息
     */
    public User login(String username, String password) throws RunSQLException, MsgException {
        User user = this.userDao.findUsernamePassword(username, password);
        if (user != null) {
            // 如果查询到了用户
            return user;
        }else{
            // 如果没查询到用户
            throw new MsgException("用户名或密码不正确");
        }
    }

    /**
     * 注册用户
     * @param user 用户名
     * @param password2 确认密码
     * @param valistr 前端验证码
     * @param valicode 后端生成验证码
     * @return 用户对象
     * @throws RunSQLException SQL执行异常
     * @throws MsgException 注册失败提示
     */
    public User regist(User user, String password2, String valistr, String valicode) throws RunSQLException, MsgException {
        // 用户名非空校验
        if (WebUtils.isNull(user.getUsername())){
            throw new MsgException("用户名不能为空");
        }
        // 用户名重复性校验
        if (this.userDao.findUsername(user.getUsername())){
            throw new MsgException("用户名已存在");
        }
        // 密码非空校验
        if (WebUtils.isNull(user.getPassword())){
            throw new MsgException("密码不能为空");
        }
        //确认密码非空校验
        if (WebUtils.isNull(password2)){
            throw new MsgException("确认密码不能为空");
        }
        // 密码一致性校验
        if (!Objects.equals(user.getPassword(), password2)){
            throw new MsgException("两次密码输入不一致");
        }
        // 昵称非空校验
        if (WebUtils.isNull(user.getNickname())){
            throw new MsgException("昵称不能为空");
        }
        // 邮箱非空校验
        if (WebUtils.isNull(user.getEmail())){
            throw new MsgException("邮箱不能为空");
        }
        // 邮箱正则校验
        if (!WebUtils.isRegexValid(user.getEmail(), "^\\w+(\\.\\w+)*@\\w+(\\.\\w+)+$")){
            throw new MsgException("邮箱格式不正确");
        }
        // 验证码非空校验
        if (WebUtils.isNull(valistr)){
            throw new MsgException("验证码不能为空");
        }
        // 验证码有效性校验
        if (!this.valistrService.isCorrect(valistr, valicode)){
            throw new MsgException("验证码不正确");
        }
        // 通过上述验证后，插入数据
        this.userDao.addUser(user);
        return user;
    }

    /**
     * 检查用户名是否可用
     * @param username 用户名
     * @return 用户名是否可用
     * @throws RunSQLException SQL执行异常
     */
    public boolean userNameAvailable(String username) throws RunSQLException{
        boolean usernameExists = this.userDao.findUsername(username);
        return !usernameExists;
    }
}
