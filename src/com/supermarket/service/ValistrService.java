package com.supermarket.service;

import com.supermarket.utils.VerifyCode;

import javax.servlet.ServletOutputStream;
import java.io.OutputStream;

public class ValistrService {

    /**
     * 判断验证码是否相等
     * @param valistr 前端传过来的验证码
     * @param valicode 后端生成的验证码
     * @return 是否相等
     */
    public boolean isCorrect(String valistr, String valicode) {
        if (valistr == null || valicode == null)
            return false;
        else
            return valistr.equalsIgnoreCase(valicode);
    }

    /**
     * 生成验证码的功能
     * @param out 向哪输出，输出流
     * @return 验证码字符串
     */
    public String generateValistr(OutputStream out) {
        VerifyCode img = new VerifyCode();
        img.drawImage(out);
        return img.getCode();
    }
}
