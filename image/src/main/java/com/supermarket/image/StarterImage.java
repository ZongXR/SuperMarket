package com.supermarket.image;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class StarterImage {
    public static void main(String[] args) {
        SpringApplication.run(StarterImage.class, args);
    }
}
