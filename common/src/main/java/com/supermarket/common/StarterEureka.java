package com.supermarket.common;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * 这个类是springcloud的注册中心启动类
 */
@SpringBootApplication
@EnableEurekaServer
@EnableCircuitBreaker
public class StarterEureka {
    public static void main(String[] args) {
        SpringApplication.run(StarterEureka.class, args);
    }
}
