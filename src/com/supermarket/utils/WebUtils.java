package com.supermarket.utils;


import org.junit.Test;

import javax.servlet.GenericServlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

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
     *
     * @return 当前类的类名
     */
    public static String getClassName() {
        return new SecurityManager() {
            public String getClassName() {
                return getClassContext()[1].getName();
            }
        }.getClassName();
    }

    /**
     * 获取servlet初始化参数
     *
     * @param config servlet配置信息
     */
    public static void useConnectionPool(ServletConfig config) {
        ServletContext context = config.getServletContext();
        if (config.getInitParameter("datasource") != null) {
            // 如果有局部配置就用局部配置
            String datasource = config.getInitParameter("datasource");
            JDBCUtils.setPool(datasource);
        } else {
            // 否则就用全局配置
            JDBCUtils.setPool(context.getInitParameter("datasource"));
        }
    }

    /**
     * 控制浏览器是否使用缓存
     *
     * @param use 是否使用缓存
     */
    public static void useCache(boolean use, HttpServletResponse response) {
        if (use) {
            // 如果使用缓存
            response.setDateHeader("Expires", System.currentTimeMillis() + 1000 * 60 * 60 * 24);     //24小时
            response.setHeader("Cache-control", "max-age=60");    //60秒
        } else {
            // 如果不使用缓存
            response.setDateHeader("Expires", -1);
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-control", "no-cache");
        }
    }

    /**
     * 获取有效字符串
     *
     * @param value 原来的字符串
     * @return 处理后的字符串
     */
    public static String getString(Object value) {
        if (value == null)
            return "";
        else
            return value.toString().trim();
    }

    /**
     * 设置cookie
     *
     * @param request  请求对象
     * @param response 响应对象
     * @param name     键
     * @param value    值
     */
    public static void setCookie(HttpServletRequest request, HttpServletResponse response, String name, String value) {
        Cookie cookie = new Cookie(name, URLEncoder.encode(value, StandardCharsets.UTF_8));
        cookie.setMaxAge(Integer.MAX_VALUE);
        cookie.setPath(request.getContextPath() + "/");
        response.addCookie(cookie);
    }

    /**
     * 删除cookie
     *
     * @param request  请求对象
     * @param response 响应对象
     * @param name     键
     */
    public static void removeCookie(HttpServletRequest request, HttpServletResponse response, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null)
            return;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(name)) {
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
        }
    }

    /**
     * 获取指定cookie的值
     *
     * @param request 请求对象
     * @param name    键
     */
    public static String getCookieValue(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null)
            return null;
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(name)) {
                // 如果找到键为name的cookie
                return URLDecoder.decode(cookie.getValue(), StandardCharsets.UTF_8);
            }
        }
        return null;
    }

    /**
     * 获取指定cookie的字符串
     *
     * @param request 请求对象
     * @param name    键
     */
    public static String getCookieString(HttpServletRequest request, String name) {
        return WebUtils.getString(WebUtils.getCookieValue(request, name));
    }

    /**
     * 获取session属性值
     *
     * @param request 请求对象
     * @param name    键
     */
    public static Object getSessionValue(HttpServletRequest request, String name) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return null;
        } else {
            return session.getAttribute(name);
        }
    }
}
