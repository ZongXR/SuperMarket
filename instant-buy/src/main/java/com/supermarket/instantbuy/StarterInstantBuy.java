package com.supermarket.instantbuy;

import com.rabbitmq.client.AMQP;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableEurekaClient
@EnableScheduling
@EnableCircuitBreaker
@MapperScan("com.supermarket.instantbuy.dao")
public class StarterInstantBuy {
    public static void main(String[] args) {
        SpringApplication.run(StarterInstantBuy.class, args);
    }

    /**
     * 声明队列
     * @return 名为 instantBuy 的消息队列
     */
    @Bean
    public Queue instantBuy(){
        String name = Thread.currentThread().getStackTrace()[1].getMethodName();
        return new Queue(name, true, false, false);
    }

    /**
     * 声明交换机
     * @return 名为 instantBuyExchange 的交换机
     */
    @Bean
    public DirectExchange instantBuyExchange(){
        String name = Thread.currentThread().getStackTrace()[1].getMethodName();
        return new DirectExchange(name, true, false);
    }

    /**
     * 绑定交换机和队列
     * @return 绑定结果
     */
    @Bean
    public Binding bind(){
        return BindingBuilder.bind(instantBuy()).to(instantBuyExchange()).with("instantBuy");
    }
}
