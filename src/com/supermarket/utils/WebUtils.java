package com.supermarket.utils;


import org.junit.Test;

import javax.servlet.GenericServlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class WebUtils {
    /**
     * 工具类，私有化构造方法
     */
    private WebUtils() {
    }

    /**
     * 判断字符串是否为空
     *
     * @param value 传入的字符串
     * @return 字符串是否为空
     */
    public static boolean isNull(String value) {
        return value == null || value.length() == 0;
    }

    /**
     * 获取当前类的类名
     * @return 当前类的类名
     * */
    public static String getClassName() {
        return new SecurityManager() {
            public String getClassName() {
                return getClassContext()[1].getName();
            }
        }.getClassName();
    }

    /**
     * 获取servlet初始化参数
     * @param config servlet配置信息
     * */
    public static void useConnectionPool(ServletConfig config){
        ServletContext context = config.getServletContext();
        if (context.getInitParameter("datasource") == null) {
            // 如果全局配置不存在就用局部配置
            String datasource = config.getInitParameter("datasource");
            JDBCUtils.setPool(datasource);
        } else {
            // 否则就用全局配置
            JDBCUtils.setPool(context.getInitParameter("datasource"));
        }
    }

    /**
     * 控制浏览器是否使用缓存
     * @param use 是否使用缓存
     * */
    public static void useCache(boolean use, HttpServletResponse response){
        if (use){
            // 如果使用缓存
            response.setDateHeader("Expires", System.currentTimeMillis()+1000*60*60*24);     //24小时
            response.setHeader("Cache-control", "max-age=60");    //60秒
        }else{
            // 如果不使用缓存
            response.setDateHeader("Expires", -1);
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-control", "no-cache");
        }
    }
}
