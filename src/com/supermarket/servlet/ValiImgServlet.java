package com.supermarket.servlet;

import com.supermarket.utils.VerifyCode;
import com.supermarket.utils.WebUtils;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

@WebServlet(name = "ValiImgServlet")
public class ValiImgServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;utf-8");

        // 控制不使用缓存
        WebUtils.useCache(false, response);

        VerifyCode img = new VerifyCode();
        ServletOutputStream out = response.getOutputStream();
        img.drawImage(out);
        String code = img.getCode();
        HttpSession session = request.getSession();
        session.setAttribute("valicode", code);
    }
}
