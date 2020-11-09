package com.supermarket.common.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;


/**
 * 秒杀bean，对应secondkill
 */
@Setter
@Getter
public class SecondKill {
	private Long seckillId;
	private String name;
	private Integer number;
	private Long initialPrice;
	private Long secondkillPrice;
	private String sellPoint;
	private Date createTime;
	private Date startTime;
	private Date endTime;
}
