package com.supermarket.service;

import com.supermarket.exception.MsgException;
import com.supermarket.utils.VerifyCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.OutputStream;

@Service
public class ValistrServiceImpl implements  ValistrService{
    @Autowired
    private VerifyCode verifyCode = null;

    public void check(String valistr, String valicode) throws MsgException {
        if (valistr == null || !valistr.equalsIgnoreCase(valicode))
            throw new MsgException("验证码不正确");
    }

    public String generateValistr(OutputStream out) {
        this.verifyCode.drawImage(out);
        return this.verifyCode.getCode();
    }
}
