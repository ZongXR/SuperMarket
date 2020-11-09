package com.supermarket.common.domain;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
 * 用户bean，对应t_user
 */
@Setter
@Getter
public class User {
	private String userId;
	@NotBlank
	private String userName;
	@NotBlank
	private String userPassword;
	@NotBlank
	private String userNickname;
	@Email
	private String userEmail;
	private Integer userType = 0;//默认都是0

	public User() {
	}

	public User(String userId, String userName, String userPassword, String userNickname, String userEmail, Integer userType) {
		this.userId = userId;
		this.userName = userName;
		this.userPassword = userPassword;
		this.userNickname = userNickname;
		this.userEmail = userEmail;
		this.userType = userType;
	}
}
