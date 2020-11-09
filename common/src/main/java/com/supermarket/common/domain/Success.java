package com.supermarket.common.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 成功的bean，对应success
 */
@Setter
@Getter
public class Success {
	private Long successId;
	private Long secondkillId;
	private Long userPhone;
	private Integer state;
	private Date createTime;
}
