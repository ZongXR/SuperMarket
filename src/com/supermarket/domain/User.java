package com.supermarket.domain;

public class User {
    private int id;
    private String username;
    private String password;
    private String nickname;
    private String email;

    /**
     * 韩餐构造方法
     * @param id 用户id
     * @param username 用户名
     * @param password 密码
     * @param nickname 昵称
     * @param email 邮箱
     */
    public User(int id, String username, String password, String nickname, String email) {
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

    @Override
    public String toString() {
        return String.format("%nID:%d%n用户名:%s%n密码:%s%n昵称:%s%n邮箱：%s", this.id, this.username, this.password, this.nickname, this.email);
    }
}
