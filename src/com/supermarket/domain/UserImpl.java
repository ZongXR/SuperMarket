package com.supermarket.domain;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSessionBindingEvent;


@Component
@Scope("prototype")
public class UserImpl implements User{
    private static Logger log = LogManager.getLogger(User.class);
    public UserImpl() {
    }

    private int id;

    @NotBlank(message = "用户名不能为空")
    private String username;

    @NotBlank(message = "密码不能为空")
    private String password;

    @NotBlank(message = "昵称不能为空")
    private String nickname;

    @Email(message = "邮箱格式不正确")
    private String email;

    /**
     * 韩餐构造方法
     * @param id 用户id
     * @param username 用户名
     * @param password 密码
     * @param nickname 昵称
     * @param email 邮箱
     */
    public UserImpl(int id, String username, String password, String nickname, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.nickname = nickname;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * 将user格式化为字符串
     * @return user对应的字符串
     */
    @Override
    public String toString() {
        return String.format("%nID:%d%n用户名:%s%n密码:%s%n昵称:%s%n邮箱：%s%n", this.id, this.username, this.password, this.nickname, this.email);
    }

    /**
     * Notifies the object that it is being bound to
     * a session and identifies the session.
     *
     * @param event the event that identifies the
     *              session
     * @see #valueUnbound
     */
    @Override
    public void valueBound(HttpSessionBindingEvent event) {
        UserImpl.log.info(String.format("用户[%s]已登录", this.username));
    }

    /**
     * Notifies the object that it is being unbound
     * from a session and identifies the session.
     *
     * @param event the event that identifies
     *              the session
     * @see #valueBound
     */
    @Override
    public void valueUnbound(HttpSessionBindingEvent event) {
        UserImpl.log.info(String.format("用户[%s]已注销", this.username));
    }
}
