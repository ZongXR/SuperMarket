package com.supermarket.utils;


import org.apache.log4j.Logger;
import org.junit.Test;

import javax.servlet.GenericServlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.math.BigInteger;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class WebUtils {
    private static Logger log = Logger.getLogger(WebUtils.class);
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
     * 正则校验
     *
     * @param value 要校验的字符串
     * @param regex 正则表达式
     * @return value是否符合正则
     */
    public static boolean isRegexValid(String value, String regex) {
        return value != null && value.matches(regex);
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
     * @return 如果找到了cookie返回cookie值，没找到返回空字符串
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
     * 设置cookie
     *
     * @param request  请求对象
     * @param response 响应对象
     * @param name     键
     * @param value    值
     * @param expiry   存活时长
     */
    public static void setCookie(HttpServletRequest request, HttpServletResponse response, String name, String value, int expiry) {
        Cookie cookie = new Cookie(name, URLEncoder.encode(value, StandardCharsets.UTF_8));
        cookie.setMaxAge(expiry);
        cookie.setPath(request.getContextPath() + "/");
        response.addCookie(cookie);
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

    /**
     * 对密码加密
     * @param plainText 加密前的字符串
     * @param encryptMethod 加密方法
     * @return 加密后的字符串
     */
    public static String encrypt(String plainText, String encryptMethod) {
        byte[] secretBytes = null;
        try {
            secretBytes = MessageDigest.getInstance(encryptMethod).digest(plainText.getBytes());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            log.error(e.getMessage());
            throw new RuntimeException(String.format("没有%s加密算法", encryptMethod));
        }
        StringBuilder md5code = new StringBuilder(new BigInteger(1, secretBytes).toString(16));
        for (int i = 0; i < 32 - md5code.length(); i++) {
            md5code.insert(0, "0");
        }
        return md5code.toString();
    }
}
