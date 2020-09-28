package com.supermarket.dao;

import com.supermarket.domain.User;
import com.supermarket.domain.UserImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class UserJDBC implements UserDao {
    @Autowired
    private JdbcTemplate jdbcTemplate = null;

    @Override
    public User queryUser(User user) {
        List<? extends User> users = this.queryUsers(user);
        if (users.isEmpty())
            return null;
        else
            return users.get(0);
    }

    @Override
    public List<? extends User> queryUsers(User user) {
        if (user == null)
            return new LinkedList<>();
        String sql = "select * from user where 1 = 1";
        List<Object> args = new LinkedList<Object>();
        if (user.getId() != 0) {
            sql = sql + " and id = ?";
            args.add(user.getId());
        }
        if (user.getUsername() != null) {
            sql = sql + " and username = ?";
            args.add(user.getUsername());
        }
        if (user.getPassword() != null) {
            sql = sql + " and password = ?";
            args.add(user.getPassword());
        }
        if (user.getNickname() != null) {
            sql = sql + " and nickname = ?";
            args.add(user.getNickname());
        }
        if (user.getEmail() != null) {
            sql = sql + " and email = ?";
            args.add(user.getEmail());
        }
        List<? extends User> users = this.jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(UserImpl.class), args.toArray());
        return users;
    }

    @Override
    public User queryUser(Map<String, Object> map) {
        List<? extends User> users = this.queryUsers(map);
        if (users.isEmpty()){
            return null;
        }else {
            return users.get(0);
        }
    }

    @Override
    public List<? extends User> queryUsers(Map<String, Object> map) {
        if (map == null)
            return new LinkedList<>();
        String sql = "select * from user where 1 = 1";
        List<Object> args = new LinkedList<Object>();
        if (map.get("id") != null) {
            sql = sql + " and id = ?";
            args.add(map.get("id"));
        }
        if (map.get("username") != null) {
            sql = sql + " and username = ?";
            args.add(map.get("username"));
        }
        if (map.get("password") != null) {
            sql = sql + " and password = ?";
            args.add(map.get("password"));
        }
        if (map.get("nickname") != null) {
            sql = sql + " and nickname = ?";
            args.add(map.get("nickname"));
        }
        if (map.get("email") != null) {
            sql = sql + " and email = ?";
            args.add(map.get("email"));
        }
        List<? extends User> users = this.jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(UserImpl.class), args.toArray());
        return users;
    }

    @Override
    public void insertUser(User user) {
        if (user == null)
            return;
        this.jdbcTemplate.update(
                "insert into user (id, username, password, nickname, email) values (?, ?, ?, ?, ?)",
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getNickname(),
                user.getEmail()
        );
    }
}
