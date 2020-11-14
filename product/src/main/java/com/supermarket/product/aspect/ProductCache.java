package com.supermarket.product.aspect;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.supermarket.common.domain.Product;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.CodeSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * 这是一个切面类，用于实现商品的数据缓存
 */
@Component
@Aspect
public class ProductCache {
    @Autowired
    private StringRedisTemplate template = null;

    @Autowired
    private ObjectMapper mapper = null;

    /**
     * 更新或添加商品后缓存
     * @param jp 连接点
     * @param result 切入点返回值
     * @throws JsonProcessingException 抛出
     */
    @AfterReturning(value = "execution(* com.supermarket.product.service.ProductService*.*Product(..))", returning = "result")
    public void afterUpdateProduct(JoinPoint jp, Object result) throws JsonProcessingException {
        Map<String, Object> map = new HashMap<String, Object>();
        Object[] values = jp.getArgs();
        String[] names = ((CodeSignature)jp.getSignature()).getParameterNames();
        for (int i = 0; i < names.length; i++) {
            map.put(names[i], values[i]);
        }
        Product product = (Product) map.get("product");
        this.template.opsForValue().set("PROD_" + product.getProductId(), mapper.writeValueAsString(product), 30, TimeUnit.MINUTES);
    }

    /**
     * 查询商品后返回
     * @param jp 连接点
     * @param result 切入点返回值
     */
    @AfterReturning(value = "execution(* com.supermarket.product.service.ProductService*.queryByProductId(..))", returning = "result")
    public void afterQueryProduct(JoinPoint jp, Object result){
        Map<String, Object> map = new HashMap<String, Object>();
        String[] names = ((CodeSignature)jp.getSignature()).getParameterNames();
        Object[] values = jp.getArgs();
        for (int i = 0; i < names.length; i++) {
            map.put(names[i], values[i]);
        }
        String productId = (String) map.get("productId");
        this.template.expire("PROD_" + productId, 30, TimeUnit.MINUTES);
    }
}
