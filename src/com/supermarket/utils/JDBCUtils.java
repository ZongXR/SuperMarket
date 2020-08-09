package com.supermarket.utils;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.apache.commons.dbcp.BasicDataSourceFactory;
import org.junit.Test;

import javax.servlet.GenericServlet;
import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.sql.DataSource;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Objects;
import java.util.Properties;

public class JDBCUtils {

    private static DataSource pool = null;

    // 默认使用c3p0连接池
    static {
        InputStream resource = JDBCUtils.class.getClassLoader().getResourceAsStream("/JDBC.properties");
        Properties prop = new Properties();
        try{
            prop.load(resource);
            JDBCUtils.setPool(prop.getProperty("datasource"));
        } catch (IOException e) {
            e.printStackTrace();
            JDBCUtils.useDataSourceDefault();
        }
    }

    /**
     * 设置使用哪个连接池
     * @param datasource 连接池名称
     * */
    public static void setPool(String datasource) {
        switch (datasource.toLowerCase()){
            case "dbcp":
                // 使用dbcp连接池，如果异常，则使用C3P0
                JDBCUtils.useDBCP();
                break;
            case "c3p0":
                // 使用c3p0连接池
                JDBCUtils.useC3P0();
                break;
            default:
                // 默认使用c3p0连接池
                JDBCUtils.useDataSourceDefault();
        }
    }

    /**
     * 工具类，私有化构造函数
     */
    private JDBCUtils() {
    }

    /**
     * 使用C3P0连接池
     * */
    private static void useC3P0(){
        System.out.println("使用C3P0连接池");
        JDBCUtils.pool = new ComboPooledDataSource();
    }

    /**
     * 使用DBCP连接池
     * */
    private static void useDBCP(){
        Properties prop = new Properties();
        try {
            prop.load(Class.forName("com.supermarket.utils.JDBCUtils").getResourceAsStream("/DBCPconfig.properties"));
            System.out.println("使用DBCP连接池");
            JDBCUtils.pool = BasicDataSourceFactory.createDataSource(prop);
        } catch (Exception e) {
            System.err.println("使用DBCP连接池失败");
            e.printStackTrace();
            JDBCUtils.useDataSourceDefault();
        }
    }

    /**
     * 使用默认连接池
     * */
    private static void useDataSourceDefault(){
        JDBCUtils.useC3P0();
    }

    /**
     * 关闭一个对象
     * @param obj 要关闭的对象，要求该对象具有close()方法
     * */
    private static <T extends AutoCloseable> void close(T obj) {
        if (obj != null) {
            try {
                obj.close();
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                obj = null;
            }
        }
    }

    /**
     * 按照顺序关闭一群对象
     * @param obj 要关闭的一组对象，要求对象具有close()方法
     * */
    @SafeVarargs
    public static <T extends AutoCloseable> void close(T... obj) {
        for (T t : obj) {
            JDBCUtils.close(t);
        }
    }

    /**
     * 查询个数，执行语句：select count(1) as count from table where filed = value
     * @param table 表名
     * @param field 列名
     * @param value 查询数值
     * @return 查询个数
     */
    public static int count(String table, String field, Object value) {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        int result =  0;
        try {
            conn = pool.getConnection();
            ps = conn.prepareStatement(String.format("select count(1) as count from %s where %s = ?", table, field));
            if (value.getClass() == String.class)
                ps.setString(1, (String) value);
            else if (value.getClass() == Integer.class)
                ps.setInt(1, (Integer) value);
            else
                ps.setObject(1, value);
            rs = ps.executeQuery();
            if (rs.next())
                result = rs.getInt("count");
        } catch (SQLException e) {
            e.printStackTrace();
            System.err.println(String.format("执行 select count(1) as count from %s where %s = ? 发生错误", table, field));
        }finally{
            JDBCUtils.close(rs, ps, conn);
        }
        return result;
    }

    /**
     * 向表格user中插入数据，执行语句：insert into user values(null, username, password, nickname, email)
     * @param username 用户名
     * @param password 密码
     * @param nickname 昵称
     * @param email 邮箱
     * */
    public static void insertUser(String username, String password, String nickname, String email){
        Connection conn = null;
        PreparedStatement ps = null;
        try{
            conn = pool.getConnection();
            ps = conn.prepareStatement("insert into user values(null, ?, ?, ?, ?)");
            ps.setString(1, username);
            ps.setString(2, password);
            ps.setString(3, nickname);
            ps.setString(4, email);
            ps.executeUpdate();
        }catch (SQLException e){
            e.printStackTrace();
            System.err.println("执行 insert into user values(null, ?, ?, ?, ?) 发生错误");
        }finally{
            JDBCUtils.close(ps, conn);
        }
    }

    /**
     * 判断是否能登录
     * @param table 表名
     * @param usernameField 用户名字段
     * @param username 用户名
     * @param passwordField 密码字段
     * @param password 密码
     * @return 是否有权限登录
     * */
    public static boolean canLogin(String table, String usernameField, String username, String passwordField, String password){
        boolean result = false;
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try{
            conn = pool.getConnection();
            ps = conn.prepareStatement(String.format("select %s from %s where %s = ? and %s = ?", usernameField, table, usernameField, passwordField));
            ps.setString(1, username);
            ps.setString(2, password);
            rs = ps.executeQuery();
            result = rs.next();
        } catch (SQLException e) {
            e.printStackTrace();
        }finally{
            JDBCUtils.close(rs, ps, conn);
        }
        return result;
    }
}
