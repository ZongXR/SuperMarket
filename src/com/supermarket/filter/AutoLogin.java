package com.supermarket.filter;

import com.supermarket.decorator.RequestDecorator;
import com.supermarket.domain.User;
import com.supermarket.exception.MsgException;
import com.supermarket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter(filterName = "AutoLogin")
public class AutoLogin implements Filter {

    private UserService userService = null;
    private User user = null;

    public void destroy() {
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        RequestDecorator req = new RequestDecorator((HttpServletRequest) request);
        if (req.getSessionValue("user") == null){
            // 如果还未登录
            String username = req.getCookieValue("username");
            String password = req.getCookieValue("password");
            if (username != null && password != null){
                // 如果有用户名和密码
                this.user.setUsername(username);
                this.user.setPassword(password);
                User user = null;
                try {
                    user = this.userService.login(this.user, "", "");
                    // 如果登陆成功就把user存入session域
                    req.getSession().setAttribute("user", user);
                } catch (MsgException e) {
                    // 登陆失败说明cookie中的用户名密码不对
                }
            }
        }
        chain.doFilter(request, response);
    }

    /**
     * 这里不能自动装配，需要手动从spring容器中拿对象
     * @param config web.xml的filter配置
     * @throws ServletException
     */
    public void init(FilterConfig config) throws ServletException {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        this.userService = (UserService) context.getBean("userService");
        this.user = (User) context.getBean("user");
    }

}
