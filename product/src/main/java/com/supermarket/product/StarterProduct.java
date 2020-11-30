package com.supermarket.product;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

/**
 * 商品的微服务启动类
 */
@SpringBootApplication
@EnableEurekaClient
@MapperScan("com.supermarket.product.dao")
public class StarterProduct {
    public static void main(String[] args) {
        SpringApplication.run(StarterProduct.class, args);
    }

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
