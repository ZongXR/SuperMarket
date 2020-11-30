package com.supermarket.search;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.web.client.RestTemplate;

@EnableEurekaClient
@SpringBootApplication
public class StarterSearch {
    public static void main(String[] args) {
        SpringApplication.run(StarterSearch.class, args);
    }

    @Bean
    public NativeSearchQueryBuilder queryBuilder(){
        return new NativeSearchQueryBuilder();
    }

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
