package com.supermarket.common.domain;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * 购物车的bean，对应t_cart
 */
@Setter
@Getter
public class Cart implements Serializable {
	private Integer id;
	private String userId;
	private String productId;
	private String productImage;
	private String productName;
	private Double productPrice;
	private Integer num;
}
