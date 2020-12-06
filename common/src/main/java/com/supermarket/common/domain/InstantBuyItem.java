package com.supermarket.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


/**
 * 秒杀商品bean
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InstantBuyItem {
	private String itemId;
	private String name;
	private Integer number;
	private Long initialPrice;
	private Long buyPrice;
	private String sellPoint;
	private Date createTime;
	private Date startTime;
	private Date endTime;
}
