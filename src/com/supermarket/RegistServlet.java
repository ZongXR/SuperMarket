package com.supermarket;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "RegistServlet")
public class RegistServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        // 先设置属性
        request.setAttribute("username", request.getParameter("username"));
        request.setAttribute("password", request.getParameter("password"));
        request.setAttribute("password2", request.getParameter("password2"));
        request.setAttribute("nickname", request.getParameter("nickname"));
        request.setAttribute("email", request.getParameter("email"));

        // 用户名非空校验
        if (this.isNull(request, response, "username", "用户名不能为空"))
            return;
        // 用户名重复性校验
        if (JDBCUtils.count("user", "username", request.getParameter("username")) > 0){
            request.setAttribute("msg", "已存在用户名");
            request.removeAttribute("username");
            request.getRequestDispatcher("/regist.jsp").forward(request, response);
            return;
        }
        // 密码非空校验
        if (this.isNull(request, response, "password", "密码不能为空"))
            return;
        // 确认密码非空校验
        if (this.isNull(request, response, "password2", "确认密码不能为空"))
            return;
        // 密码一致性校验
        if (!request.getParameter("password").equals(request.getParameter("password2"))) {
            request.removeAttribute("password");
            request.removeAttribute("password2");
            request.setAttribute("msg", "两次密码输入不一致");
            request.getRequestDispatcher("/regist.jsp").forward(request, response);
            return;
        }
        // 昵称非空校验
        if (this.isNull(request, response, "nickname", "昵称不能为空"))
            return;
        // 邮箱非空校验
        if (this.isNull(request, response, "email", "邮箱不能为空"))
            return;
        // 邮箱格式校验
        if (!this.isRegexValid(request, response, "email", "^\\w+(\\.\\w+)*@\\w+(\\.\\w+)+$", "邮箱格式不正确"))
            return;
        // 验证码非空校验
        if (this.isNull(request, response, "valistr", "验证码不能为空"))
            return;

        // 将数据插入数据库
        JDBCUtils.insertUser(
                request.getParameter("username"),
                request.getParameter("password"),
                request.getParameter("nickname"),
                request.getParameter("email")
        );
        // 请求转发注册成功页面
        request.setAttribute("timeout", 5);
        request.getRequestDispatcher("/regist_success.jsp").forward(request, response);
    }

    /**
     * 非空校验
     *
     * @param request 请求对象
     * @param response 响应对象
     * @param name    表单name
     * @param msg     提示信息
     * @return 是否为空
     */
    protected boolean isNull(HttpServletRequest request, HttpServletResponse response, String name, String msg) throws ServletException, IOException {
        String value = request.getParameter(name);
        if (WebUtils.isNull(value)){
            // 如果是空
            request.setAttribute("msg", msg);
            request.removeAttribute(name);
            request.getRequestDispatcher("/regist.jsp").forward(request, response);
            return true;
        }else{
            // 如果非空
            request.setAttribute("msg", "");
            return false;
        }
    }

    /**
     * 正则表达式校验
     *
     * @param request 请求对象
     * @param name    表单name
     * @param regex   正则表达式
     * @param msg     提示信息
     * @return 是否满足正则
     */
    protected boolean isRegexValid(HttpServletRequest request, HttpServletResponse response, String name, String regex, String msg) throws ServletException, IOException {
        String value = request.getParameter(name);
        if (value.matches(regex)){
            // 如果满足正则
            request.setAttribute("msg", "");
            return true;
        }else{
            // 如果不满足正则
            request.setAttribute("msg", msg);
            request.removeAttribute(name);
            request.getRequestDispatcher("/regist.jsp").forward(request, response);
            return false;
        }
    }
}
