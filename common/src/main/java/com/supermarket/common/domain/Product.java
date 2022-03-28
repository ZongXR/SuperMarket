package com.supermarket.common.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel(description = "商品信息")
@Document(indexName = "supermarket", type = "Product")
public class Product {

	@ApiModelProperty("商品id")
	@Id
	private String  productId;

	@ApiModelProperty("商品名称")
	@Field(type = FieldType.Text, analyzer = "ik_max_word")
	private String  productName;

	@ApiModelProperty("商品单价")
	@Field(type = FieldType.Double)
	private Double  productPrice;

	@ApiModelProperty("商品种类")
	@Field(type = FieldType.Text, analyzer = "ik_max_word")
	private String  productCategory;

	@ApiModelProperty("商品的图片地址")
	@Field(type = FieldType.Keyword, index = false)
	private String  productImgurl;

	@ApiModelProperty("商品数量")
	@Field(type = FieldType.Integer)
	private Integer productNum = 0;

	@ApiModelProperty("商品描述")
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
