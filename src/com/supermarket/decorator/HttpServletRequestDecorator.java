package com.supermarket.decorator;

import com.supermarket.utils.WebUtils;

import javax.servlet.ServletRequest;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
 * 请求类的装饰者类，用于对request的扩展
 */
public class HttpServletRequestDecorator extends HttpServletRequestWrapper {

    private final HttpServletRequest request;
    private Map<String, String> cookies;

    /**
     * 构造方法
     *
     * @param request 请求对象
     */
    public HttpServletRequestDecorator(HttpServletRequest request) {
        super(request);
        this.request = request;
        this.cookies = this.getCookieMap();
    }

    /**
     * 将cookie键值对添加到映射中
     *
     * @return cookie键值对
     */
    private Map<String, String> getCookieMap() {
        Cookie[] cookies = this.request.getCookies();
        if (cookies == null)
            return null;
        Map<String, String> result = new HashMap<String, String>();
        try {
            for (Cookie cookie : cookies) {
                result.put(cookie.getName(), URLDecoder.decode(cookie.getValue(), this.request.getServletContext().getInitParameter("characterEncoding")));
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            throw new RuntimeException("不支持的字符集");
        }
        return result;
    }

    /**
     * 获取一个请求参数
     *
     * @param name 键
     * @return 值
     */
    @Override
    public String getParameter(String name) {
        String[] result = this.getParameterValues(name);
        String encryptMethod = this.request.getServletContext().getInitParameter("encryptMethod");
        if (result == null)
            return null;
        else if ("password".equalsIgnoreCase(name))
            // 如果键是password，对其进行加密处理
            return WebUtils.encrypt(result[0], encryptMethod);
        else
            return result[0];
    }

    /**
     * 获取一些请求参数
     *
     * @param name 键
     * @return String数组
     */
    @Override
    public String[] getParameterValues(String name) {
        return this.getParameterMap().get(name);
    }

    /**
     * 获取请求参数映射
     *
     * @return 请求参数映射
     */
    @Override
    public Map<String, String[]> getParameterMap() {
        String charsetNew = this.request.getServletContext().getInitParameter("characterEncoding");
        String charsetOld = this.request.getServletContext().getInitParameter("charset");
        Map<String, String[]> map = this.request.getParameterMap();
        Map<String, String[]> result = new HashMap<String, String[]>();
        try {
            for (Map.Entry<String, String[]> item : map.entrySet()) {
                String[] values = item.getValue();
                List<String> lst  = new LinkedList<String>();
                for (String value : values) {
                    lst.add(new String(value.getBytes(charsetOld), charsetNew));
                }
                result.put(item.getKey(), lst.toArray(new String[0]));
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            throw new RuntimeException("不支持的字符集");
        }
        return result;
    }

    /**
     * 获取cookie对应的值
     *
     * @param name cookie的键
     * @return cookie的值
     */
    public String getCookieValue(String name) {
        if (this.cookies == null) {
            return null;
        } else {
            return this.cookies.get(name);
        }
    }

    /**
     * 获取指定的session值
     *
     * @param name session的键
     * @return session的值
     */
    public Object getSessionValue(String name) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return null;
        } else {
            return session.getAttribute(name);
        }
    }
}
