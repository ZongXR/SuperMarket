package com.supermarket.instantbuy.dao;

import com.supermarket.common.domain.InstantBuyItem;
import com.supermarket.common.domain.InstantBuySuccess;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
@Mapper
public interface InstantBuyDao {

    /**
     * 查询所有秒杀商品
     * @param date 当前日期
     * @return 所有秒杀商品
     */
    public List<InstantBuyItem> selectItems(@Param("date") Date date);

    /**
     * 查询单个秒杀商品
     * @param itemId 商品id
     * @param date 当前日期
     * @return 单个秒杀商品
     */
    public InstantBuyItem selectItem(@Param("itemId") String itemId, @Param("date") Date date);

    /**
     * 商品数量减一
     * @param itemId 商品id
     */
    public void decreaseItemNum(@Param("itemId") String itemId, @Param("date") Date date);

    /**
     * 插入秒杀成功记录
     * @param instantBuySuccess 秒杀成功记录
     */
    public void insertItemSuccess(InstantBuySuccess instantBuySuccess);
}
