package com.supermarket.interceptor;

import com.supermarket.domain.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 用于记录日志的拦截器
 */
public class Logging implements HandlerInterceptor {

    private static Logger log = LogManager.getLogger(Logging.class);
    /**
     * 记录用户的请求日志
     * @param request 请求
     * @param response 响应
     * @param handler 处理器
     * @return 是否放行
     * @throws Exception 异常
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null){
            // 如果没有登录
            Logging.log.info(String.format(
                    "用户[%s] | IP:%s | 请求URL:%s",
                    "游客",
                    request.getRemoteAddr(),
                    request.getRequestURL().toString()
            ));
        }else{
            // 如果已经登录
            Logging.log.info(String.format(
                    "用户[%s] | IP:%s | 请求URL:%s",
                    ((User) session.getAttribute("user")).getUsername(),
                    request.getRemoteAddr(),
                    request.getRequestURL().toString()
            ));
        }
        return true;
    }
}
