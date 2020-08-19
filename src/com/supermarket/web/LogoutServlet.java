package com.supermarket.web;

import com.supermarket.utils.WebUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet(name = "LogoutServlet")
public class LogoutServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        this.doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 设置字符集
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");

        // 杀死session
        HttpSession session = request.getSession(false);
        if (session != null) {
            // 杀死session，失活cookie
            session.invalidate();
            WebUtils.removeCookie(request, response, "JSESSIONID");
        }
    }
}
