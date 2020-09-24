package com.supermarket.aspect;

import com.supermarket.exception.MsgException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

/**
 * 用于记录日志的切面
 */
@Component
@Aspect
public class Logging {
    private static Logger log = LogManager.getLogger(Logging.class);

    /**
     * 记录异常日志，拦截service包下的所有的类的所有方法
     *
     * @param jp 连接点
     * @param e  异常
     */
    @AfterThrowing(value = "execution(* com.supermarket.service.*.*(..))", throwing = "e")
    public void catchException(JoinPoint jp, Throwable e) {
        if (e.getClass() == MsgException.class)
            // 不记录自定义消息错误
            return;
        Class<?> clz = jp.getTarget().getClass();
        String method = ((MethodSignature) jp.getSignature()).getMethod().getName();
        Logging.log.error(String.format("[%s类%s方法]出现异常[%s:%s]由[%s]导致", clz.getSimpleName(), method, e.getClass().getName(), e.getMessage(), e.getCause()));
    }

    /**
     * 统计方法执行时间，拦截service包下的所有类的所有方法
     *
     * @param jp 连接点
     * @return 原先的返回值
     */
    @Around("execution(* com.supermarket.service.*.*(..))")
    public Object getTime(ProceedingJoinPoint jp) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = jp.proceed();
        Logging.log.info(String.format(
                "[%s类%s方法]执行时间[%s]毫秒",
                jp.getTarget().getClass().getSimpleName(),
                ((MethodSignature) jp.getSignature()).getMethod().getName(),
                System.currentTimeMillis() - start
        ));
        return result;
    }
}
