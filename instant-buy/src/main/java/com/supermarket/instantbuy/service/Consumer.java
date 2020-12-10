package com.supermarket.instantbuy.service;

import com.supermarket.common.domain.InstantBuyItem;
import com.supermarket.common.domain.InstantBuySuccess;
import com.supermarket.instantbuy.dao.InstantBuyDao;
import com.supermarket.instantbuy.exception.MsgException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Component
public class Consumer {
    @Autowired
    private RabbitTemplate rabbitTemplate = null;

    @Autowired
    private InstantBuyDao instantBuyDao = null;

    /**
     * 监控消息队列
     * @param msg 消息
     */
    @Transactional(rollbackFor = Throwable.class)
    @RabbitListener(queues = "instantBuy")
    @SendTo("instantBuy")
    public String consumeInstantBuy(String msg){
        try {
            String itemId = msg.substring(0, 36);
            String userName = msg.substring(36, msg.length());
            Date date = new Date();
            this.instantBuyDao.decreaseItemNum(itemId, date);
            this.instantBuyDao.insertItemSuccess(new InstantBuySuccess(
                    null, itemId, userName, 0, date
            ));
            InstantBuyItem item = this.instantBuyDao.selectItem(itemId, date);
            if (item.getNumber() < 0)
                throw new MsgException("商品已被秒杀完");
            return msg + "_SUCCESS";
        }catch (Exception e){
            e.printStackTrace();
            return msg + "_FAIL";
        }
    }
}
