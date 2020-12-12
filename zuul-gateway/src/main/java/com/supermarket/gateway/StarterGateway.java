package com.supermarket.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

/**
 * zuul网关启动类
 */
@SpringBootApplication
@EnableZuulProxy
@EnableEurekaClient
@EnableCircuitBreaker
@EnableFeignClients
public class StarterGateway {
    public static void main(String[] args) {
        SpringApplication.run(StarterGateway.class, args);
    }
}
