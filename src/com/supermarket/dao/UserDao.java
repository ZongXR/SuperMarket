package com.supermarket.dao;

import com.supermarket.domain.User;
import com.supermarket.exception.RunSQLException;
import com.supermarket.utils.JDBCUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDao {
    /**
     * 根据用户名密码查询数据库，执行SQL语句：select id, username, password, nickname, email from user where username = ? and password = ?
     * @param username 用户名
     * @param password密码
     * @return 用户的封装对象
     * @throws RunSQLException SQL语句执行异常
     */
    public User findUsernamePassword(String username, String password) throws RunSQLException{
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try{
            conn = JDBCUtils.getConnection();
            ps = conn.prepareStatement("select id, username, password, nickname, email from user where username = ? and password = ?");
            ps.setString(1, username);
            ps.setString(2, password);
            rs = ps.executeQuery();
            if (rs.next()) {
                // 如果找到了用户，封装起来返回给service
                return new User(
                        rs.getInt("id"),
                        rs.getString("username"),
                        rs.getString("password"),
                        rs.getString("nickname"),
                        rs.getString("email")
                );
            }else{
                // 如果没找到用户，返回一个空
                return null;
            }
        } catch (SQLException e) {
            // sql语句执行错误，向上抛异常
            e.printStackTrace();
            throw new RunSQLException("执行select id, username, password, nickname, email from user where username = ? and password = ?错误");
        } finally {
            JDBCUtils.close(rs, ps, conn);
        }
    }

    /**
     * 根据用户名查询id，执行SQL语句：select id from user where username = ?
     * @param username 用户名
     * @return 是否有结果
     * @throws RunSQLException SQL语句执行异常
     */
    public boolean findUsername(String username) throws RunSQLException{
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try{
            conn = JDBCUtils.getConnection();
            ps = conn.prepareStatement("select id from user where username = ?");
            ps.setString(1, username);
            rs = ps.executeQuery();
            return rs.next();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RunSQLException("执行select id from user where username = ?错误");
        }finally{
            JDBCUtils.close(rs, ps, conn);
        }
    }

    /**
     * 新增一个用户，执行SQL：insert into user values(null, ?, ?, ?, ?)
     * @param user 用户对象
     * @throws RunSQLException SQL语句执行异常
     */
    public void addUser(User user) throws RunSQLException{
        Connection conn = null;
        PreparedStatement ps = null;
        try{
            conn = JDBCUtils.getConnection();
            ps = conn.prepareStatement("insert into user values(null, ?, ?, ?, ?)");
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getPassword());
            ps.setString(3, user.getNickname());
            ps.setString(4, user.getEmail());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RunSQLException("执行insert into user values(null, ?, ?, ?, ?)错误");
        }finally{
            JDBCUtils.close(ps, conn);
        }
    }
}
