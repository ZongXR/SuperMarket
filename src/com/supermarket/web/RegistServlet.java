package com.supermarket.web;

import com.supermarket.domain.User;
import com.supermarket.exception.MsgException;
import com.supermarket.exception.RunSQLException;
import com.supermarket.service.UserService;
import com.supermarket.service.ValistrService;
import com.supermarket.utils.JDBCUtils;
import com.supermarket.utils.WebUtils;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet(name = "RegistServlet")
public class RegistServlet extends HttpServlet {
    private UserService userService = new UserService();
    private ValistrService valistrService = new ValistrService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 获取session
        HttpSession session = request.getSession();

        // 获取前端传来的参数
        String username = request.getParameter("username").trim();
        String password = request.getParameter("password").trim();
        String password2 = request.getParameter("password2").trim();
        String nickname = request.getParameter("nickname").trim();
        String email = request.getParameter("email").trim();
        String valistr = request.getParameter("valistr").trim();
        String valicode = ((String) session.getAttribute("valicode")).trim();

        // 设置域属性
        request.setAttribute("username", username);
        request.setAttribute("password", password);
        request.setAttribute("password2", password2);
        request.setAttribute("nickname", nickname);
        request.setAttribute("email", email);

        // 封装成javabean
        User user = null;
        try{
            user = this.userService.regist(new User(
                    0,
                    username,
                    password,
                    nickname,
                    email
            ), password2, valistr, valicode);
        }catch (MsgException e){
            // 校验出错
            request.setAttribute("msg", e.getMessage());
            request.getRequestDispatcher("/regist.jsp").forward(request, response);
            return;
        }

        // 注册成功
        session.setAttribute("user", user);
        request.setAttribute("timeout", 5);
        request.getRequestDispatcher("/regist_success.jsp").forward(request, response);
    }
}
