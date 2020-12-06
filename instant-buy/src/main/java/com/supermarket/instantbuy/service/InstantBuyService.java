package com.supermarket.instantbuy.service;

import com.supermarket.common.domain.InstantBuyItem;

import java.util.List;

public interface InstantBuyService {
    /**
     * 查询所有可以秒杀的商品
     * @return 所有秒杀商品
     */
    public List<InstantBuyItem> queryItems();

    /**
     * 查询一个秒杀商品
     * @param itemId 秒杀商品id
     * @return 秒杀商品
     */
    public InstantBuyItem queryItem(String itemId);

    /**
     * 发起秒杀
     * @param itemId 商品id
     * @param userName 用户名
     */
    public void startBuy(String itemId, String userName);
}
