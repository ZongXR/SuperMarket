package com.supermarket.user.aspect;

import com.supermarket.common.utils.TimeUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.CodeSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * 这是一个切面类，用于实现用户登录超时的相关功能
 */
@Component
@Aspect
public class LoginAspect {
    @Autowired
    private StringRedisTemplate template = null;

    /**
     * 实现时长续租功能
     * @param jp 连接点
     * @param result 切入点返回值
     */
    @AfterReturning(value = "execution(* com.supermarket.user.service.UserService*.loginState(..))", returning = "result")
    public void extendTime(JoinPoint jp, Object result){
        if (StringUtils.isEmpty(result))
            return;
        Map<String, Object> map = new HashMap<String, Object>();
        Object[] values = jp.getArgs();
        String[] names = ((CodeSignature)jp.getSignature()).getParameterNames();
        for (int i = 0; i < names.length; i++) {
            map.put(names[i], values[i]);
        }
        String ticket = (String) map.get("ticket");
        String key = TimeUtils.cutTimestamp(ticket);
        this.template.expire(key, 30, TimeUnit.MINUTES);
    }
}
