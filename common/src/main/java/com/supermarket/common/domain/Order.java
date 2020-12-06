package com.supermarket.common.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * 订单bean，对应t_order
 */
@Setter
@Getter
@NoArgsConstructor
public class Order {
	private String orderId;//order_id
	private Double orderMoney;//order_money
	private String orderReceiverinfo;//order_receiverinfo
	private Integer orderPaystate;//order_paystate
	private Date orderTime;//order_time
	private String userId;//user_id
	private List<OrderItem> orderItems;//体现一对多关系的属性

	public Order(String orderId, Double orderMoney, String orderReceiverinfo, Integer orderPaystate, Date orderTime, String userId) {
		this.orderId = orderId;
		this.orderMoney = orderMoney;
		this.orderReceiverinfo = orderReceiverinfo;
		this.orderPaystate = orderPaystate;
		this.orderTime = orderTime;
		this.userId = userId;
	}
}
