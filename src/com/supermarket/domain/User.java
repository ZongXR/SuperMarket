package com.supermarket.domain;

import javax.servlet.http.HttpSessionBindingListener;

public interface User extends HttpSessionBindingListener {

    public int getId();

    public void setId(int id);

    public String getUsername();

    public void setUsername(String username);

    public String getPassword();

    public void setPassword(String password);

    public String getNickname();

    public void setNickname(String nickname);

    public String getEmail();

    public void setEmail(String email);

    @Override
    public String toString();
}
