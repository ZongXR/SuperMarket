package com.supermarket.common.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

/**
 * 商品bean，对应t_product
 */
@Setter
@Getter
@Document(indexName = "supermarket", type = "Product")
public class Product {
	@Id
	private String  productId;

	@Field(type = FieldType.Text, analyzer = "ik_max_word")
	private String  productName;

	@Field(type = FieldType.Double)
	private Double  productPrice;

	@Field(type = FieldType.Text, analyzer = "ik_max_word")
	private String  productCategory;

	@Field(type = FieldType.Keyword, index = false)
	private String  productImgurl;

	@Field(type = FieldType.Integer)
	private Integer productNum = 0;

	@Field(type = FieldType.Text, analyzer = "ik_max_word")
	private String  productDescription;

	@Override
	public String toString() {
		try {
			return new ObjectMapper().writeValueAsString(this);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return "{" +
					"\"productId\": \"" + this.productId + "\"," +
					"\"productName\": \"" + this.productName + "\"," +
					"\"productPrice\": " + this.productPrice + "," +
					"\"productCategory\": \"" + this.productCategory + "\"," +
					"\"productImgurl\": \"" + this.productImgurl + "\"," +
					"\"productNum\": " + this.productNum + "," +
					"\"productDescription\": \"" + this.productDescription + "\"," +
					"}";
		}
	}
}
