package com.supermarket.user;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
@EnableCircuitBreaker
@MapperScan("com.supermarket.user.dao")
public class StarterUser {
    public static void main(String[] args) {
        SpringApplication.run(StarterUser.class, args);
    }
}
