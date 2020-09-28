package com.supermarket.dao;

import com.supermarket.domain.User;
import com.supermarket.domain.UserImpl;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UserDao {
    /**
     * 用bean查询用户
     *
     * @param user bean
     * @return 查询到的用户
     */
    public User queryUser(User user);

    /**
     * 查找好多用户
     * @param user bean
     * @return 用户组成的List
     */
    public List<? extends User> queryUsers(User user);

    /**
     * 用map查询用户
     *
     * @param map map
     * @return 查询到的用户
     */
    public User queryUser(Map<String, Object> map);

    /**
     * 查询很多用户
     * @param map map
     * @return 很多用户
     */
    public List<? extends User> queryUsers(Map<String, Object> map);

    /**
     * 插入用户
     *
     * @param user 插入的用户
     */
    public void insertUser(User user);
}
