package com.supermarket.common.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

/**
 * 秒杀成功的bean
 */
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InstantBuySuccess {
	private Long successId;
	private String itemId;
	private String userName;
	private Integer state;
	private Date createTime;
}
