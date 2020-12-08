package com.supermarket.instantbuy.schedule;

import com.supermarket.common.domain.InstantBuyItem;
import com.supermarket.instantbuy.dao.InstantBuyDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Component
public class ScanTime {
    @Autowired
    private StringRedisTemplate redisTemplate = null;

    @Autowired
    private InstantBuyDao instantBuyDao = null;

    /**
     * 该定时任务用于将符合条件的秒杀商品添加到redis
     */
    @Scheduled(fixedRate = 5000)
    public void addItemToRedis(){
        List<InstantBuyItem> items = this.instantBuyDao.selectItems(new Date());
        for (InstantBuyItem item : items) {
            String itemId = item.getItemId();
            Date startTime = item.getStartTime();
            Date endTime = item.getEndTime();
            Date nowTime = new Date();
            if (nowTime.compareTo(endTime) > 0){
                // 如果扫描出的商品有过期的，就删除掉
                this.redisTemplate.delete("INSTANT_" + itemId);
                continue;
            }
            DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            this.redisTemplate.opsForHash().put("INSTANT_" + itemId, "number", item.getNumber().toString());
            this.redisTemplate.opsForHash().put("INSTANT_" + itemId, "start_time", formatter.format(startTime));
            this.redisTemplate.opsForHash().put("INSTANT_" + itemId, "end_time", formatter.format(endTime));
        }
    }
}
