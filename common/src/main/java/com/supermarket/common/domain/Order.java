package com.supermarket.common.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * 订单bean，对应t_order
 */
@Setter
@Getter
public class Order {
	private String orderId;//order_id
	private Double orderMoney;//order_money
	private String orderReceiverinfo;//order_receiverinfo
	private Integer orderPaystate;//order_paystate
	private Date orderTime;//order_time
	private String userId;//user_id
	private List<OrderItem> orderItems;//体现一对多关系的属性

}
