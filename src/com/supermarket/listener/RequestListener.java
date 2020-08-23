package com.supermarket.listener;

import com.supermarket.domain.User;
import org.apache.log4j.Logger;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.*;
import java.util.LinkedList;
import java.util.List;

@WebListener()
public class RequestListener implements ServletRequestListener {
    private Logger log = Logger.getLogger(this.getClass());

    @Override
    public void requestDestroyed(ServletRequestEvent sre) {
        List<String> info = this.getInfo(sre);
        this.log.info(String.format("用户[%s] | IP:%s | URL:%s请求结束", info.remove(0), info.remove(0), info.remove(0)));
    }

    @Override
    public void requestInitialized(ServletRequestEvent sre) {
        List<String> info = this.getInfo(sre);
        this.log.info(String.format("用户[%s] | IP:%s | URL:%s请求开始", info.remove(0), info.remove(0), info.remove(0)));
    }

    /**
     * 获取监听到的必要信息
     * @param sre 请求事件
     * @param username 用户名
     * @param ip IP地址
     * @param url 请求资源
     */
    private List<String> getInfo(ServletRequestEvent sre){
        List<String> result = new LinkedList<String>();

        HttpServletRequest request = (HttpServletRequest) sre.getServletRequest();
        HttpSession session = request.getSession(false);

        if (session == null || session.getAttribute("user") == null)
            result.add("游客");
        else
            result.add(((User) session.getAttribute("user")).getUsername());
        result.add(request.getRemoteAddr());
        result.add(request.getRequestURL().toString());
        return result;
    }
}
