package com.supermarket.common.domain;

import lombok.Getter;
import lombok.Setter;

/**
 * 订单商品的bean，对应t_order_item
 */
@Setter
@Getter
public class OrderItem {
	private Long id;
	private String orderId;
	private String productId;
	private Integer num;
	private String productImage;
	private String productName;
	private Double productPrice;
}
