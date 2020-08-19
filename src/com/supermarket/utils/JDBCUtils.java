package com.supermarket.utils;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.apache.commons.dbcp.BasicDataSourceFactory;
import org.junit.Test;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
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
        try {
            prop.load(resource);
            JDBCUtils.setPool(prop.getProperty("datasource"));
        } catch (IOException e) {
            e.printStackTrace();
            JDBCUtils.useDataSourceDefault();
        }
    }

    /**
     * 设置使用哪个连接池
     *
     * @param datasource 连接池名称
     */
    public static void setPool(String datasource) {
        switch (datasource.toLowerCase()) {
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
     */
    private static void useC3P0() {
        System.out.println("使用C3P0连接池");
        JDBCUtils.pool = new ComboPooledDataSource();
    }

    /**
     * 使用DBCP连接池
     */
    private static void useDBCP() {
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
     * 使用tomcat自带DBCP连接池
     */
    private static void useTomcat() {
        Context context = null;
        try {
            context = new InitialContext();
            Context envCtx = (Context) context.lookup("java:comp/env");  // 固定路径
            DataSource dataSource = (DataSource) envCtx.lookup("jdbc/EmployeeDB");
            System.out.println("使用tomcat自带连接池");
            JDBCUtils.pool = dataSource;
        } catch (NamingException e) {
            System.err.println("使用tomcat自带连接池失败");
            e.printStackTrace();
            JDBCUtils.useDataSourceDefault();
        }
    }

    /**
     * 使用默认连接池
     */
    private static void useDataSourceDefault() {
        JDBCUtils.useC3P0();
    }

    /**
     * 关闭一个对象
     *
     * @param obj 要关闭的对象，要求该对象具有close()方法
     */
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
     * 按照顺序关闭一群对象，务必按照从小到大顺序关闭
     *
     * @param obj 要关闭的一组对象，要求对象具有close()方法
     */
    @SafeVarargs
    public static <T extends AutoCloseable> void close(T... obj) {
        for (T t : obj) {
            JDBCUtils.close(t);
        }
    }

    /**
     * 从连接池获取链接
     *
     * @return 连接
     * @throws SQLException SQL异常
     */
    public static Connection getConnection() throws SQLException {
        return JDBCUtils.pool.getConnection();
    }
}
