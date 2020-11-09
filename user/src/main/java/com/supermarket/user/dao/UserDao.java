package com.supermarket.user.dao;

import com.supermarket.common.domain.User;
import org.springframework.stereotype.Repository;

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
}
