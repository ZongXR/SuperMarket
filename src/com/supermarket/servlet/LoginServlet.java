package com.supermarket.servlet;

import com.supermarket.utils.JDBCUtils;
import com.supermarket.utils.WebUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.Objects;

@WebServlet(name = "LoginServlet")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");

        request.setAttribute("msg", "");

        // 验证码有效性校验
        if (Objects.equals(request.getParameter("valistr"), request.getSession().getAttribute("valicode"))){
            // 验证码校验无误
            request.setAttribute("msg", "");
        }else{
            // 验证码错误
            request.setAttribute("msg", "验证码错误");
            request.getRequestDispatcher("/login.jsp").forward(request, response);
            return;
        }

        // 用户名密码校验
        if (JDBCUtils.canLogin("user", "username", request.getParameter("username"), "password", request.getParameter("password"))){
            // 用户名密码正确
            request.setAttribute("msg", "");
        }else{
            // 用户名密码不正确
            request.setAttribute("msg", "用户名或密码不正确");
            request.getRequestDispatcher("/login.jsp").forward(request, response);
            return;
        }

        // 设置自动登录的cookie
        if (Objects.equals(request.getParameter("remname"), "true")){
            // 如果勾选记住用户名，则设置cookie
            WebUtils.setCookie(request, response, "username", request.getParameter("username"));
        }else{
            // 如果没勾选记住用户名，则删除cookie
            WebUtils.removeCookie(request, response, "username");
        }

        // 修改主页，展示用户名
        HttpSession session = request.getSession();
        session.setAttribute("username", request.getParameter("username"));
        WebUtils.setCookie(request, response, "JSESSIONID", session.getId());
        System.out.println(session.getAttribute("username"));

        // 跳转回首页
        response.sendRedirect(request.getContextPath() + "/");
    }
}
