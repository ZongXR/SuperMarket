package com.supermarket.web;

import com.supermarket.service.UserService;
import com.supermarket.utils.JDBCUtils;
import com.supermarket.utils.WebUtils;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "AjaxUsernameServlet")
public class AjaxUsernameServlet extends HttpServlet {
    private UserService userService = new UserService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        this.doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 设置字符集
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=utf-8");

        // 获取前端传递来的参数
        String username = request.getParameter("username");

        // 返回是否已存在用户名
        response.getWriter().write(Boolean.toString(this.userService.userNameAvailable(username)));
    }
}
