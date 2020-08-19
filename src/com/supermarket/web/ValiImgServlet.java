package com.supermarket.web;

import com.supermarket.service.ValistrService;
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
    private ValistrService valistrService = new ValistrService();
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 避免乱码
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;utf-8");

        // 获取session
        HttpSession session = request.getSession();

        // 控制不使用缓存
        WebUtils.useCache(false, response);

        // 生成验证码
        String code = this.valistrService.generateValistr(response.getOutputStream());
        session.setAttribute("valicode", code);
    }
}
