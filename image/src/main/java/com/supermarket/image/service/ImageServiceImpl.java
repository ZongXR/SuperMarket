package com.supermarket.image.service;

import com.supermarket.common.utils.TimeUtils;
import com.supermarket.common.utils.UploadUtils;
import com.supermarket.common.utils.VerifyCode;
import com.supermarket.image.utils.ValistrUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class ImageServiceImpl implements ImageService {
    @Value("${custom.imglocal}")
    private String imgLocal = null;

    @Value("${custom.imgweb}")
    private String imgWeb = null;

    private static final Logger LOGGER = LogManager.getLogger(ImageServiceImpl.class);

    @Autowired
    private StringRedisTemplate template = null;

    @Override
    public String uploadImg(MultipartFile pic) {
        // TODO 处理图片
        String fileName = pic.getOriginalFilename();
        if (
                fileName != null        // 文件名非空
                        && (fileName.endsWith(".jpg") || fileName.endsWith(".png") || fileName.endsWith(".jpeg") || fileName.endsWith(".gif"))  // 后缀符合要求
                        && Strings.isNotBlank(fileName.substring(0, fileName.lastIndexOf(".")))    // 前缀非空
        ) {
            // TODO 处理文件
            String path = UploadUtils.getUploadPath(fileName, "/upload");
            String suffixName = fileName.substring(fileName.lastIndexOf("."));
            boolean mkdirs = false;
            if (!new File(imgLocal + path).exists())
                mkdirs = new File(imgLocal + path).mkdirs();
            String fullName = path + "/" + UUID.randomUUID().toString() + suffixName;
            try {
                pic.transferTo(new File(imgLocal + fullName));
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("路径不存在");
            }
            return imgWeb + fullName;
        } else {
            throw new RuntimeException("文件非法");
        }
    }

    @Override
    public String generateValistr(String token, OutputStream out) {
        VerifyCode img = new VerifyCode();
        img.drawImage(out);
        // TODO 生成完验证码之后还需要存入redis，然后把token存入list，再把上一次的token弹出来删掉
        try {
            this.template.opsForValue().set(token, img.getCode(), 20, TimeUnit.MINUTES);
            this.template.opsForList().leftPush(TimeUtils.cutTimestamp(token), token);
            String oldKey = this.template.opsForList().index(TimeUtils.cutTimestamp(token), -1);
            if (oldKey != null && !oldKey.equals(token)) {
                this.template.delete(oldKey);
                this.template.opsForList().rightPop(TimeUtils.cutTimestamp(token));
            }
        } catch (RedisConnectionFailureException e) {
            // 如果redis连接失败，则不存入验证码
            e.printStackTrace();
        }
        return img.getCode();
    }

    @Override
    public void delValistr(String token) {
        this.template.delete(token);
        this.template.delete(TimeUtils.cutTimestamp(token));
    }

    @Override
    public Pair<String, byte[]> generateValistr(String token) {
        Pair<String, byte[]> result = ValistrUtils.generateValistr();
        String valistr = result.getLeft();
        try {
            this.template.opsForValue().set(token, valistr, 20, TimeUnit.MINUTES);
            this.template.opsForList().leftPush(TimeUtils.cutTimestamp(token), token);
            String oldKey = this.template.opsForList().index(TimeUtils.cutTimestamp(token), -1);
            if (oldKey != null && !oldKey.equals(token)) {
                this.template.delete(oldKey);
                this.template.opsForList().rightPop(TimeUtils.cutTimestamp(token));
            }
        } catch (RedisConnectionFailureException e) {
            // 如果redis连接失败，则不存入验证码
            LOGGER.error(ExceptionUtils.getStackTrace(e));
        }
        return result;
    }
}
