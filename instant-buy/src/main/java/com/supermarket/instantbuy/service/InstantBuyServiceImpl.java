package com.supermarket.instantbuy.service;

import com.supermarket.common.domain.InstantBuyItem;
import com.supermarket.instantbuy.dao.InstantBuyDao;
import com.supermarket.instantbuy.exception.MsgException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class InstantBuyServiceImpl implements InstantBuyService {
    @Autowired
    private InstantBuyDao instantBuyDao = null;

    @Autowired
    private StringRedisTemplate redisTemplate = null;

    @Autowired
    private RabbitTemplate rabbitTemplate = null;

    @Override
    public List<InstantBuyItem> queryItems() {
        return this.instantBuyDao.selectItems(new Date());
    }

    @Override
    public InstantBuyItem queryItem(String itemId) {
        return this.instantBuyDao.selectItem(itemId, new Date());
    }

    @Override
    public void startBuy(String itemId, String userName) {
        Boolean exists = this.redisTemplate.hasKey("INSTANT_" + itemId);
        if (exists == null || !exists) {
            throw new MsgException("秒杀商品不存在");
        }
        // number 表示减一之后的数字
        long number = this.redisTemplate.opsForHash().increment("INSTANT_" + itemId, "number", -1);
        if (number < 0) {
            if (number == Long.MIN_VALUE)
                // 防止溢出
                this.redisTemplate.delete("INSTANT_" + itemId);
            throw new MsgException("商品已被秒杀完");
        }
        DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date startTime = null;
        Date endTime = null;
        try {
            startTime = formatter.parse((String) this.redisTemplate.opsForHash().get("INSTANT_" + itemId, "start_time"));
            endTime = formatter.parse((String) this.redisTemplate.opsForHash().get("INSTANT_" + itemId, "end_time"));
        } catch (ParseException e){
            e.printStackTrace();
            throw new MsgException("日期格式异常");
        }
        Date nowTime = new Date();
        if (nowTime.compareTo(startTime) < 0)
            throw new MsgException("秒杀还未开始");
        if (nowTime.compareTo(endTime) > 0)
            throw new MsgException("秒杀已经结束");
        // 同一用户不能频繁秒杀同一商品
        Boolean itemUser = this.redisTemplate.hasKey(itemId + userName);
        if (itemUser == null || itemUser)
            throw new MsgException("您已经秒杀过该商品");
        // TODO 剩余商品数量大于0
        String result = (String) this.rabbitTemplate.convertSendAndReceive("instantBuyExchange", "instantBuy", itemId + userName);
        if (result != null && result.equals(itemId + userName + "_SUCCESS")) {
            // 消费成功
            this.redisTemplate.opsForValue().set(itemId + userName, "SUCCESS", 1, TimeUnit.HOURS);
        }else{
            // 消费失败
            throw new MsgException("秒杀失败");
        }
    }
}
