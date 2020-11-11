package com.supermarket.user.dao;

import com.supermarket.common.domain.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao {
    /**
     * 统计指定条件的用户数量
     * @param user 用户bean
     * @return 数量
     */
    public int selectCount(User user);

    /**
     * 插入用户
     * @param user 用户bean
     */
    public void insertUser(User user);

    /**
     * 根据条件查找用户
     * @param user 用户
     * @return 查找到的用户列表
     */
    public List<User> selectUsers(User user);

    /**
     * 查询单个用户
     * @param user 用户bean
     * @return 查找到的用户
     */
    public User selectUser(User user);
}
