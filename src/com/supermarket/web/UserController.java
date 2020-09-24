package com.supermarket.web;

import com.supermarket.decorator.UserDecorator;
import com.supermarket.domain.User;
import com.supermarket.domain.UserImpl;
import com.supermarket.exception.MsgException;
import com.supermarket.service.UserService;
import com.supermarket.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Controller;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.nio.charset.StandardCharsets;

/**
 * 该类用于处理和用户相关的Controller
 */
@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService = null;

    /**
     * 登录用户
     * @param user 请求参数封装的bean（已加密）
     * @param valistr 前端传过来的验证码
     * @param remname 是否记住用户名
     * @param autologin 是否自动登录
     * @param session session
     * @param request 请求
     * @param response 响应
     * @return 视图名
     */
    @RequestMapping("login.action")
    public String login(
            UserDecorator user,         //这里使用UserDecorator是因为需要将密码加密
            String valistr,             //从前端传过来的验证码
            boolean remname,
            boolean autologin,
            HttpSession session,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        // 先尝试去登陆
        User user1 = null;
        try {
            user1 = this.userService.login(user, valistr, (String) session.getAttribute("valicode"));
        } catch (MsgException e) {
            request.setAttribute("msg", e.getMessage());
            return "login";
        }

        // 如果找到了用户
        session.setAttribute("user", user1);
        if (remname) {
            // 如果要求记住用户名
            WebUtils.setCookie(request, response, "username", user1.getUsername());
        } else {
            // 否则删除保存用户名的cookie
            WebUtils.removeCookie(request, response, "username");
        }
        if (autologin) {
            // 如果要求自动登录，保存密码
            WebUtils.setCookie(request, response, "password", user1.getPassword());
        } else {
            // 否则删除保存密码的cookie
            WebUtils.removeCookie(request, response, "password");
        }
        return "redirect:/index.jsp";
    }

    /**
     * 注册用户
     * @param user 请求参数bean（已加密）
     * @param password2 确认密码（未加密）
     * @param valistr 前端传过来的验证码
     * @param session session
     * @param request 请求对象
     * @param errors bean校验的错误信息
     * @return 视图名
     */
    @RequestMapping("regist.action")
    public String regist(
            @Valid UserDecorator user,
            String password2,
            String valistr,
            HttpSession session,
            HttpServletRequest request,
            Errors errors
    ) {
        request.setAttribute("username", user.getUsername());
        request.setAttribute("nickname", user.getNickname());
        request.setAttribute("email", user.getEmail());
        password2 = WebUtils.md5(password2);
        String valicode = (String) session.getAttribute("valicode");

        User user1 = null;
        try {
            user1 = this.userService.regist(user, password2, valistr, valicode, errors);
        } catch (MsgException e) {
            request.setAttribute("msg", e.getMessage());
            return "regist";
        }
        session.setAttribute("user", user1);
        request.setAttribute("timeout", 5);
        return "regist_success";
    }

    /**
     * 判断用户名是否可用
     * @param username 用户名
     * @param writer writer
     * @return null
     */
    @RequestMapping("username.action")
    public String isUsernameAvailable(String username, Writer writer) {
        boolean result = this.userService.isUsernameAvailable(username);
        try {
            writer.write(Boolean.toString(result));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 登出
     * @param session session
     * @param request 请求对象
     * @param response 响应
     */
    @RequestMapping("logout.action")
    public void logout(
            HttpSession session,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        session.invalidate();
        WebUtils.removeCookies(request, response, "JSESSIONID", "password");
    }
}
