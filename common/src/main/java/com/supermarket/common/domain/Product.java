package com.supermarket.common.domain;

import lombok.Getter;
import lombok.Setter;

/**
 * 商品bean，对应t_product
 */
@Setter
@Getter
public class Product {
	private String  productId;
	private String  productName;
	private Double  productPrice;
	private String  productCategory;
	private String  productImgurl;
	private Integer productNum = 0;
	private String  productDescription;

	@Override
	public String toString() {
		return "Product [productId=" + productId + ", productName=" + productName + ", productPrice=" + productPrice
				+ ", productCategory=" + productCategory + ", productImgurl=" + productImgurl + ", productNum="
				+ productNum + ", productDescription=" + productDescription + "]";
	}
}
