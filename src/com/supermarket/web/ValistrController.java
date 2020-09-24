package com.supermarket.web;

import com.supermarket.service.ValistrService;
import com.supermarket.utils.VerifyCode;
import com.supermarket.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.OutputStream;

@Controller
@RequestMapping("/valicode")
public class ValistrController {
    @Autowired
    private ValistrService valistrService = null;

    /**
     * 获取验证码
     * @param session session
     * @param out 输出到哪个流
     * @param response 响应
     * @return null
     */
    @RequestMapping("/valistr.action")
    public String getValistr(HttpSession session, OutputStream out, HttpServletResponse response) {
        String code = this.valistrService.generateValistr(out);
        session.setAttribute("valicode", code);
        WebUtils.useCache(false, response);
        return null;
    }
}
