package com.supermarket.instantbuy.service;

import com.supermarket.common.domain.InstantBuyItem;
import com.supermarket.instantbuy.dao.InstantBuyDao;
import com.supermarket.instantbuy.exception.MsgException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

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
        Integer number = (Integer) this.redisTemplate.opsForHash().get("INSTANT_" + itemId, "number");
        if (number == null) {
            throw new MsgException("秒杀商品不存在");
        }
        Date startTime = (Date) this.redisTemplate.opsForHash().get("INSTANT_" + itemId, "start_time");
        Date endTime = (Date) this.redisTemplate.opsForHash().get("INSTANT_" + itemId, "end_time");
        Date nowTime = new Date();
        if (nowTime.compareTo(startTime) < 0)
            throw new MsgException("秒杀还未开始");
        if (nowTime.compareTo(endTime) > 0)
            throw new MsgException("秒杀已经结束");
        // 同一用户不能频繁秒杀同一商品
        Boolean exists = this.redisTemplate.hasKey(itemId + userName);
        if (exists == null || exists)
            throw new MsgException("您已经秒杀过该商品");
        // 检查剩余数量
        if (number > 0) {
            // TODO 剩余商品数量大于0
            this.redisTemplate.opsForValue().decrement(itemId);
            String result = (String) this.rabbitTemplate.convertSendAndReceive("instantBuyExchange", "instantBuy", itemId + userName);
            if (result != null && result.equals(itemId + userName + "_SUCCESS")) {
                // 消费成功
                this.redisTemplate.opsForValue().set(itemId + userName, "1", 1, TimeUnit.HOURS);
                return;
            }else{
                // 消费失败
                throw new MsgException("秒杀失败");
            }
        } else {
            // TODO 剩余商品数量不足
            throw new MsgException("秒杀完了");
        }
    }
}
