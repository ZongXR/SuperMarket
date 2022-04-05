package com.supermarket.image.utils;

import com.supermarket.common.utils.VerifyCode;
import org.apache.commons.lang3.tuple.Pair;

import javax.imageio.stream.ImageOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.OutputStream;

public class ValistrUtils {
    private ValistrUtils() {
    }

    /**
     * 生成一个键值对，key是验证码的字符串，value是图片的byte数组
     * @return 一个键值对
     */
    public static Pair<String, byte[]> generateValistr(){
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        VerifyCode img = new VerifyCode();
        img.drawImage(out);
        return Pair.of(img.getCode(), out.toByteArray());
    }
}
