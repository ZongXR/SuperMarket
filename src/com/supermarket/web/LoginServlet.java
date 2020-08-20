package com.supermarket.web;

import com.supermarket.domain.User;
import com.supermarket.exception.MsgException;
import com.supermarket.exception.RunSQLException;
import com.supermarket.service.UserService;
import com.supermarket.service.ValistrService;
import com.supermarket.utils.WebUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.Objects;

@WebServlet(name = "LoginServlet")
public class LoginServlet extends HttpServlet {
    private UserService userService = new UserService();
    private ValistrService valistrService = new ValistrService();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 设定字符集防乱码
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");

        // 获取session
        HttpSession session = request.getSession();

        // 获取前端传递来的参数
        String username = request.getParameter("username").trim();
        String password = request.getParameter("password").trim();
        String valistr = request.getParameter("valistr").trim();
        String valicode = ((String) session.getAttribute("valicode")).trim();
        String remname = request.getParameter("remname");
        String autologin = request.getParameter("autologin");

        // 验证码校验
        if (!this.valistrService.isCorrect(valistr, valicode)){
            // 如果验证码不正确拦截住
            request.setAttribute("msg", "验证码错误");
            request.getRequestDispatcher("/login.jsp").forward(request, response);
            return;
        }

        // 交给service查询用户，如果没找到用户则拦截住
        User user = null;
        try{
            user = this.userService.login(username, password);
        }catch (MsgException e){
            // 如果没找到用户
            request.setAttribute("msg", e.getMessage());
            request.getRequestDispatcher("/login.jsp").forward(request, response);
            return;
        }

        // 成功登陆进去，执行后续步骤
        // 设置记住用户名的cookie
        if (Objects.equals(remname, "true")){
            // 如果勾选记住用户名，则设置cookie
            WebUtils.setCookie(request, response, "username", user.getUsername());
        }else{
            // 如果没勾选记住用户名，则删除cookie
            WebUtils.removeCookie(request, response, "username");
        }

        // 修改主页，展示用户名
        session.setAttribute("user", user);
        WebUtils.setCookie(request, response, "JSESSIONID", session.getId());

        // 跳转回首页
        response.sendRedirect(request.getContextPath() + "/");
    }
}
