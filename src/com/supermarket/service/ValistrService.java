package com.supermarket.service;

import com.supermarket.exception.MsgException;
import org.springframework.stereotype.Service;

import java.io.OutputStream;

public interface ValistrService {

    /**
     * 检查验证码是否正确
     * @param valistr 前端传过来的验证码
     * @param valicode session中的验证码
     * @throws MsgException 不正确的提示信息
     */
    public void check(String valistr, String valicode) throws MsgException;

    /**
     * 生成验证码
     * @param out 输出到的流
     * @return 真实的验证码字符串
     */
    public String generateValistr(OutputStream out);
}
