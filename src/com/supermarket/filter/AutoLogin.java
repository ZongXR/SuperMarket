package com.supermarket.filter;

import com.supermarket.decorator.HttpServletRequestDecorator;
import com.supermarket.domain.User;
import com.supermarket.exception.MsgException;
import com.supermarket.service.UserService;
import com.supermarket.utils.WebUtils;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "AutoLogin")
public class AutoLogin implements Filter {
    private UserService userService = new UserService();

    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        HttpServletRequestDecorator request = new HttpServletRequestDecorator((HttpServletRequest) req);
        String username = request.getCookieValue("username");
        String password = request.getCookieValue("password");

        if (request.getSession(false) == null || request.getSession(false).getAttribute("user") == null) {
            // 如果当前未登录，尝试自动登录
            if (username != null && password != null) {
                // cookie里面有username和password才能自动登录了
                User user = null;
                try {
                    user = this.userService.login(username, password);
                } catch (MsgException e) {
                    // 自动登录没找到用户
                }
                request.getSession().setAttribute("user", user);
            }
        }
        // 此处必须使用旧的req，如果使用新的，会造成请求参数的重复处理
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {

    }

}
