//*************************公共方法和变量*************************
var errorUrl = OrderAppConfig.Domain + "/orderBack.html?rid=";
var cartUrl = "http://cart.jd.com/cart/cart.html";
var lipinkaPhysicalUrl = "http://market.jd.com/giftcard/#entity";
var orderUrl = OrderAppConfig.Domain + "/order/getOrderInfo.action";
var stepLoading = '<div class="step-loading"><div class="loading-style1"><b></b>正在加载中，请稍候...</div></div>';

 function check_Phone(divId){
	 if($("#consignee_mobile").val().length == 11) {
		 value = $("#consignee_mobile").val();
		 if (check_mobile(value)) {
			 $("#call_div_error").hide();
		 } else {
			 $("#call_div_error").show();
		 }
	 }
}
/**
 * 编辑公共方法
 * 
 * @param name
 */
function edit_before(name) {
	cleanSubmitMessage();
	// 备份之前html
	var actionAfter = "<span style='display:none'><a href=\"#none\" onclick=\"back_Before('" + name
			+ "')\">[关闭]</a></span>";
	var actionBefore = $("#" + name + "_edit_action").html();
	$("#" + name).html(stepLoading);
	$("#" + name + "_edit_action").hide();
	$("#" + name + "_edit_action").html(actionAfter);
	$("#" + name + "_back_action").html(actionBefore);
	// 设置编辑打开变高亮
	step_Openlight(name);
	return true;
}

/**
 * 清除submit错误消息
 */
function cleanSubmitMessage(){
	$("#submit_message").html("");
	$("#submit_message").hide();
}

/**
 * 关闭公共方法
 */
function back_Before(name) {
	var newUser = $("#isOpenConsignee").val();
	if(name=="consignee"&&(newUser==1||newUser=="1")){
		alert("请填写收货人地址！");
		return false;
	}
	var actionBefore = $("#" + name + "_back_action").html();
	var beforeHtml = $("#" + name + "_back").html();
	if (beforeHtml != null) {
		$("#" + name).html(beforeHtml);
	}
	if (actionBefore != null) {
		$("#" + name + "_edit_action").html(actionBefore);
	}
	$("#" + name + "_edit_action").show();
	// 设置关闭变灰
	set_CloseLight(name);
	removeMessageTip();
}

/**
 * 点击保存公共方法,显示修改操作
 */
function save_Module(name) {

	var actionBefore = $("#" + name + "_back_action").html();
	$("#" + name + "_edit_action").html(actionBefore);
	// 设置关闭变灰
	set_CloseLight(name);
	removeMessageTip();
}


/**
 * 设置高亮选中
 * 
 * @param step
 */
function step_Openlight(step) {
	if (step == OrderAppConfig.Module_Consignee) {
		$("#step-1").addClass("step-current");
		$("#"+OrderAppConfig.Module_PayAndShip+"_edit_action").html("<font color='#B0B0B0'>如需修改，请先保存收货人信息</font>");
		$("#"+OrderAppConfig.Module_Invoice+"_edit_action").html("<font color='#B0B0B0'>如需修改，请先保存收货人信息</font>");
		$("#submit_check_info_message").html("<span>您需先保存<a style='color:#005EA7;' href='#consigneeFocus'>收货人信息</a>，再提交订单 <input type='hidden' id='anchor_info' value='consigneeFocus'></span>").show();
		$("#order-submit").attr("class", "checkout-submit-disabled");
	} else if (step == OrderAppConfig.Module_PayAndShip) {
		$("#step-2").addClass("step-current");
		$("#"+OrderAppConfig.Module_Consignee+"_edit_action").html("<font color='#B0B0B0'>如需修改，请先保存支付及配送方式</font>");
		$("#"+OrderAppConfig.Module_Invoice+"_edit_action").html("<font color='#B0B0B0'>如需修改，请先保存支付及配送方式</font>");
		$("#submit_check_info_message").html("<span>您需先保存<a style='color:#005EA7;' href='#payAndShipFocus'>支付及配送方式</a>，再提交订单  <input type='hidden' id='anchor_info' value='payAndShipFocus'></span>").show();
		$("#order-submit").attr("class", "checkout-submit-disabled");
	} else if (step == OrderAppConfig.Module_Invoice) {
		$("#step-3").addClass("step-current");
		$("#"+OrderAppConfig.Module_PayAndShip+"_edit_action").html("<font color='#B0B0B0'>如需修改，请先保存发票信息</font>");
		$("#"+OrderAppConfig.Module_Consignee+"_edit_action").html("<font color='#B0B0B0'>如需修改，请先保存发票信息</font>");
		$("#submit_check_info_message").html("<span>您需先保存<a style='color:#005EA7;' href='#invoiceFocus'>发票信息</a>，再提交订单 <input type='hidden' id='anchor_info' value='invoiceFocus'></span>").show();
		$("#order-submit").attr("class", "checkout-submit-disabled");
	}
}

/**
 * 关闭高亮选中
 * 
 * @param step
 */
function set_CloseLight(step) {
	if (step == OrderAppConfig.Module_Consignee) {
		$("#step-1").removeClass("step-current");
		$("#"+OrderAppConfig.Module_PayAndShip+"_edit_action").html("<a onclick='edit_Payment(false)' href='#none'>[修改]</a>");
		$("#"+OrderAppConfig.Module_Invoice+"_edit_action").html("<a onclick='edit_Invoice()' href='#none'>[修改]</a>");
		$("#submit_check_info_message").html("").hide();
		$("#order-submit").attr("class", "checkout-submit");
	} else if (step == OrderAppConfig.Module_PayAndShip) {
		$("#step-2").removeClass("step-current");
		$("#"+OrderAppConfig.Module_Consignee+"_edit_action").html("<a onclick='edit_Consignee()' href='#none'>[修改]</a>");
		$("#"+OrderAppConfig.Module_Invoice+"_edit_action").html("<a onclick='edit_Invoice()' href='#none'>[修改]</a>");
		$("#submit_check_info_message").html("").hide();
		$("#order-submit").attr("class", "checkout-submit");
	} else if (step == OrderAppConfig.Module_Invoice) {
		$("#step-3").removeClass("step-current");
		$("#"+OrderAppConfig.Module_PayAndShip+"_edit_action").html("<a onclick='edit_Payment()' href='#none'>[修改]</a>");
		$("#"+OrderAppConfig.Module_Consignee+"_edit_action").html("<a onclick='edit_Consignee()' href='#none'>[修改]</a>");	
		$("#submit_check_info_message").html("").hide();
		$("#order-submit").attr("class", "checkout-submit");
	}
}


/**
 * 用户向导提示
 * 
 * @param step1
 * @param step2
 */
function check_step(curStep) {
	var steps = new Array(OrderAppConfig.Module_Consignee,
			OrderAppConfig.Module_Invoice, OrderAppConfig.Module_PayAndShip);
	for ( var i = 0; i < steps.length; i++) {
		var step = steps[i];
		if (step != curStep) {
			var edit_Action = $("#" + step + "_edit_action").html();
			if (edit_Action.indexOf("[关闭]") > -1) {
				if (step == OrderAppConfig.Module_Consignee) {
					alert("请保存收货人信息!");
					return false;
				} else if (step == OrderAppConfig.Module_Invoice) {
					alert("请保存发票信息!");
					return false;
				} else if (step == OrderAppConfig.Module_PayAndShip) {
					alert("请保存支付和配送信息!");
					return false;
				}
			}
		}
	}
	return true;
}

/**
 * 判断服务是否返回有消息【此方法别动】
 * 
 * @param data
 * @returns {Boolean}
 */
function isHasMessage(data) {
	if (data.errorMessage) {
		return true;
	} else {
		try {
			if (data != null && data.indexOf("\"errorMessage\":") > -1) {
				var mesageObject = eval("(" + data + ")");
				if (mesageObject != null && mesageObject.errorMessage != null) {
					return true;
				}
			}

		} catch (e) {
		}
	}
	return false;
}

/**
 * 将消息返回【此方法别动】
 * 
 * @param data
 * @return
 */
function getMessage(data) {
	if (data.errorMessage) {
		return data.errorMessage;
	} else {
		try {
			var mesageObject = eval("(" + data + ")");
			if (mesageObject != null && mesageObject.errorMessage != null
					&& mesageObject.errorMessage != "") {
				return mesageObject.errorMessage;
			}
		} catch (e) {
		}
	}
	return null;
}

/**
 * 判断用户是否登录【此方法别动】
 */
function isUserNotLogin(data) {
	if (data.error == "NotLogin") {
		return true;
	} else {
		try {
			var obj = eval("(" + data + ")");
			if (obj != null && obj.error != null && obj.error == "NotLogin") {
				return true;
			}
		} catch (e) {
		}
	}
	return false;
}

/**
 * 去登录页面
 */
function goToLogin() {
	if(isLocBuy()){
		window.location.href = OrderAppConfig.LoginLocUrl + "?rid=" + Math.random();
	}else{
		window.location.href = OrderAppConfig.LoginUrl + "?rid=" + Math.random();
	}
}

/**
 * 去购物车页面
 */
function goCart() {
    if(isLipinkaPhysical()){
        window.location.href = lipinkaPhysicalUrl;
    }else{
        window.location.href = cartUrl + "?rid=" + Math.random();
    }

}
/**
 * 刷新结算页面
 */
function goOrder() {
    if(isLipinkaPhysical()){
        window.location.href =  OrderAppConfig.Domain + "/order/getLipinkaPhysicalOrderInfo.action?rid=" + Math.random();
    }else{
        window.location.href = orderUrl + "?rid=" + Math.random();
    }

}


// ******************************************************收货地址开始**************************************************************

/**
 * 编辑收货人地址
 * 
 * @param consigneeId
 */
function edit_Consignee(selectId) {
	// 保存修改前的值
	if (!edit_before(OrderAppConfig.Module_Consignee)) {
		return;
	}
	var actionUrl = OrderAppConfig.DynamicDomain + "/consignee/editConsignee.action";
	var consigneeId = $("#consignee_id").val();
	if (isEmpty(consigneeId)) {
		consigneeId = 0;
	}
	var param = "consigneeParam.id=" + consigneeId;
	param = addFlowTypeParam(param);
	jQuery.ajax( {
		type : "POST",
		dataType : "text",
		url : actionUrl,
		data : param,
		cache : false,
		success : function(dataResult, textStatus) {
			// 没有登录跳登录
		if (isUserNotLogin(dataResult)) {
			goToLogin();
			return;
		}
		// 服务器返回异常处理,如果有消息div则放入,没有则弹出
		if (isHasMessage(dataResult)) {
			var message = getMessage(dataResult);
			alert(message);
			back_Before(OrderAppConfig.Module_Consignee);
		}
		// 成功后如果有divID直接放入div，没有则返回结果
		else {
			$("#"+OrderAppConfig.Module_Consignee+"_edit_action").html("<a href='#none' id='saveConsigneeTitleMinDiv'  style='color:#005EA7;'  onclick='save_Consignee()'>保存收货人信息</a>");
			$("#" + OrderAppConfig.Module_Consignee + "_edit_action").show();
			$("#" + OrderAppConfig.Module_Consignee).html(dataResult);
			itemListOver.init("#consignee-list");
			var isNewUser=$("#consignee_radio_new").attr("checked");
			if(isNewUser){
				var provinceId = $("#consignee_province").find("option:selected").val();
				if(isEmpty(provinceId)){
					loadProvinces();
				}
			}
			if( !isEmpty(selectId) && isNumber(selectId)){
				show_ConsigneeDetail(selectId,"showMessage");
			}

		}
	},
	error : function(XMLHttpResponse) {
		alert("系统繁忙，请稍后再试！");
		back_Before(OrderAppConfig.Module_Consignee);
	}
	});
}


/**
 * 设置当前常用收货地址变高亮，其他不亮
 * 
 * @param id
 */
function set_CurrentConsignee(id) {
	var parentDiv = $("#consignee_radio_" + id).parent();
	var indexNumCurrent = parentDiv.attr("index").split("_")[2];
	var consigneeList = $("#consignee-list");
	consigneeList.find(".item").each(function() {
		if ($(this).attr("index") == null) {
			$(this).attr("class", "item");
		} else {
			var indexNum = $(this).attr("index").split("_")[2];
			if (indexNumCurrent == indexNum) {
				$(this).attr("class", "item item-selected");
			} else {
				if (parseInt(indexNum) > 5) {
					$(this).attr("class", "item item-fore hide");
				} else {
					$(this).attr("class", "item");
				}
				try {
					$(this).find("span").eq(0).hide();
				} catch (e) {
				}
			}
		}
	});
	$("#consignee_radio_" + id).attr("checked", "checked");
	$("#consignee_radio_" + id).parents(".item").find(".item-action").show()
			.removeClass("hide");
}

/**
 * 选择常用收货人地址
 * 
 * @param id
 */
function chose_Consignee(id) {
	$("#consignee-form").hide();
	$("#use-new-address").attr("class", "item");
	$("#consignee_radio_" + id).attr("checked", "checked");
	$("#addNumLimitNote").css("display", "none");
	set_CurrentConsignee(id);
	var address = $("#hidden_consignee_address_" + id).val();
	if (isEmpty(address)) {
		loadAllAreaName(id);
	}
	open_easyBuyConsignee(id);
}

/**
 * 加载四级地址名称
 * 
 * @param id
 */
function loadAllAreaName(id) {
	var address = null;
	var consignee_where = $("#hidden_consignee_where_" + id).val();
	var provinceId = $("#hidden_consignee_provinceId_" + id).val();
	var cityId = $("#hidden_consignee_cityId_" + id).val();
	var countyId = $("#hidden_consignee_countyId_" + id).val();
	var townId = $("#hidden_consignee_townId_" + id).val();
	var actionUrl = OrderAppConfig.DynamicDomain + "/consignee/loadAreaName.action";
	var param = "consigneeParam.provinceId=" + provinceId
			+ "&consigneeParam.cityId=" + cityId + "&consigneeParam.countyId="
			+ countyId + "&consigneeParam.townId=" + townId;
	jQuery.ajax( {
		type : "POST",
		dataType : "text",
		url : actionUrl,
		data : param,
		cache : false,
		success : function(dataResult, textStatus) {
			// 没有登录跳登录
		if (isUserNotLogin(dataResult)) {
			goToLogin();
			return;
		}
		if (isHasMessage(dataResult)) {
			var message = getMessage(dataResult);
			alert(message);
		} else {
			address = consignee_where.replace(dataResult, "");
			$("#hidden_consignee_address_" + id).val(address);
		}
	},
	error : function(XMLHttpResponse) {
		alert("系统繁忙，请稍后再试！");
		return false;
	}
	});
}

/**
 * 编辑常用收货地址,展开对应信息
 */
function show_ConsigneeDetail(id,showMessage) {
	// 隐藏20个数量的限制的提示
	$("#addNumLimitNote").css("display", "none");

	$("#consignee-form").show();
	// 设置收货地址详细值
	$("#consignee_radio_" + id).attr("checked", "checked");
	var consignee_id = $("#hidden_consignee_id_" + id).val();
	var consignee_type = $("#hidden_consignee_type_" + id).val();
	var consignee_name = $("#hidden_consignee_name_" + id).val();
	var consignee_provinceName = $("#hidden_consignee_provinceName_" + id)
			.val();
	var consignee_cityName = $("#hidden_consignee_cityName_" + id).val();
	var consignee_countyName = $("#hidden_consignee_countyName_" + id).val();
	var consignee_townName = $("#hidden_consignee_townName_" + id).val();
	var consignee_provinceId = $("#hidden_consignee_provinceId_" + id).val();
	var consignee_cityId = $("#hidden_consignee_cityId_" + id).val();
	var consignee_countyId = $("#hidden_consignee_countyId_" + id).val();
	var consignee_townId = $("#hidden_consignee_townId_" + id).val();
	var consignee_email = $("#hidden_consignee_email_" + id).val();
	var consignee_mobile = $("#hidden_consignee_mobile_" + id).val();
	var consignee_address = $("#hidden_consignee_address_" + id).val();
	var consignee_phone = $("#hidden_consignee_phone_" + id).val();
	$("#consignee_form_id").val(consignee_id);
	$("#consignee_type").val(consignee_type);
	$("#consignee_name").val(consignee_name);
	$("#consignee_email").val(consignee_email);
	$("#consignee_phone").val(consignee_phone);
	$("#consignee_mobile").val(consignee_mobile);
	$("#consignee_address").val(consignee_address);
	$("#consignee-form").show();
	// 展开三级地址
	$("#consignee_province").empty();
	$("#consignee_city").empty();
	$("#consignee_county").empty();
	$("#consignee_town").empty();
	$("#consignee_province").append(
			"<option value='" + consignee_provinceId + "' selected >"
					+ consignee_provinceName + "</option>");
	$("#consignee_city").append(
			"<option value='" + consignee_cityId + "' selected >"
					+ consignee_cityName + "</option>");
	$("#consignee_county").append(
			"<option value='" + consignee_countyId + "' selected >"
					+ consignee_countyName + "</option>");
	// 判断是否有四级地址，如果有则加载四级地址信息
	if (consignee_townId != null && consignee_townId != "0"
			&& !isNaN(consignee_townId)) {
		$("#consignee_town").append(
				"<option value='" + consignee_townId + "' selected >"
						+ consignee_townName + "</option>");
		$("#span_town").show();
	}
	$("#use-new-address").attr("class", "item");
	set_CurrentConsignee(id);
	removeConsingeeMessage();
	if(!isEmpty(showMessage) && showMessage == "showMessage"){
		$("#area_div").addClass("message");
		$("#area_div_error").html("请重新选择地址信息");
	}
	// 异步加载四级地址
	loadAreaDetail(id, consignee_provinceId, consignee_cityId,
			consignee_countyId, consignee_townId);
}

/**
 * 删除收货人验证提示信息
 */
function removeConsingeeMessage() {
	$("#name_div").removeClass("message");
	$("#area_div").removeClass("message");
	$("#address_div").removeClass("message");
	$("#call_div").removeClass("message");
	$("#email_div").removeClass("message");
	$("#name_div_error").html("");
	$("#area_div_error").html("");
	$("#address_div_error").html("");
	$("#call_div_error").html("");
	$("#email_div_error").html("");
}

/**
 * 加载四级地址，并选中默认值
 * 
 * @param provinceId
 * @param cityId
 * @param countyId
 * @param townId
 */
function loadAreaDetail(id, provinceId, cityId, countyId, townId) {
	var param = "consigneeParam.provinceId=" + provinceId
			+ "&consigneeParam.cityId=" + cityId + "&consigneeParam.countyId="
			+ countyId + "&consigneeParam.townId=" + townId;
	var actionUrl = OrderAppConfig.DynamicDomain + "/consignee/loadAllAreas.action";
	jQuery.ajax( {
		type : "POST",
		dataType : "text",
		url : actionUrl,
		data : param,
		cache : false,
		success : function(dataResult, textStatus) {
			// 没有登录跳登录
		if (isUserNotLogin(dataResult)) {
			goToLogin();
			return;
		}
		if (isHasMessage(dataResult)) {
			var message = getMessage(dataResult);
			alert(message);
		} else {
			$("#span_area").html(dataResult);
			// 如果有地址则直接赋值
		var address = $("#hidden_consignee_address_" + id).val();
		var provinceName = $("#consignee_province").find("option:selected").text();
		var countyName = $("#consignee_county").find("option:selected").text();
		var cityName = $("#consignee_city").find("option:selected").text();
		var townName = $("#consignee_town").find("option:selected").text();
		provinceName = provinceName.replace("*", "");
		cityName = cityName.replace("*", "");
		countyName = countyName.replace("*", "");
		var areaName = provinceName + cityName + countyName;
		if (townId > 0 && !isEmpty(townName)) {
			townName = townName.replace("*", "");
			areaName = areaName + townName;
		}
		// 没有地址重新赋值
		if (isEmpty(address)) {
			address = $("#hidden_consignee_where_" + id).val();		
			address = address.replace(areaName, "");
		}
		$("#consignee_address").val(address);
		$("#areaNameTxt").text(areaName);
		$("#codHelpUrl").attr("href","http://help.jd.com/help/distribution-768-"+provinceId+"-"+cityId+"-"+countyId+"-"+(isEmpty(townId)?0:townId)+"-"+(new Date()).getTime()+".html");
	}
},
error : function(XMLHttpResponse) {
	alert("系统繁忙，请稍后再试！");
	return false;
}
	});
}

/**
 * 获取省份列表
 */
function loadProvinces() {
	var actionUrl = OrderAppConfig.DynamicDomain + "/consignee/getProvinces.action";
	jQuery.ajax( {
		type : "POST",
		dataType : "text",
		url : actionUrl,
		data : null,
		cache : false,
		success : function(dataResult, textStatus) {
				// 没有登录跳登录
			if (isUserNotLogin(dataResult)) {
				goToLogin();
				return;
			}
			if (isHasMessage(dataResult)) {
				var message = getMessage(dataResult);
				alert(message);
			} else {
				$("#span_province").html(dataResult);
			}
		},
		error : function(XMLHttpResponse) {
			alert("系统繁忙，请稍后再试！");
			return false;
		}
	});
}

/**
 * 获取城市列表
 */
function loadCitys() {
	var provinceId = $("#consignee_province").find("option:selected").val();
	var provinceName=isEmpty(provinceId)?"":$("#consignee_province").find("option:selected").text().replace("*","");
	$("#areaNameTxt").html(provinceName);
	$("#codHelpUrl").attr("href","http://help.jd.com/help/distribution-768-"+(isEmpty(provinceId)?0:provinceId)+"-"+0+"-"+0+"-"+0+"-"+(new Date()).getTime()+".html");
	if (provinceId == null || provinceId == "") {
		$("#span_city")
				.html(
						"<select id=\"consignee_city\" name=\"consigneeParam.city\"><option selected=\"\" value=\"\">请选择：</option></select>");
		$("#span_county")
				.html(
						"<select id=\"consignee_county\" name=\"consigneeParam.countyId\"><option selected=\"\" value=\"\">请选择：</option></select>");
		$("#span_town").html("");
		return;
	}
	var param = "consigneeParam.provinceId=" + provinceId;
	var actionUrl = OrderAppConfig.DynamicDomain + "/consignee/getCitys.action";
	jQuery
			.ajax( {
				type : "POST",
				dataType : "text",
				url : actionUrl,
				data : param,
				cache : false,
				success : function(dataResult, textStatus) {
					// 没有登录跳登录
					if (isUserNotLogin(dataResult)) {
						goToLogin();
						return;
					}
					if (isHasMessage(dataResult)) {
						var message = getMessage(dataResult);
						alert(message);
					} else {
						$("#span_city").html(dataResult);
						$("#span_county")
								.html(
										"<select id=\"consignee_county\" name=\"consigneeParam.countyId\"><option selected=\"\" value=\"\">请选择：</option></select>");
						$("#span_town").html("");
					}
				},
				error : function(XMLHttpResponse) {
					alert("系统繁忙，请稍后再试！");
					return false;
				}
			});
}

/**
 * 获取县级列表
 */
function loadCountys() {
	var cityId = $("#consignee_city").find("option:selected").val();
	var provinceName=$("#consignee_province").find("option:selected").text().replace("*","");
	var cityName = isEmpty(cityId)? "": $("#consignee_city").find("option:selected").text().replace("*","");
	$("#areaNameTxt").text(provinceName+cityName);
	$("#codHelpUrl").attr("href","http://help.jd.com/help/distribution-768-"+$("#consignee_province").find("option:selected").val()+"-"+(isEmpty(cityId)?0:cityId)+"-"+0+"-"+0+"-"+(new Date()).getTime()+".html");
	var param = "consigneeParam.cityId=" + cityId;
	var actionUrl = OrderAppConfig.DynamicDomain + "/consignee/getCountys.action";
	jQuery.ajax( {
		type : "POST",
		dataType : "text",
		url : actionUrl,
		data : param,
		cache : false,
		success : function(dataResult, textStatus) {
			// 没有登录跳登录
		if (isUserNotLogin(dataResult)) {
			goToLogin();
			return;
		}
		if (isHasMessage(dataResult)) {
			var message = getMessage(dataResult);
			alert(message);
		} else {
			if (dataResult != null) {
				$("#span_county").html(dataResult);
				$("#span_town").html("");
			}
		}
	},
	error : function(XMLHttpResponse) {
		alert("系统繁忙，请稍后再试！");
		return false;
	}
	});
}

/**
 * 获取乡镇街道列表
 */
function loadTowns() {
	var countyId = $("#consignee_county").find("option:selected").val();
	var provinceName=$("#consignee_province").find("option:selected").text().replace("*","");
	var cityName =  $("#consignee_city").find("option:selected").text().replace("*","");
	var countyName =isEmpty(countyId)? "": $("#consignee_county").find("option:selected").text().replace("*","");
	$("#areaNameTxt").text(provinceName+cityName+countyName);
	$("#codHelpUrl").attr("href","http://help.jd.com/help/distribution-768-"+$("#consignee_province").find("option:selected").val()+"-"+$("#consignee_city").find("option:selected").val()+"-"+(isEmpty(countyId)?0:countyId)+"-"+0+"-"+(new Date()).getTime()+".html");

	var param = "consigneeParam.countyId=" + countyId;
	var actionUrl = OrderAppConfig.DynamicDomain + "/consignee/getTowns.action";
	jQuery.ajax( {
		type : "POST",
		dataType : "text",
		url : actionUrl,
		data : param,
		cache : false,
		success : function(dataResult, textStatus) {
			// 没有登录跳登录
		if (isUserNotLogin(dataResult)) {
			goToLogin();
			return;
		}
		if (isHasMessage(dataResult)) {
			var message = getMessage(dataResult);
			alert(message);
		} else {
			if (dataResult != null && dataResult != "area_empty") {
				$("#span_town").html(dataResult);
				$("#span_town").show();
			} else {
				$("#span_town").html("");
				$("#span_town").hide();
			}
		}
	},
	error : function(XMLHttpResponse) {
		alert("系统繁忙，请稍后再试！");
		return false;
	}
	});
}

function setTownName(){
	var provinceName=$("#consignee_province").find("option:selected").text().replace("*","");
	var cityName =  $("#consignee_city").find("option:selected").text().replace("*","");
	var countyName = $("#consignee_county").find("option:selected").text().replace("*","");
	var townName = $("#consignee_town").find("option:selected").text().replace("*","");
	
	var provinceId=$("#consignee_province").find("option:selected").val();
	var cityId =  $("#consignee_city").find("option:selected").val();
	var countyId = $("#consignee_county").find("option:selected").val();
	var townId = $("#consignee_town").find("option:selected").val();
	$("#areaNameTxt").text(provinceName+cityName+countyName+townName);
	$("#codHelpUrl").attr("href","http://help.jd.com/help/distribution-768-"+provinceId+"-"+cityId+"-"+countyId+"-"+(isEmpty(townId)?0:townId)+"-"+(new Date()).getTime()+".html");

}

/**
 * 删除收货人地址
 */
function delete_Consignee(id) {
	var param = "consigneeParam.id=" + id;
	var actionUrl = OrderAppConfig.DynamicDomain + "/consignee/deleteConsignee.action";
	param = addFlowTypeParam(param);
	jQuery.ajax( {
				type : "POST",
				dataType : "json",
				url : actionUrl,
				data : param,
				cache : false,
				success : function(dataResult, textStatus) {
					// 没有登录跳登录
					if (isUserNotLogin(dataResult)) {
						goToLogin();
						return;
					}
					if (isHasMessage(dataResult)) {
						alert(getMessage(dataResult));
					} else {
						var index = 0;
						var commonConsigeeSize = $("#hidden_consignees_size")
								.val();
						var consigneeSize = parseInt(commonConsigeeSize);
						if (consigneeSize > 0) {
							consigneeSize = consigneeSize - 1;
							$("#hidden_consignees_size")
									.val("" + consigneeSize);
						}
						if ($("#consignee-list").find(".hookbox").size() == 1) {
							$("#consignee_radio_" + id).parent().remove();
							use_NewConsignee();
						} else {
							$("#consignee_radio_" + id).parent().remove();
							// 改变索引
							$("#consignee-list")
									.find("div")
									.each(
											function() {
												if ($(this).attr("index") != null) {
													index = index + 1;
													$(this).attr(
															"index",
															"consignee_index_"
																	+ index);
												}
											});
							// 如果没有选中的则默认选中第一个地址
							if ($("#consignee-list").find(".hookbox").size() > 0
									&& $("#consignee-list").find(
											".hookbox[checked]").size() == 0) {
								var consigneeId = $("#consignee-list").find(
										".hookbox").eq(0).val();
								// 选择下一个收货地址
								if (consigneeId != null && consigneeId != ""
										&& parseInt(consigneeId) > 0) {
									chose_Consignee(consigneeId);
								}
							}
							// 重新刷新常用地址（删除后重新显示前五个）
							refresh_Consignee();
						}
					}
				},
				error : function(XMLHttpResponse) {
					alert("系统繁忙，请稍后再试！");
					return false;
				}
			});
}

/**
 * 检查地址是否是最大数量
 * 
 * @returns {Boolean}
 */
function checkMaxConsigneeSize(type) {
	var isMaxConsigneeSize = false;
	var commonConsigeeSize = $("#hidden_consignees_size").val();
	if (type == "use_NewConsignee") {
		if (commonConsigeeSize >= 20) {
			isMaxConsigneeSize = true;
		}
	} else if (type == "save_Consignee") {
		if (commonConsigeeSize > 20) {
			isMaxConsigneeSize = true;
		}
	}
	if (isMaxConsigneeSize) {
		$("#use-new-address").attr("class", "item message");
		$("#addNumLimitNote").css("display", "block");
		$("#consignee_radio_new").attr("checked", "checked");
		$("#consignee-form").hide();
	}
	return isMaxConsigneeSize;
}

/**
 * 使用新收获人地址
 */
function use_NewConsignee() {
	if (checkMaxConsigneeSize("use_NewConsignee")) {
		return;
	}
	removeConsingeeMessage();
	$("#use-new-address").attr("class", "item");
	$("#addNumLimitNote").css("display", "none");
	$("#consignee_radio_new").attr("checked", "checked");
	$("#consignee-form").show();
	$('#consignee_form_reset').click();
	$("#consignee_province").empty();
	$("#consignee_city").empty();
	$("#consignee_county").empty();
	$("#consignee_town").empty();
	$("#consignee_province").append("<option value='' selected>请选择：</option>");
	$("#consignee_city").append("<option value=''    selected>请选择：</option>");
	$("#consignee_county").append("<option value=''  selected>请选择：</option>");
	$("#consignee_town").append("<option value=''  selected>请选择：</option>");
	$("#span_town").hide();
	$("#areaNameTxt").text("");
	$("#codHelpUrl").attr("href","http://help.jd.com/help/distribution-768-0-0-0-0-"+(new Date()).getTime()+".html");
	// #高亮选中
	$("#use-new-address").attr("class", "item item-selected");
	var consigneeList = $("#consignee-list");
	consigneeList.find(".item").each(function() {
		var indexNum = $(this).attr("index").split("_")[2];
		if (parseInt(indexNum) > 5) {
			$(this).attr("class", "item item-fore hide");
		} else {
			$(this).attr("class", "item");
		}
	});
	// 加载省份
	loadProvinces();
}

/**
 * 验证收货地址消息提示
 * 
 * @param divId
 * @param value
 */
function check_Consignee(divId) {
	var errorFlag = false;
	var errorMessage = null;
	var value = null;
	// 验证收货人名称
	if (divId == "name_div") {
		value = $("#consignee_name").val();
		if (isEmpty(value)) {
			errorFlag = true;
			errorMessage = "请您填写收货人姓名";
		}
		if (value.length > 25) {
			errorFlag = true;
			errorMessage = "收货人姓名不能大于25位";
		}
		if (!is_forbid(value)) {
			errorFlag = true;
			errorMessage = "收货人姓名中含有非法字符";
		}
	}
	// 验证邮箱格式
	else if (divId == "email_div") {
		value = $("#consignee_email").val();
		if (!isEmpty(value)) {
			if (!check_email(value)) {
				errorFlag = true;
				errorMessage = "邮箱格式不正确";
			}
		} else {
			if (value.length > 50) {
				errorFlag = true;
				errorMessage = "邮箱长度不能大于50位";
			}
		}
	}
	// 验证地区是否完整
	else if (divId == "area_div") {
		var provinceId = $("#consignee_province").find("option:selected").val();
		var cityId = $("#consignee_city").find("option:selected").val();
		var countyId = $("#consignee_county").find("option:selected").val();
		var townId = $("#consignee_town").find("option:selected").val();
		// 验证地区是否正确
		if (isEmpty(provinceId) || isEmpty(cityId) || isEmpty(countyId)
				|| ($("#span_town").html()!=null&&$("#span_town").html()!=""&&!$("#span_town").is(":hidden") && isEmpty(townId))) {
			errorFlag = true;
			errorMessage = "请您填写完整的地区信息";
		}
	}
	// 验证收货人地址
	else if (divId == "address_div") {
		value = $("#consignee_address").val();
		if (isEmpty(value)) {
			errorFlag = true;
			errorMessage = "请您填写收货人详细地址";
		}
		if (!is_forbid(value)) {
			errorFlag = true;
			errorMessage = "收货人详细地址中含有非法字符";
		}
		if (value.length>50) {
			errorFlag = true;
			errorMessage = "收货人详细地址过长";
		}
	}
	// 验证手机号码
	else if (divId == "call_mobile_div") {
		value = $("#consignee_mobile").val();
		divId = "call_div";
		if (isEmpty(value)) {
			errorFlag = true;
			errorMessage = "请您填写收货人手机号码";
		} else {
			if (!check_mobile(value)) {
				errorFlag = true;
				errorMessage = "手机号码格式不正确";
			}
		}
		if (!errorFlag) {
			value = $("#consignee_phone").val();
			if (!isEmpty(value)) {
				if (!is_forbid(value)) {
					errorFlag = true;
					errorMessage = "固定电话号码中含有非法字符";
				}
				if (!checkPhone(value)) {
					errorFlag = true;
					errorMessage = "固定电话号码格式不正确";
				}
			}
		}
	}
	// 验证电话号码
	else if (divId == "call_phone_div") {
		value = $("#consignee_phone").val();
		divId = "call_div";
		if (!isEmpty(value)) {
			if (!is_forbid(value)) {
				errorFlag = true;
				errorMessage = "固定电话号码中含有非法字符";
			}
			if (!checkPhone(value)) {
				errorFlag = true;
				errorMessage = "固定电话号码格式不正确";
			}
		}
		if (true) {
			value = $("#consignee_mobile").val();
			if (isEmpty(value)) {
				errorFlag = true;
				errorMessage = "请您填写收货人手机号码";
			} else {
				if (!check_mobile(value)) {
					errorFlag = true;
					errorMessage = "手机号码格式不正确";
				}
			}
		}
	}
	if (errorFlag) {
		$("#" + divId + "_error").html(errorMessage);
		$("#" + divId).addClass("message");
		return false;
	} else {
		$("#" + divId).removeClass("message");
		$("#" + divId + "_error").html("");
	}
	return true;
}

/**
 * 判断轻松购是否弹开
 * 
 * @param id
 */
function open_easyBuyConsignee(id){
	var isHidden = $("#consignee-form").is(":hidden");// 是否隐藏
	var consignee_type = $("#hidden_consignee_type_" + id).val();
	var consignee_townId = $("#hidden_consignee_townId_" + id).val();
	consignee_townId = consignee_townId + "";
	if(isNaN(consignee_townId)){
		consignee_townId = "0";
	}
	consignee_townId = parseInt(consignee_townId);
	if(isHidden && (consignee_type == 0 || consignee_type == "0")){
		var mobile=$("#hidden_consignee_mobile_"+id).val();
		if(isEmpty(mobile) || isNaN(mobile)){
			 show_ConsigneeDetail(id);
			 return;
		}
	}
	if(isHidden && (consignee_type == 0 || consignee_type == "0") && consignee_townId <= 0 ){
		var consignee_provinceId = $("#hidden_consignee_provinceId_" + id).val();
		var consignee_cityId = $("#hidden_consignee_cityId_" + id).val();
		var consignee_countyId = $("#hidden_consignee_countyId_" + id).val();
		var param ="consigneeParam.type=" + consignee_type
		 + "&consigneeParam.provinceId=" + consignee_provinceId
		 + "&consigneeParam.cityId=" + consignee_cityId
		 + "&consigneeParam.countyId=" + consignee_countyId
		 + "&consigneeParam.townId=0";
		var actionUrl =  OrderAppConfig.DynamicDomain + "/consignee/openEasyBuy.action";
		jQuery.ajax( {
			type : "POST",
			dataType : "json",
			url : actionUrl,
			data : param,
			cache : false,
			success : function(data, textStatus) {
				if (isUserNotLogin(data)) {
					goToLogin();
					return;
				}
				if(data){
				    show_ConsigneeDetail(id);				  					
				}
			},
			error : function(XMLHttpResponse) {
				alert("系统繁忙，请稍后再试！");
				back_Before(OrderAppConfig.Module_Consignee);
			}
		});
	}
}

/**
 * 判断是否展开地址
 */
function openConsignee(){
//	var areaId = $("#hideAreaIds").val();
//	var areaIds = null;
//	if(areaId != null){
//		 areaIds= new Array(); // 定义一数组
//		 areaIds=areaId.split("-");
//	}
//	if(areaIds != null && areaIds.length == 4){
//		var param ="consigneeParam.provinceId=" + areaIds[0]
//		+ "&consigneeParam.cityId=" + areaIds[1]
//		+ "&consigneeParam.countyId=" + areaIds[2]
//		+ "&consigneeParam.townId=" + areaIds[3];
//
//		var actionUrl =  OrderAppConfig.DynamicDomain + "/consignee/openEasyBuy.action";
//		jQuery.ajax( {
//			type : "POST",
//			dataType : "json",
//			url : actionUrl,
//			data : param,
//			cache : false,
//			success : function(data, textStatus) {
//				if (isUserNotLogin(data)) {
//					goToLogin();
//					return;
//				}
//				if(data){
//					edit_Consignee($("#consignee_id").val());
//				}
//			},
//			error : function(XMLHttpResponse) {
//				alert("系统繁忙，请稍后再试！");
//				back_Before(OrderAppConfig.Module_Consignee);
//			}
//		});
//	}
}

/**
 * 保存收货地址（包含保存常用人收货地址，根据id区分）
 */
function save_Consignee() {
	if (checkMaxConsigneeSize("save_Consignee")) {
		return;
	}
	var isHidden = $("#consignee-form").is(":hidden");// 是否隐藏
	var id = $("input[name='consignee_radio']:checked").val();// 获取收货人id
	if(id==undefined){
		alert("请选择收货人地址!");
		return;
	}
	// 如果不隐藏重新获取用户填写的信息
	var consignee_id = null;
	var consignee_type = null;
	var consignee_provinceId = null;
	var consignee_cityId = null;
	var consignee_countyId = null;
	var consignee_townId = null;
	var consignee_name = null;
	var consignee_email = null;
	var consignee_address = null;
	var consignee_mobile = null;
	var consignee_phone = null;
	var consignee_provinceName = null;
	var consignee_cityName = null;
	var consignee_countyName = null;
	var consignee_townName = null;
	var isUpdateCommonAddress = 0;
	var consignee_commons_size = $("#hidden_consignees_size").val();
	var giftSender_consignee_name="";
	var giftSender_consignee_mobile="";
	var noteGiftSender=false;
	if (id != null && id != "") {
		consignee_id = id;
		if(isNaN(consignee_id)){
			consignee_id = "0";
		}
	} else {
		consignee_id = "0";
	}
	if (isHidden) {
		consignee_type = $("#hidden_consignee_type_" + id).val();
		consignee_provinceId = $("#hidden_consignee_provinceId_" + id).val();
		consignee_cityId = $("#hidden_consignee_cityId_" + id).val();
		consignee_countyId = $("#hidden_consignee_countyId_" + id).val();
		consignee_townId = $("#hidden_consignee_townId_" + id).val();
		consignee_provinceName = $("#hidden_consignee_provinceName_" + id)
				.val();
		consignee_cityName = $("#hidden_consignee_cityName_" + id).val();
		consignee_countyName = $("#hidden_consignee_countyName_" + id).val();
		consignee_townName = $("#hidden_consignee_townName_" + id).val();
		consignee_name = $("#hidden_consignee_name_" + id).val();
		consignee_address = $("#hidden_consignee_address_" + id).val();
		consignee_mobile = $("#hidden_consignee_mobile_" + id).val();
		consignee_phone = $("#hidden_consignee_phone_" + id).val();
		consignee_email = $("#hidden_consignee_email_" + id).val();
	} else {
		// 如果展开之后需要更新常用地址列表
		isUpdateCommonAddress = 1;
		consignee_id = $("#consignee_form_id").val();
		consignee_type = $("#consignee_type").val();
		consignee_provinceId = $("#consignee_province").find("option:selected")
				.val();
		consignee_cityId = $("#consignee_city").find("option:selected").val();
		consignee_countyId = $("#consignee_county").find("option:selected")
				.val();
		consignee_townId = $("#consignee_town").find("option:selected").val();
		consignee_provinceName = $("#consignee_province").find(
				"option:selected").text();
		consignee_cityName = $("#consignee_city").find("option:selected")
				.text();
		consignee_countyName = $("#consignee_county").find("option:selected")
				.text();
		if (!$("#span_town").is(":hidden")) {
			consignee_townName = $("#consignee_town").find("option:selected")
					.text();
		}
		consignee_name = $("#consignee_name").val();
		consignee_address = $("#consignee_address").val();
		consignee_mobile = $("#consignee_mobile").val();
		consignee_phone = $("#consignee_phone").val();
		consignee_email = $("#consignee_email").val();
	}
	if (consignee_email == null || consignee_email == "undefined") {
		consignee_email = "";
	}
	if (consignee_phone == null || consignee_phone == "undefined") {
		consignee_phone = "";
	}
	if (!isHidden) {
		var checkConsignee = true;
		// 验证收货人信息是否正确
		if (!check_Consignee("name_div")) {
			checkConsignee = false;
		}
		// 验证地区是否正确
		if (!check_Consignee("area_div")) {
			checkConsignee = false;
		}
		// 验证收货人地址是否正确
		if (!check_Consignee("address_div")) {
			checkConsignee = false;
		}
		// 验证手机号码是否正确
		if (!check_Consignee("call_mobile_div")) {
			checkConsignee = false;
		}
		// 验证电话是否正确
		if (!check_Consignee("call_phone_div")) {
			checkConsignee = false;
		}
		// 验证邮箱是否正确
		if (!check_Consignee("email_div")) {
			checkConsignee = false;
		}
		if (!checkConsignee) {
			return;
		}
	}
	if(isGiftBuy()){
		noteGiftSender= true;
		giftSender_consignee_name = $("#giftSender_consignee_name").val();
		giftSender_consignee_mobile = $("#giftSender_consignee_mobile").val();
		if(!checkGiftBuySenderName()){
			return;
		}
		if(!checkGiftBuySenderMobile()){
			return;
		}
	}

	var useNewConsigee = $("#consignee_radio_new").attr("checked");
	if (useNewConsigee) {
		consignee_id = 0;
		consignee_type = 1;
	}
	var areaName = null;
	consignee_provinceName = consignee_provinceName.replace("*", "");
	consignee_cityName = consignee_cityName.replace("*", "");
	consignee_countyName = consignee_countyName.replace("*", "");
	areaName = consignee_provinceName + consignee_cityName
			+ consignee_countyName;
	if (consignee_townName != null && consignee_townName != "") {
		consignee_townName = consignee_townName.replace("*", "");
		areaName = areaName + consignee_townName;
	}
	if (consignee_type == "") {
		consignee_type = 1;
	}
	// 如果使用常用联系人列表，则不对四级地址进行显示判断
	if(isHidden){
		if(isEmpty(consignee_townId))
			consignee_townId = 0;
	}else{
		if(isEmpty(consignee_townId)||$("#span_town").is(":hidden"))
			consignee_townId = 0;
	}
	var param = "consigneeParam.id=" + consignee_id + "&consigneeParam.type="
			+ consignee_type + "&consigneeParam.name=" + consignee_name
			+ "&consigneeParam.provinceId=" + consignee_provinceId
			+ "&consigneeParam.cityId=" + consignee_cityId
			+ "&consigneeParam.countyId=" + consignee_countyId
			+ "&consigneeParam.townId=" + consignee_townId
			+ "&consigneeParam.address=" + consignee_address
			+ "&consigneeParam.mobile=" + consignee_mobile
			+ "&consigneeParam.email=" + consignee_email
			+ "&consigneeParam.phone=" + consignee_phone
			+ "&consigneeParam.provinceName=" + consignee_provinceName
			+ "&consigneeParam.cityName=" + consignee_cityName
			+ "&consigneeParam.countyName=" + consignee_countyName
			+ "&consigneeParam.townName=" + consignee_townName
			+ "&consigneeParam.commonConsigneeSize=" + consignee_commons_size
			+ "&consigneeParam.isUpdateCommonAddress=" + isUpdateCommonAddress
			+ "&consigneeParam.giftSenderConsigneeName=" + giftSender_consignee_name
			+ "&consigneeParam.giftSendeConsigneeMobile=" + giftSender_consignee_mobile
			+ "&consigneeParam.noteGiftSender=" + noteGiftSender;
	param = addFlowTypeParam(param);
	var actionUrl = OrderAppConfig.DynamicDomain + "/consignee/saveConsignee.action";
	$(".loading").css("display", "block");
	jQuery.ajax( {
		type : "POST",
		dataType : "json",
		url : actionUrl,
		data : param,
		cache : false,
		success : function(consigneeResult, textStatus) {
			if (isUserNotLogin(consigneeResult)) {
				goToLogin();
				return;
			}	
			if (consigneeResult.success) {
					$("#isNeedOpenInvoice").val(consigneeResult.openInvoice);// 隐藏域，判断修改地址后，是否需要修改发票信息，广州机构比较特殊
				    if(consigneeResult.resultCode == "isRefreshArea"){
				    	$(".loading").css("display", "none");
				    	 show_ConsigneeDetail(consignee_id);
				    }else{
				    	// 弹出对应提示
						$("#" + OrderAppConfig.Module_Consignee).html(
								consigneeResult.consigneeHtml);
						save_Module(OrderAppConfig.Module_Consignee);
						// 新用户保存后将值写回
						$("#isOpenConsignee").val("0");
						$("#isRefreshArea").val("0");
						if (isBigItemChange()) {
							bigItemChangeArea();
						}
						//预售电话修改
						if($("#isPresale").val()=="true"){
							$("#hiddenUserMobileByPresale").val(consignee_mobile);
							if($("#presaleMobile input").size()>0){
								$("#presaleMobile input").val(consignee_mobile);
							}else if($("#userMobileByPresale").size()>0){
								$("#userMobileByPresale").html(consignee_mobile);
							}
						}
						if (hasTang9()) {
							tang9ChangeArea();
						}
						if(consigneeResult.openPayAndShip){
							edit_Payment(1);
						}
				    }					
			} else {
					if (consigneeResult.message != null && consigneeResult.message != "") {
						$(".loading").css("display", "none");
						alert(consigneeResult.message);
					} else {
						alert("系统繁忙，请稍后再试！");
						back_Before(OrderAppConfig.Module_Consignee);
					}
			}
		},
		error : function(XMLHttpResponse) {
			alert("系统繁忙，请稍后再试！");
			back_Before(OrderAppConfig.Module_Consignee);
		}
	});
}


/**
 * 打开常用收货地址
 * 
 * @param obj
 */
function open_MoreConsignee() {
	$("#select-more")
			.removeClass("select-expand")
			.addClass("select-collapse")
			.html(
					"<span onclick=\"close_MoreConsignee()\">收起常用地址</span><s></s>");
	$("#consignee-list").find(".item").each(function() {
		$(this).show();
	});
}

/**
 * 关闭常用收货地址
 * 
 * @param obj
 */
function close_MoreConsignee() {
	$("#select-more")
			.removeClass("select-collapse")
			.addClass("select-expand")
			.html("<span onclick=\"open_MoreConsignee()\">更多常用地址</span><s></s>");
	$("#consignee-list").find(".item").each(function() {
		var index = $(this).attr("index");
		if (index != null) {
			var indexNum = index.split("_")[2];
			if (parseInt(indexNum) > 5) {
				$(this).hide();
			}
		}
	});
}

/**
 * 删除后刷新常用收货地址
 * 
 * @param obj
 */
function refresh_Consignee() {
	$("#consignee-list").find(".item").each(function() {
		var index = $(this).attr("index");
		if (index != null) {
			var indexNum = index.split("_")[2];
			if (parseInt(indexNum) <= 5) {
				$(this).show();
			} else {
				$(this).hide();
			}
		}
	});
	var commonConsigeeSize = $("#hidden_consignees_size").val();
	if (commonConsigeeSize > 5) {
		$("#select-more").html(
				"<span onclick=\"open_MoreConsignee()\">更多常用地址</span><s></s>");
	} else {
		$("#select-more").hide();
	}
}

function loadGiftBuySenderTip(){
	if(isGiftBuy()){
		$("#saveConsigneeTitleDiv").text("保存收礼人信息");
		$("#saveConsigneeTitleMinDiv").text("保存收礼人信息");
		$("#giftSenderDiv").show();
		$("#consignee-giftSender-form").show();
	}else{
		$("#saveConsigneeTitleDiv").text("保存收货人信息");
		$("#saveConsigneeTitleMinDiv").text("保存收货人信息");
		$("#giftSenderDiv").hide();
		$("#consignee-giftSender-form").hide();
	}
}


/**
 * 校验送礼人姓名
 * 
 * @returns {Boolean}
 */
function checkGiftBuySenderName(){
	var value = $("#giftSender_consignee_name").val();
	var errorFlag = false;
	var errorMessage = "";
	if (isEmpty(value)) {
		errorFlag = true;
		errorMessage = "请您填写送礼人姓名";
	}
	if (value.length > 25) {
		errorFlag = true;
		errorMessage = "收货人姓名不能大于25位";
	}
	if (!is_forbid(value)) {
		errorFlag = true;
		errorMessage = "收货人姓名中含有非法字符";
	}
	if (errorFlag) {
		$("#giftSender_name_div_error").html(errorMessage);
		$("#giftSender_name_div").addClass("message");
		return false;
	} else {
		$("#giftSender_name_div").removeClass("message");
		$("#giftSender_name_div_error").html("");
		return true;
	}
}

/**
 * 校验送人手机号
 */
function checkGiftBuySenderMobile(){
	var value = $("#giftSender_consignee_mobile").val();
	var errorFlag = false;
	var errorMessage = "";
	if (isEmpty(value)) {
		errorFlag = true;
		errorMessage = "请您填写收货人手机号码";
	} else {
		if (!check_mobile(value)) {
			errorFlag = true;
			errorMessage = "手机号码格式不正确";
		}
	}
	if (errorFlag) {
		$("#giftSender_call_div_error").html(errorMessage);
		$("#giftSender_call_div").addClass("message");
		return false;
	} else {
		$("#giftSender_call_div").removeClass("message");
		$("#giftSender_call_div_error").html("");
		return true;
	}
}



// *****************************************************发票开始********************************************************************

/**
 * 编辑发票信息
 * 
 * @param consigneeId
 */
function edit_Invoice() {
	// 保存修改前的值
	if (!edit_before(OrderAppConfig.Module_Invoice)) {
		return;
	}
	// 先到到当前用户发票信息,再异步获取常用发票列表
	var actionUrl = OrderAppConfig.DynamicDomain + "/invoice/editInvoice.action";
	var param = addFlowTypeParam();
	jQuery.ajax( {
		type : "POST",
		dataType : "text",
		url : actionUrl,
		data : param,
		cache : false,
		success : function(dataResult, textStatus) {
			// 没有登录跳登录
		if (isUserNotLogin(dataResult)) {
			goToLogin();
			return;
		}
		// 服务器返回异常处理,如果有消息div则放入
		if (isHasMessage(dataResult)) {
			var message = getMessage(dataResult);
			alert(message);
			back_Before(OrderAppConfig.Module_Invoice);
			if (message == "请先保存收货人信息") {
				edit_Consignee();
			}
		}
		// 成功后如果有divID直接放入div
		else {
			$("#" + OrderAppConfig.Module_Invoice + "_edit_action").show();
			$("#" + OrderAppConfig.Module_Invoice).html(dataResult);
			$("#"+OrderAppConfig.Module_Invoice+"_edit_action").html("<a href='#none'   style='color:#005EA7;'  onclick='save_Invoice()'>保存发票信息</a>");
			itemListOver.init("#invoice-list");
			refresh_Invoice();
			
		}
	},
	error : function(XMLHttpResponse) {
		alert("系统繁忙，请稍后再试！");
		back_Before(OrderAppConfig.Module_Invoice);
	}
	});
}

function changeInvoiceType(type) {
	if (type == 1) {
		$("#normal-form").css("display", "block");
		$("#special-form").css("display", "none");
		$("#electro-normal-form").css("display", "none");
		if(isGiftBuy()){
			$("#invoiceConsignee").show();
			$("#invoicesSendTypeDiv").show();
			var sendType = $('input:radio[name="invoiceSendType"]:checked').val();
			changeGeneralInvoiceConsigneeSendType(sendType);
			fillInvoiceConsigneeInfo('1');
		}else{
			$("#invoiceConsignee").hide();
		}
	}else if(type == 2) {
		$("#normal-form").css("display", "none");
		$("#special-form").css("display", "block");
		$("#electro-normal-form").css("display", "none");
		$("#invoiceConsignee").show();
		$("#invoicesSendTypeDiv").hide();
		$("#invoiceConsigneeDiv").show();
		fillInvoiceConsigneeInfo('2');
	}else{
		$("#normal-form").css("display", "none");
		$("#special-form").css("display", "none");
		$("#electro-normal-form").css("display", "block");
		$("#invoiceConsignee").hide();
	}
}
function changeBasicInvoiceType(type){

	if(type==1){
		show_GenenalInvoiceDetail(0,false);
		$("#selected_default_invoice_type").val("1");
	}else if(type==2){
		show_VATInvoiceDetail();
		$("#invoiceConsignee").show();
		$("#invoicesSendTypeDiv").hide();
		$("#invoiceConsigneeDiv").show();
		fillInvoiceConsigneeInfo('2');
		$("#selected_default_invoice_type").val("2");
	}else{
		show_ElectroInvoiceDetail();
		$("#invoiceConsignee").hide();
		$("#selected_default_invoice_type").val("3");
	}
	$("#invoice-add").attr("checked",true);
	$("input[name='usualInvoiceList']").attr("checked",false);
} 
function show_GenenalInvoiceDetail(id,isHide){
	var actionUrl = OrderAppConfig.DynamicDomain + "/invoice/getGenenalInvoice.action";
	var invokeInvoiceBasicService =  $("#invokeInvoiceBasicService").val();
	var param =  "invokeInvoiceBasicService="+invokeInvoiceBasicService;
	param = param += "&invoiceParam.usualInvoiceId=" + id;
	param = addFlowTypeParam(param);
	jQuery.ajax( {
				type : "POST",
				url : actionUrl,
				data : param,
				cache : false,
				success : function(dataResult, textStatus) {
		
					// 没有登录跳登录
					if (isUserNotLogin(dataResult)) {
						goToLogin();
						return;
					} // 服务器返回异常处理,如果有消息div则放入,没有则弹出
					if (isHasMessage(dataResult)) {
						//var message = getMessage(dataResult);
						$("#invoice-detail-form").html(dataResult);
					}
					// 成功后如果有divID直接放入div，没有则返回结果
					else {
						$("#invoice-detail-form").html(dataResult);
						if(isHide){
							$("#invoice_title").hide();
							$("#invoice_type").hide();
						}else{
							$("#invoice_type").show();
						}
	
						if(isGiftBuy()){
							$("#invoiceConsignee").show();
							$("#invoicesSendTypeDiv").show();
							var sendType = $('input:radio[name="invoiceSendType"]:checked').val();
							changeGeneralInvoiceConsigneeSendType(sendType);
							fillInvoiceConsigneeInfo('1');
						}else{
							$("#invoiceConsignee").hide();
						}
					}
				},
				error : function(XMLHttpResponse) {
				}
			});
}
function show_ElectroInvoiceDetail() {
	var actionUrl = OrderAppConfig.DynamicDomain + "/invoice/getElectroInvoice.action";
	var invokeInvoiceBasicService =  $("#invokeInvoiceBasicService").val();
	var param =  "invokeInvoiceBasicService="+invokeInvoiceBasicService;
	param = addFlowTypeParam(param);
	jQuery.ajax( {
				type : "POST",
				url : actionUrl,
				data : param,
				cache : false,
				success : function(dataResult, textStatus) {
		
					// 没有登录跳登录
					if (isUserNotLogin(dataResult)) {
						goToLogin();
						return;
					} // 服务器返回异常处理,如果有消息div则放入,没有则弹出
					if (isHasMessage(dataResult)) {
						$("#invoice-detail-form").html(dataResult);
					}
					// 成功后如果有divID直接放入div，没有则返回结果
					else {
						$("#invoice-detail-form").html(dataResult);
						$("#electro-invoice-title-4").attr("checked", "checked");
						// 隐藏单位名称对话框
						showElectroCompanyDiv(4);
					}
				},
				error : function(XMLHttpResponse) {
				}
			});
}
function show_VATInvoiceDetail() {
	var actionUrl = OrderAppConfig.DynamicDomain + "/invoice/getVatInvoice.action";
	var invokeInvoiceBasicService =  $("#invokeInvoiceBasicService").val();
	var param =  "invokeInvoiceBasicService="+invokeInvoiceBasicService;
	param = addFlowTypeParam(param);
	jQuery.ajax( {
				type : "POST",
				url : actionUrl,
				data : param,
				cache : false,
				success : function(dataResult, textStatus) {
		
					// 没有登录跳登录
					if (isUserNotLogin(dataResult)) {
						goToLogin();
						return;
					} // 服务器返回异常处理,如果有消息div则放入,没有则弹出
					if (isHasMessage(dataResult)) {
						$("#invoice-detail-form").html(dataResult);
					}
					// 成功后如果有divID直接放入div，没有则返回结果
					else {
						$("#invoice-detail-form").html(dataResult);
						$("#invoiceConsignee").show();
						$("#invoicesSendTypeDiv").hide();
						$("#invoiceConsigneeDiv").show();
						fillInvoiceConsigneeInfo('2');
					}
				},
				error : function(XMLHttpResponse) {
				}
			});
}

/**
 * 当默认选择赠票的时候，异步加载使之显示赠票信息
 * 
 * @return
 */
function changeVat(){
	$("#normal-form").css("display", "none");
	$("#electro-normal-form").css("display", "none");
	$("#special-form").css("display", "block");
	$.each($("input[name='usualInvoiceList']"), function() {
		$(this).attr("checked", "");
	});
	$("#invoice-add").attr("checked", "");
	$("#invoice_type").show();
	$("#invoice_title").show();
	$("#invoiceConsignee").show();
	$("#invoicesSendTypeDiv").hide();
	$("#invoiceConsigneeDiv").show();
}
/**
 * 当默认选择电子发票的时候，异步加载使之显示电子发票
 * 
 * @return
 */
function changeElectro(){
	$("#normal-form").css("display", "none");
	$("#electro-normal-form").css("display", "block");
	$("#special-form").css("display", "none");
	$.each($("input[name='usualInvoiceList']"), function() {
		$(this).attr("checked", "");
	});
	$("#invoice-add").attr("checked", "");
	$("#invoice_type").show();
	$("#invoice_title").show();
	$("#invoiceConsignee").hide();
}
/**
 * 如果是单商家sop，第一次编辑时默认成为不开发票
 * 
 * @return
 */
function makeSopNotPut(){
	if($("#sopNotPutInvoice").val()=="true"){
		$("input[name='normal-normalContent']:first").attr("checked", "checked");
		$("input[name='vat-normalContent']:first").attr("checked", "checked");
	}
}

/**
 * 打开常用发票(超过5个的)
 * 
 * @param obj
 */
function open_MoreInvoice() {
	$("#invoice-more-btn").html(
			"<span onclick=\"close_MoreInvoice()\">收起发票信息</span><s></s>");
	$("#invoice-list").find(".item").each(function() {
		$(this).show();
	});
}

/**
 * 关闭常用发票
 * 
 * @param obj
 */
function close_MoreInvoice() {
	$("#invoice-more-btn").html(
			"<span onclick=\"open_MoreInvoice()\">更多发票信息</span><s></s>");
	$("#invoice-list").find(".item").each(function() {
		var index = $(this).attr("index");
		if (index != null || index != undefined) {
			if (index > 5) {
				$(this).hide();
			}
		}
	});
}
/**
 * 隐藏发票抬头和发票类型
 * 
 * @return
 */
function hideInvoice(){
	$("#invoice_type").hide();
	$("#invoice_title").hide();
}
/**
 * 选择常用发票
 * 
 * @param id
 */
function chose_Invoice(id,isHide) {
	set_CurrentInvoice(id);
	var invokeInvoiceBasicService =  $("#invokeInvoiceBasicService").val();
	if(invokeInvoiceBasicService=="true"){
		show_GenenalInvoiceDetail(id,isHide);
		$("#normal-invoice-1").attr("checked",true);
	}else{
		show_InvoiceDetail(id,isHide);
	}
	
}

/**
 * 设置当前选中的发票高亮，其他变暗
 * 
 * @param id
 */
function set_CurrentInvoice(id) {
	var parentDiv = $("#invoice-r1-" + id).parent();
	var indexNumCurrent = parentDiv.attr("index");
	var invoiceList = $("#invoice-list");
	invoiceList.find(".item").each(function() {
		if ($(this).attr("index") == indexNumCurrent) {
			$(this).attr("class", "item item-selected");
			$(this).find("#delete_invoice_" + id).show();
			$("#invoice-r1-" + id).attr("checked", "checked");
			$("#invoice-add").attr("checked", "");
			$("#useNewInvoice").attr("class","item");
		} else {
			$(this).attr("class", "item");
			$(this).find("#delete_invoice_" + id).hide();
		}

	});
}



/**
 * 如果选择单位，显示单位输入文本框
 */
function showCompanyDiv(type) {
	if (type == 5) {
		$("#invoice-title-5").attr("checked", "checked");
		$("#personal-invoice-4").attr("checked", "");
		$("#companyNameText").show();
	} else {
		$("#personal-invoice-4").attr("checked", "checked");
		$("#invoice-title-5").attr("checked", "");
		$("#companyNameText").hide();
	}
}

/**
 * 电子发票如果选择单位，显示单位输入文本框
 */
function showElectroCompanyDiv(type) {
	if (type == 5) {
		$("#electro-invoice-title-5").attr("checked", "checked");
		$("#electroCompanyName").show();
		$("#electroCompanyRemark").show();
	} else {
		$("#electro-invoice-title-4").attr("checked", "checked");
		$("#electroCompanyName").hide();
		$("#electroCompanyRemark").hide();
	}
}

/**
 * 查看常用发票详细
 */
function show_InvoiceDetail(id,isHide) {
	var actionUrl = OrderAppConfig.DynamicDomain + "/invoice/getNormalInvoice.action";
	var invokeInvoiceBasicService =  $("#invokeInvoiceBasicService").val();
	var param = "invoiceParam.usualInvoiceId=" + id;
	param = param + "&invokeInvoiceBasicService="+invokeInvoiceBasicService;
	param = addFlowTypeParam(param);
	jQuery.ajax( {
				type : "POST",
				dataType : "json",
				url : actionUrl,
				data : param,
				cache : false,
				success : function(dataResult, textStatus) {
					// 没有登录跳登录
					if (isUserNotLogin(dataResult)) {
						goToLogin();
						return;
					} // 服务器返回异常处理,如果有消息div则放入,没有则弹出
					if (isHasMessage(dataResult)) {
						var message = getMessage(dataResult);
						alert(message);
					}
					// 成功后如果有divID直接放入div，没有则返回结果
					else {
						// 选中普通发票
						$.each($("input[name='invoiceType']"), function() {
							if ($(this).val() == 1) {
								$(this).attr("checked", "checked");
								changeInvoiceType(1);
							}
						});
						// 发票抬头
						var invoiceTitleHtml = "";
						for ( var i = 0; i < dataResult.invoiceTitles.length; i++) {
							var title = dataResult.invoiceTitles[i];
							invoiceTitleHtml += ("<li>"
									+ "<input type=\"radio\" id=\"invoice-title-"
									+ title.value
									+ "\" name=\"invoiceTitle\" class=\"hookbox\" value=\""
									+ title.value + "\" "); 
							if(title.selected)
								invoiceTitleHtml+="checked"; 
							invoiceTitleHtml+= (" onclick=\"showCompanyDiv('"+title.value+"')\" />"
									+ "<label for=\"invoice-title-"
									+ title.value + "\">" + title.content
									+ "</label>" + "</li>");
							if (title.value == 5) {
								if(title.selected){
									invoiceTitleHtml += "<li><input type=\"text\" id=\"companyNameText\" value=\"\" class=\"company-textbox textbox\" /></li>";
								}else{
									invoiceTitleHtml += "<li><input type=\"text\" id=\"companyNameText\" value=\"\" class=\"company-textbox textbox\" style=\"display:none\"/></li>";
								}
							}
						}
						$("#invoice_title_radio").html(invoiceTitleHtml);
						// 公司名称
						if (dataResult.companyName != null) {
							$("#companyNameText").attr("value",
									dataResult.companyName);
						}
						// 非图书发票内容
						var normalContentHtml = "";

                        // 实体礼品卡
                        if(isLipinkaPhysical()){
                            normalContentHtml += "<select id=\"normal-invoice-content-lipinkaPhysical\" name=\"normal-normalContent-lipinkaPhysical\">";
                            for ( var i = 0; i < dataResult.normalInvoiceContents.length; i++) {
                                content = dataResult.normalInvoiceContents[i];
                                normalContentHtml += "<option value=\"" + content.value +"\"";
                                if (content.selected) {
                                    normalContentHtml += " selected=\"selected\"";
                                }
                                normalContentHtml += ">" + content.content + "</option>";
                            }
                        }else {
                            for ( var i = 0; i < dataResult.normalInvoiceContents.length; i++) {
                                content = dataResult.normalInvoiceContents[i];
                                if (content.selected) {
                                    normalContentHtml += "<li>"
                                        + "<input type=\"radio\" id=\"normal-invoice-content-"
                                        + content.value
                                        + "\" name=\"normal-normalContent\" class=\"hookbox\" value=\""
                                        + content.value
                                        + "\" checked/>"
                                        + "<label for=\"normal-invoice-content-"
                                        + content.value + "\">"
                                        + content.content + "</label>"
                                        + "</li>";
                                } else {
                                    normalContentHtml += "<li>"
                                        + "<input type=\"radio\" id=\"normal-invoice-content-"
                                        + content.value
                                        + "\" name=\"normal-normalContent\" class=\"hookbox\" value=\""
                                        + content.value
                                        + "\"/>"
                                        + "<label for=\"normal-invoice-content-"
                                        + content.value + "\">"
                                        + content.content + "</label>"
                                        + "</li>";
                                }
                            }
                        }
                        $("#normal_content_radio").html(normalContentHtml);

						// 图书发票内容
						var bookContentHtml = "";
						for ( var i = 0; i < dataResult.bookInvoiceContents.length; i++) {
							content = dataResult.bookInvoiceContents[i];
							if (content.selected) {
								bookContentHtml += "<li>"
										+ "<input type=\"radio\" id=\"book-invoice-content-"
										+ content.value
										+ "\" name=\"normal-bookContent\" class=\"hookbox\" value=\""
										+ content.value + "\" checked/>"
										+ "<label for=\"book-invoice-content-"
										+ content.value + "\">"
										+ content.content + "</label>"
										+ "</li>";
							} else {
								bookContentHtml += "<li>"
										+ "<input type=\"radio\" id=\"book-invoice-content-"
										+ content.value
										+ "\" name=\"normal-bookContent\" class=\"hookbox\" value=\""
										+ content.value + "\"/>"
										+ "<label for=\"book-invoice-content-"
										+ content.value + "\">"
										+ content.content + "</label>"
										+ "</li>";
							}
						}
						$("#book_content_radio").html(bookContentHtml);
						if(isHide){
							$("#invoice_type").hide();
							$("#invoice_title").hide();
						}else{
							$("#invoice_type").show();
							$("#invoice_title").show();
						}
						makeSopNotPut();
					}
				},
				error : function(XMLHttpResponse) {
				}
			});
}

/**
 * 验证增值税发票消息提示
 * 
 * @param divId
 * @param value
 */
function check_Invoice(type, value) {
	var errorFlag = false;
	var errorMessage = null;
	// 验证发票单位名称
	if (type == "vat_companyName") {
		if (isEmpty(value)) {
			errorFlag = true;
			errorMessage = "单位名称不能为空！";
		} else {
			if (checkLength(value) < 2) {
				errorFlag = true;
				errorMessage = "请填写完整单位名称！";
			}
			if (checkLength(value) > 100) {
				errorFlag = true;
				errorMessage = "单位名称过长,请重新输入！";
			}
			if (!is_forbidForInvoice(value)) {
				errorFlag = true;
				errorMessage = "单位名称含有非法字符！";
			}
		}
	} else if (type == "vat_code") { // 验证纳税人识别号
		if (isEmpty(value)) {
			errorFlag = true;
			errorMessage = "纳税人识别号不能为空！";
		} else {
			var reg_number = /^([a-zA-Z0-9]){15,20}$/;
			if (!reg_number.test(value)) {
				errorFlag = true;
				errorMessage = "税纳税识别号错误，请检查！";
			}
			if (!is_forbid(value)) {
				errorFlag = true;
				errorMessage = "税纳税识别号含有非法字符！";
			}
		}
	} else if (type == "vat_address") { // 验证发票注册地址
		if (isEmpty(value)) {
			errorFlag = true;
			errorMessage = "注册地址不能为空！";
		} else {
			if (value.replace(/[^\x00-\xff]/g, "**").length < 2) {
				errorFlag = true;
				errorMessage = "注册地址错误！";
			}
			if (checkLength(value) > 250) {
				errorFlag = true;
				errorMessage = "注册地址过长，请重新输入！";
			}
			if (!is_forbidForInvoice(value)) {
				errorFlag = true;
				errorMessage = "注册地址含有非法字符！";
			}
		}
	} else if (type == "vat_phone") { // 验证增值税发票电话
		if (isEmpty(value)) {
			errorFlag = true;
			errorMessage = "注册电话不能为空！";
		} else {
			if (checkLength(value) > 50) {
				errorFlag = true;
				errorMessage = "注册电话过长，请重新输入！";
			}
			if (!is_forbidForInvoice(value)) {
				errorFlag = true;
				errorMessage = "注册电话含有非法字符，请重新输入！";
			}
		}
	} else if (type == "vat_bankName") { // 验证增值税发票开户银行
		if (isEmpty(value)) {
			errorFlag = true;
			errorMessage = "开户银行不能为空！";
		} else {
			if (value.replace(/[^\x00-\xff]/g, "**").length < 2) {
				errorFlag = true;
				errorMessage = "开户银行错误！";
			}
			if (checkLength(value) > 100) {
				errorFlag = true;
				errorMessage = "开户银行过长，请重新输入！";
			}
			if (!is_forbidForInvoice(value)) {
				errorFlag = true;
				errorMessage = "开户银行含有非法字符！";
			}
		}
	} else if (type == "vat_bankAccount") { // 验证增值税发票银行账户
		if (isEmpty(value)) {
			errorFlag = true;
			errorMessage = "银行帐户不能为空！";
		} else {
			if (!checkBankCount(value)) {
				errorFlag = true;
				errorMessage = "银行帐户含有非法字符！";
			}
		}
	}
	if (errorFlag) {
		$("#" + type + "_error").html(errorMessage);
		$("#" + type + "_div").addClass("message");
		return false;
	} else {
		$("#" + type + "_div").removeClass("message");
		$("#" + type + "_error").html("");
	}
	return true;
}


// 增票非法字符验证
function is_forbidForInvoice(temp_str) { 
  temp_str = trimTxt(temp_str);
  var forbid_str = new String('>,<,&');
  var forbid_array = new Array();
  forbid_array = forbid_str.split(',');
  for (var i = 0; i < forbid_array.length; i++) {
      if (temp_str.search(new RegExp(forbid_array[i])) != -1)
          return false;
  }
  return true;
}


function loadAreaDetailForInvoiceConsingee(provinceId, cityId, countyId, townId,isGeneralInvoice) {
	var param = "consigneeParam.provinceId=" + provinceId
			+ "&consigneeParam.cityId=" + cityId + "&consigneeParam.countyId="
			+ countyId + "&consigneeParam.townId=" + townId;
	var actionUrl = OrderAppConfig.DynamicDomain + "/consignee/loadAllAreas.action";
	jQuery.ajax( {
		type : "POST",
		dataType : "text",
		url : actionUrl,
		data : param,
		cache : false,
		success : function(dataResult, textStatus) {
				// 没有登录跳登录
			if (isUserNotLogin(dataResult)) {
				goToLogin();
				return;
			}
			if (isHasMessage(dataResult)) {
				var message = getMessage(dataResult);
				alert(message);
			} else {
				if(isGeneralInvoice){
					$("#generalInvoice_span_area").html(dataResult);
				}else{
					$("#span_area").html(dataResult);
				}
			}
		},
		error : function(XMLHttpResponse) {
			alert("系统繁忙，请稍后再试！");
			return false;
		}
	});
}

/**
 * 验证发票地址消息提示，单列出方法是因为文案不同
 * 
 * @param divId
 * @param value
 */
function check_InvoiceConsignee(divId,isGeneral) {
	var errorFlag = false;
	var errorMessage = null;
	var value = null;
	var generalTag = isGeneral?"generalInvoice_":"";
	// 验证收货人名称
	if (divId == "name_div") {
		value = $("#"+generalTag+"consignee_name").val();
		if (isEmpty(value)) {
			errorFlag = true;
			errorMessage = "请您填写收票人姓名";
		}
		if (!is_forbid(value)) {
			errorFlag = true;
			errorMessage = "收票人姓名中含有非法字符";
		}
	}
	// 验证地区是否完整
	else if (divId == "area_div") {
		var provinceId = $("#"+generalTag+"consignee_province").find("option:selected").val();
		var cityId = $("#"+generalTag+"consignee_city").find("option:selected").val();
		var countyId = $("#"+generalTag+"consignee_county").find("option:selected").val();
		var townId = $("#"+generalTag+"consignee_town").find("option:selected").val();
		// 验证地区是否正确
		if (isEmpty(provinceId) || isEmpty(cityId) || isEmpty(countyId)
				|| ($("#"+generalTag+"span_town").html()!=null&&$("#"+generalTag+"span_town").html()!=""&&!$("#"+generalTag+"span_town").is(":hidden") && isEmpty(townId))) {
			errorFlag = true;
			errorMessage = "请您填写完整的地区信息";
		}
	}
	// 验证收货人地址
	else if (divId == "address_div") {
		value = $("#"+generalTag+"consignee_address").val();
		if (isEmpty(value)) {
			errorFlag = true;
			errorMessage = "请您填写收票人详细地址";
		}
		if (!is_forbid(value)) {
			errorFlag = true;
			errorMessage = "收票人详细地址中含有非法字符";
		}
	}
	// 验证手机号码
	else if (divId == "call_phone_div") {
		value = $("#"+generalTag+"consignee_phone").val();
		divId = "call_div";
		if (!isEmpty(value)) {
			if (!is_forbid(value)) {
				errorFlag = true;
				errorMessage = "固定电话号码中含有非法字符";
			}
			if (!checkPhone(value)) {
				errorFlag = true;
				errorMessage = "固定电话号码格式不正确";
			}
		}
		if (true) {
			value = $("#"+generalTag+"consignee_mobile").val();
			if (isEmpty(value)) {
				errorFlag = true;
				errorMessage = "请您填写收票人手机号码";
			} else {
				if (!check_mobile(value)) {
					errorFlag = true;
					errorMessage = "手机号码格式不正确";
				}
			}
		}
	}
	if (errorFlag) {
		$("#"+generalTag + divId + "_error").html(errorMessage);
		$("#"+generalTag + divId).addClass("message");
		return false;
	} else {
		$("#" +generalTag + divId).removeClass("message");
		$("#" +generalTag + divId + "_error").html("");
	}
	return true;
}

/**
 * 当有第三方的商品时，显示提示
 * 
 * @return
 */
function showSopInvoiceNote(){
	var showNote=$("#hasSopSku").val();
 	if(showNote==="true"){
 		$(".invoice-note").show();
 	}else{
 		$(".invoice-note").hide();
 	}	
}

/**
 * 校验电子发票email
 * 
 * @return
 */
function check_electroInvoiceEmail(){
	var value = $("#e_consignee_email").val();
	var errorFlag = false;
	var errorMessage="";
	if (!isEmpty(value)) {
		if (!check_email(value)) {
			errorFlag = true;
			errorMessage = "邮箱格式不正确";
		}
		if (value.length > 50) {
			errorFlag = true;
			errorMessage = "邮箱长度不能大于50位";
		}
	}
	if (errorFlag) {
		$("#e_consignee_email_error").html(errorMessage);
		$("#e_email_div").addClass("message");
		return false;
	} else {
		$("#e_email_div").removeClass("message");
		$("#e_consignee_email_error").html("");
	}
	return true;
}

/**
 * 校验电子发票手机号
 */
function check_electroInvoicePhone(){
	var value = $("#e_consignee_mobile").val();
	var errorFlag = false;
	var errorMessage="";
	if (!isEmpty(value)) {
		if (!is_forbid(value)) {
			errorFlag = true;
			errorMessage = "手机号码中含有非法字符";
		}
		if (!check_mobile(value)) {
			errorFlag = true;
			errorMessage = "手机号码格式不正确";
		}
	}else{
		errorFlag = true;
		errorMessage = "请输入手机号码";
	}
	if (errorFlag) {
		$("#e_consignee_mobile_error").html(errorMessage);
		$("#e_mobile_div").addClass("message");
		return false;
	} else {
		$("#e_mobile_div").removeClass("message");
		$("#e_consignee_mobile_error").html("");
	}
	return true;
}


/**
 * 保存发票内容
 */
function save_Invoice() {
	// 隐藏域，判断修改地址后，是否需要修改发票信息，广州机构比较特殊
	$("#isNeedOpenInvoice").val("false");
	// 发票类型和内容
	var invoice_hasBook = $("#hasBook").val();
	var invoice_hasCommon = $("#hasCommon").val();
	var invoice_companyName = $("#companyNameText").val();
	var invoice_type = $('input:radio[name="invoiceType"]:checked').val();
	var invoice_title = $('input:radio[name="invoiceTitle"]:checked').val();
	var invoice_common_content="";
	var invoice_book_content="";
	// 赠票信息
	var vat_companyName = "";
	var vat_code = "";
	var vat_address = "";
	var vat_phone = "";
	var vat_bankName = "";
	var vat_bankAccount = "";
	// 增票地址
	var consigneeName="";
	var consigneeAddress="";
	var consigneePhone="";
	var consignee_provinceId=0;
	var consignee_province="";
	var consignee_cityId=0;
	var consignee_city="";
	var consignee_countyId=0;
	var consignee_county="";
	var consignee_townId=0;
	var consignee_town="";
	var sendSeparate = false;
	// 常用发票id
	var usualInvoiceId=0;
	// 电子发票
	var electro_invoiceTitle=$('input:radio[name="electroInvoiceTitle"]:checked').val();
	var electro_phone=$("#e_consignee_mobile").val();
	var electro_email=$("#e_consignee_email").val();
	var electro_companyName = $("#electroCompanyName").val();
	if (invoice_type == 1) {// 普票
		if ($("input:radio[name='normal-normalContent']").html() != null) {
			invoice_common_content = $(
					"input:radio[name='normal-normalContent']:checked").val();
		} else {
			invoice_common_content = "";
		}
		if ($("input:radio[name='normal-bookContent']").html() != null) {
			invoice_book_content = $(
					"input:radio[name='normal-bookContent']:checked").val();
		} else {
			invoice_book_content = "";
		}
        // 实体礼品卡
        if (isLipinkaPhysical()) {
            if ($("#normal-invoice-content-lipinkaPhysical").html() != null) {
                invoice_common_content = $("#normal-invoice-content-lipinkaPhysical").val();
            } else {
                invoice_common_content = "";
            }

        }
	} else if(invoice_type == 2){// 赠票
		if ($("input:radio[name='vat-normalContent']").html() != null) {
			invoice_common_content = $(
					"input:radio[name='vat-normalContent']:checked").val();
		} else {
			invoice_common_content = "";
		}
		if ($("input:radio[name='vat-bookContent']").html() != null) {
			invoice_book_content = $(
					"input:radio[name='vat-bookContent']:checked").val();
		} else {
			invoice_book_content = "";
		}
		// 获取增值税发票
		vat_companyName = $("#vat_companyName").val();
		vat_code = $("#vat_code").val();
		vat_address = $("#vat_address").val();
		vat_phone = $("#vat_phone").val();
		vat_bankName = $("#vat_bankName").val();
		vat_bankAccount = $("#vat_bankAccount").val();
	}else{
		// 电子发票内容
		if ($("input:radio[name='electro-bookContent']").html() != null) {
			invoice_book_content = $(
					"input:radio[name='electro-bookContent']:checked").val();
		} else {
			invoice_book_content = "";
		}
		if ($("input:radio[name='electro-normalContent']").html() != null) {
			invoice_common_content = $(
			"input:radio[name='electro-normalContent']:checked").val();
		} else {
			invoice_common_content = "";
		}
	}
	if(!$("#invoiceConsignee").is(":hidden")){
		if(!$("#invoicesSendTypeDiv").is(":hidden")){
			if($('input:radio[name="invoiceSendType"]:checked').val()=="3"){
				sendSeparate = true;
			}
		}
		// 收票人地址信息
		consigneeName=$("#consignee_name").val();
		consigneeAddress=$("#consignee_address").val();
		consigneePhone=$("#consignee_mobile").val();
		consignee_provinceId=parseInt($("#consignee_province").find("option:selected").val());
		consignee_province=$("#consignee_province").find("option:selected").text().replace("*","");
		consignee_cityId=parseInt($("#consignee_city").find("option:selected").val());
		consignee_city=$("#consignee_city").find("option:selected").text().replace("*","");
		consignee_countyId=$("#consignee_county").find("option:selected").val();
		consignee_county=$("#consignee_county").find("option:selected").text().replace("*","");
		consignee_townId=$("#consignee_town").find("option:selected").val();
		consignee_town=$("#consignee_town").find("option:selected").text().replace("*","");
		consignee_countyId=(consignee_county==''||consignee_county==undefined)?0:parseInt(consignee_countyId);
		consignee_townId=(consignee_townId==''||consignee_townId==undefined)?0:parseInt(consignee_townId);
	}
	
	// 发票类型验证
	if (isEmpty(invoice_type)) {
		alert("请选择发票类型！");
		return;
	}
	// 普通发票验证
	if (invoice_type == 1) {
		// 发票抬头验证
		if (isEmpty(invoice_title)) {
			alert("请选择发票抬头！");
			return;
		} else {
			// 抬头如果是单位验证
			if (invoice_title == 5) {
				if (isEmpty(invoice_companyName)) {
					alert("请输入单位名称！");
					return;
				} else {
					if (checkLength(invoice_companyName) < 2) {
						alert("请填写完整单位名称！");
						return;
					}
					if (100 < checkLength(invoice_companyName)) {
						alert("单位名称过长,请重新输入！");
						return;
					}
					if (!is_forbid(invoice_companyName)) {
						alert("单位名称含有非法字符！");
						return;
					}
				}
			}
		}
		//礼品购 发票单独邮寄 校验
		if(sendSeparate){
			var checkInvoice = true;
			// 验证收货人信息是否正确
			if (!check_InvoiceConsignee("name_div")) {
				checkInvoice = false;
			}
			// 验证手机号码是否正确
			if (!check_InvoiceConsignee("call_phone_div")) {
				checkInvoice = false;
			}
			// 验证收货人地址是否正确
			if (!check_InvoiceConsignee("address_div")) {
				checkInvoice = false;
			}
			// 验证地区是否正确
			if (!check_InvoiceConsignee("area_div")) {
				checkInvoice = false;
			}
			if(!checkInvoice){
				return;
			}
		}
	} else if (invoice_type == 2) { // 增值税发票验证
		var checkAddValed = true;
		// 增值税单位名称验证
		if (!check_Invoice("vat_companyName", vat_companyName)) {
			checkAddValed = false;
		}
		// 增值税纳税人识别号验证
		if (!check_Invoice("vat_code", vat_code)) {
			checkAddValed = false;
		}
		// 增值税注册注册地址验证
		if (!check_Invoice("vat_address", vat_address)) {
			checkAddValed = false;
		}
		// 增值税注册电话验证
		if (!check_Invoice("vat_phone", vat_phone)) {
			checkAddValed = false;
		}
		// 增值税开户银行验证
		if (!check_Invoice("vat_bankName", vat_bankName)) {
			checkAddValed = false;
		}
		// 增值税开户银行账户验证
		if (!check_Invoice("vat_bankAccount", vat_bankAccount)) {
			checkAddValed = false;
		}
		// 验证收货人信息是否正确
		if (!check_InvoiceConsignee("name_div")) {
			checkAddValed = false;
		}
		// 验证手机号码是否正确
		if (!check_InvoiceConsignee("call_phone_div")) {
			checkAddValed = false;
		}
		// 验证收货人地址是否正确
		if (!check_InvoiceConsignee("address_div")) {
			checkAddValed = false;
		}
		// 验证地区是否正确
		var provinceId = $("#consignee_province").find("option:selected").val();
		var cityId = $("#consignee_city").find("option:selected").val();
		var countyId = $("#consignee_county").find("option:selected").val();
		var townId = $("#consignee_town").find("option:selected").val();
		if (isEmpty(provinceId) || isEmpty(cityId) || isEmpty(countyId)
				|| ($("#span_town").html()!=""&&!$("#span_town").is(":hidden") && isEmpty(townId))) {
			checkAddValed = false;
			$("#area_div_error").html("请您填写完整的地区信息");
			$("#area_div").addClass("message");
		}
		if (!checkAddValed) {
			return;
		}
	}else if(invoice_type == 3){//电子发票
		if(!check_electroInvoicePhone()){
			return;
		}
		if(!check_electroInvoiceEmail()){
			return;
		}
		//电子发票抬头如果是单位验证单位名称
		if (electro_invoiceTitle == 5) {
			if (isEmpty(electro_companyName)) {
				alert("请输入单位名称！");
				return;
			} else {
				if (checkLength(electro_companyName) < 2) {
					alert("请填写完整单位名称！");
					return;
				}
				if (100 < checkLength(electro_companyName)) {
					alert("单位名称过长,请重新输入！");
					return;
				}
				if (!is_forbid(electro_companyName)) {
					alert("单位名称含有非法字符！");
					return;
				}
			}
		}
	}

	var isUseNewInvoice = $("#invoice-add").attr("checked");
	var invokeInvoiceBasicService =  $("#invokeInvoiceBasicService").val();
	
	if (isUseNewInvoice) {
		if(invoice_type ==1 && !(invoice_book_content<=0 && invoice_common_content<=0)){
			var param = "invoiceParam.selectInvoiceTitle=" + invoice_title
					+ "&invoiceParam.companyName=" + invoice_companyName;
			param = param + "&invokeInvoiceBasicService="+invokeInvoiceBasicService;
			param = addFlowTypeParam(param);
			jQuery.ajax( {
				type : "POST",
				dataType : "text",
				url : OrderAppConfig.DynamicDomain + "/invoice/addInvoiceToUsual.action",
				data : param,
				cache : false,
				success : function(dataResult, textStatus) {
					usualInvoiceId = 0;
					if(dataResult != null && dataResult != ""){
						if(!isNaN(dataResult)){
							usualInvoiceId=parseInt(dataResult);
						}
					}
					var param = "invoiceParam.selectedInvoiceType=" + invoice_type
					+ "&invoiceParam.companyName=" + invoice_companyName
					+ "&invoiceParam.selectInvoiceTitle=" + invoice_title
					+ "&invoiceParam.selectBookInvoiceContent=" + invoice_book_content
					+ "&invoiceParam.selectNormalInvoiceContent="+ invoice_common_content 
					+ "&invoiceParam.vatCompanyName="+ vat_companyName 
					+ "&invoiceParam.code=" + vat_code
					+ "&invoiceParam.regAddr=" + vat_address
					+ "&invoiceParam.regPhone=" + vat_phone + "&invoiceParam.regBank="+ vat_bankName
					+ "&invoiceParam.regBankAccount=" + vat_bankAccount
					+ "&invoiceParam.hasCommon=" + invoice_hasCommon
					+ "&invoiceParam.hasBook=" + invoice_hasBook+"&invoiceParam.consigneeName="+consigneeName
					+"&invoiceParam.consigneePhone="+consigneePhone+"&invoiceParam.consigneeAddress="+consigneeAddress
					+"&invoiceParam.consigneeProvince="+consignee_province+"&invoiceParam.consigneeProvinceId="+consignee_provinceId
					+"&invoiceParam.consigneeCity="+consignee_city+"&invoiceParam.consigneeCityId="+consignee_cityId
					+"&invoiceParam.consigneeCounty="+consignee_county+"&invoiceParam.consigneeCountyId="+consignee_countyId
					+"&invoiceParam.consigneeTown="+consignee_town+"&invoiceParam.consigneeTownId="+consignee_townId+"&invoiceParam.sendSeparate="+sendSeparate
					+"&invoiceParam.usualInvoiceId="+usualInvoiceId
					+"&invoiceParam.selectElectroTitle="+electro_invoiceTitle
					+"&invoiceParam.electroCompanyName="+electro_companyName
					+"&invoiceParam.electroInvoiceEmail="+electro_email+"&invoiceParam.electroInvoicePhone="+electro_phone;
					param = param + "&invokeInvoiceBasicService="+invokeInvoiceBasicService;
					param = addFlowTypeParam(param);
					jQuery.ajax( {
						type : "POST",
						dataType : "text",
						url : OrderAppConfig.DynamicDomain + "/invoice/saveInvoice.action",
						data : param,
						cache : false,
						success : function(dataResult, textStatus) {
							// 没有登录跳登录
							if (isUserNotLogin(dataResult)) {
								goToLogin();
								return;
							}
							// 服务器返回异常处理,如果有消息div则放入,没有则弹出
							if (isHasMessage(dataResult)) {
								var message = getMessage(dataResult);
								alert(message);
								back_Before(OrderAppConfig.Module_Invoice);
							}
							// 成功后如果有divID直接放入div，没有则返回结果
							else {
								$("#" + OrderAppConfig.Module_Invoice).html(dataResult);
								if(invoice_common_content > 0){
									$("#sopNotPutInvoice").val("false");
								}else{
									$("#sopNotPutInvoice").val("true");
								}
								showSopInvoiceNote();
								save_Module(OrderAppConfig.Module_Invoice);
								
						   }
						},
						error : function(XMLHttpResponse) {
							alert("系统繁忙，请稍后再试！");
							back_Before(OrderAppConfig.Module_Invoice);
						}
					});
				},
				error : function(XMLHttpResponse) {
					alert("系统繁忙，请稍后再试！");
				}
			});
			return;
		}
	}else{
		usualInvoiceId=$("input:radio[name='usualInvoiceList']:checked").val();
	}
	if(invoice_type ==2 || invoice_type ==3 || usualInvoiceId==undefined){
		usualInvoiceId = 0;
	}
	
	var param = "invoiceParam.selectedInvoiceType=" + invoice_type
			+ "&invoiceParam.companyName=" + invoice_companyName
			+ "&invoiceParam.selectInvoiceTitle=" + invoice_title
			+ "&invoiceParam.selectBookInvoiceContent=" + invoice_book_content
			+ "&invoiceParam.selectNormalInvoiceContent="+ invoice_common_content 
			+ "&invoiceParam.vatCompanyName="+ vat_companyName 
			+ "&invoiceParam.code=" + vat_code
			+ "&invoiceParam.regAddr=" + vat_address
			+ "&invoiceParam.regPhone=" + vat_phone + "&invoiceParam.regBank="+ vat_bankName
			+ "&invoiceParam.regBankAccount=" + vat_bankAccount
			+ "&invoiceParam.hasCommon=" + invoice_hasCommon
			+ "&invoiceParam.hasBook=" + invoice_hasBook+"&invoiceParam.consigneeName="+consigneeName
			+"&invoiceParam.consigneePhone="+consigneePhone+"&invoiceParam.consigneeAddress="+consigneeAddress
			+"&invoiceParam.consigneeProvince="+consignee_province+"&invoiceParam.consigneeProvinceId="+consignee_provinceId
			+"&invoiceParam.consigneeCity="+consignee_city+"&invoiceParam.consigneeCityId="+consignee_cityId
			+"&invoiceParam.consigneeCounty="+consignee_county+"&invoiceParam.consigneeCountyId="+consignee_countyId
			+"&invoiceParam.consigneeTown="+consignee_town+"&invoiceParam.consigneeTownId="+consignee_townId+"&invoiceParam.sendSeparate="+sendSeparate
			+"&invoiceParam.usualInvoiceId="+usualInvoiceId
			+"&invoiceParam.selectElectroTitle="+electro_invoiceTitle
			+"&invoiceParam.electroCompanyName="+electro_companyName
			+"&invoiceParam.electroInvoiceEmail="+electro_email+"&invoiceParam.electroInvoicePhone="+electro_phone;
	param = param + "&invokeInvoiceBasicService="+invokeInvoiceBasicService;
	param = addFlowTypeParam(param);
	jQuery.ajax( {
		type : "POST",
		dataType : "text",
		url : OrderAppConfig.DynamicDomain + "/invoice/saveInvoice.action",
		data : param,
		cache : false,
		success : function(dataResult, textStatus) {
					// 没有登录跳登录
					if (isUserNotLogin(dataResult)) {
						goToLogin();
						return;
					}
					// 服务器返回异常处理,如果有消息div则放入,没有则弹出
					if (isHasMessage(dataResult)) {
						var message = getMessage(dataResult);
						alert(message);
						back_Before(OrderAppConfig.Module_Invoice);
					}
					// 成功后如果有divID直接放入div，没有则返回结果
					else {
						$("#" + OrderAppConfig.Module_Invoice).html(dataResult);
						if(invoice_common_content > 0){
							$("#sopNotPutInvoice").val("false");
						}
						else{
							$("#sopNotPutInvoice").val("true");
						}
						showSopInvoiceNote();
						save_Module(OrderAppConfig.Module_Invoice);
			}
		},
		error : function(XMLHttpResponse) {
			alert("系统繁忙，请稍后再试！");
			back_Before(OrderAppConfig.Module_Invoice);
		}
	});
}

/**
 * 使用新发票信息
 */
function use_NewInvoice() {
	var invokeInvoiceBasicService = $("#invokeInvoiceBasicService").val();
	if(invokeInvoiceBasicService=="true"){
		$("#normal-invoice-1").attr("checked",true);
		$("#useNewInvoice").attr("class","item item-selected");
		// 常用发票列表处于未选中状态
		$("input[name='usualInvoiceList']").attr("checked",false);
		// 去掉常用发票的底色
		$("#invoice-list").find(".item").each(function(){
			$(this).attr("class", "item");
		});
		// ---使用新发票，清空并设置默认值
		$("#invoice-add").attr("checked", "checked");
		
		show_GenenalInvoiceDetail(0,false);
		return;
	}
	
	$("#invoice_type").show();
	$("#invoice_title").show();
	$("#useNewInvoice").attr("class","item item-selected");
	// 常用发票列表处于未选中状态
	$("#invoice-list").find(".hookbox").each(function(){
		$(this).attr("checked","");
	});
	// 去掉常用发票的底色
	$("#invoice-list").find(".item").each(function(){
		$(this).attr("class", "item");
	});
	// 切换回普票
	changeInvoiceType(1);
	// ---使用新发票，清空并设置默认值
	$("#invoice-add").attr("checked", "checked");
	$("#normal-invoice-1").attr("checked", "checked");
	$("#invoice-title-4").attr("checked", "checked");
	$("#electro-invoice-title-4").attr("checked", "checked");
	// 隐藏单位名称对话框
	showCompanyDiv(4);
	showElectroCompanyDiv(4);
	$("#companyNameText").val("");
	$("#normal_content_radio").find(".hookbox").eq(0)
			.attr("checked", "checked");
	$("#book_content_radio").find(".hookbox").eq(0).attr("checked", "checked");
	$("#electro_book_content_radio").find(".hookbox").eq(0).attr("checked", "checked");
	var addInvoiceObj = $("#special-form");
	var isDisable = $("#vatCanEdit").val();
	if (isDisable == "false") {
		if (addInvoiceObj != null) {
			$("#vat_normal_content_radio").find(".hookbox").eq(0).attr("checked",
					"checked");
			$("#vat_book_content_radio").find(".hookbox").eq(0).attr("checked",
					"checked");
	
			$("#vat_companyName").val("");
			$("#vat_code").val("");
			$("#vat_address").val("");
			$("#vat_phone").val("");
			$("#vat_bankName").val("");
			$("#vat_bankAccount").val("");
		}
	}
}

/**
 * 删除常用发票信息
 * 
 * @param id
 */
function delete_Invoice(id) {
	var actionUrl = OrderAppConfig.AsyncDomain
			+ "/invoice/deleteInvoiceFromUsual.action";
	var invokeInvoiceBasicService =  $("#invokeInvoiceBasicService").val();
	var param = "invoiceParam.usualInvoiceId=" + id;
	param = param + "&invokeInvoiceBasicService="+invokeInvoiceBasicService;
	jQuery.ajax( {
				type : "POST",
				dataType : "json",
				url : actionUrl,
				data : param,
				cache : false,
				success : function(dataResult, textStatus) {
						// 没有登录跳登录
						if (isUserNotLogin(dataResult)) {
							goToLogin();
							return;
						}
						if (isHasMessage(dataResult)) {
							var message = getMessage(dataResult);
							alert(message);
						} else {
							if (dataResult) {
								var index = 0;
								// 重置一下总个数
						var commonInvoiceSize = $("#commonInvoiceSize").val();
						var invoiceSize = parseInt(commonInvoiceSize);
						if (invoiceSize > 0) {
							invoiceSize = invoiceSize - 1;
							$("#commonInvoiceSize").val("" + invoiceSize);
						}
						// 如果只有一个常用发票，则删除整个div
						if ($("#invoice-list").find(".hookbox").size() == 1) {
							$("#invoice-r1-" + id).parent().remove();
							$("#invoice-more-div").remove();
							
							
							
							
							
							
							use_NewInvoice();
						} else {
							// 删除本条发票显示
						$("#invoice-r1-" + id).parent().remove();
						// 改变索引
						$("#invoice-list").find("div").each(function() {
		
							if ($(this).attr("index") != null) {
								index = index + 1;
								$(this).attr("index", index);
							}
						});
						// 如果没有选中的则默认选中第一个发票信息
						if ($("#invoice-list").find(".hookbox").size() > 0
								&& $("#invoice-list").find(".hookbox[checked]").size() == 0) {
							var invoiceId = $("#invoice-list").find(".hookbox").eq(0)
									.val();
							// 选择下一个发票
							if (invoiceId != null && invoiceId != ""
									&& parseInt(invoiceId) > 0) {
								chose_Invoice(invoiceId,true);
							}
						}
						// 重新常用发票（删除后重新显示前五个）
						refresh_Invoice();
					}
				}
			}
		},
		error : function(XMLHttpResponse) {
			alert("系统繁忙，请稍后再试！");
		}
	});
}

/**
 * 删除后刷新常用发票信息
 * 
 * @param obj
 */
function refresh_Invoice() {
	var size = $("#invoice-list").find(".item").size();
	$("#invoice-list").find(".item").each(function() {
		var index = $(this).attr("index");
		if (index != null || index != undefined) {
			var indexNum = parseInt(index);
			if (indexNum <= 5) {
				$(this).show();
			} else {
				$(this).hide();
			}
		}
	});
	var commonInvoiceSize = $("#commonInvoiceSize").val();
	if (commonInvoiceSize > 5) {
		$("#invoice-more-btn").html(
				"<span onclick=\"open_MoreInvoice()\">更多发票信息</span><s></s>");
	} else {
		$("#invoice-more-btn").hide();
	}
}

/**
 * 修改普通发票的寄送方式
 * 
 * @param type
 */
function changeGeneralInvoiceConsigneeSendType(type){
	if(type == "3"){
		$("#invoiceConsigneeDiv").show();
	}else{
		$("#invoiceConsigneeDiv").hide();
	}
}

function fillInvoiceConsigneeInfo(type){
	var consigneeInfo = "";
	if(type =="1"){
		var generalInvoiceConsigneeInfo = $("#generalInvoiceConsigneeInfo").val();
		if(!isEmpty(generalInvoiceConsigneeInfo) && !isEmpty(generalInvoiceConsigneeInfo.split(',')[0])){
			consigneeInfo = generalInvoiceConsigneeInfo.split(',');
		}
	}else{
		var vatConsigneeInfo = $("#vatConsigneeInfo").val();
		if(!isEmpty(vatConsigneeInfo) && !isEmpty(vatConsigneeInfo.split(',')[0])){
			consigneeInfo = vatConsigneeInfo.split(',');
		}
	}
	if(consigneeInfo!="" && consigneeInfo.length>0){
		$("#consignee_name").val(consigneeInfo[0]);
		$("#consignee_mobile").val(consigneeInfo[1]);
		$("#consignee_address").val(consigneeInfo[6]);
		loadAreaDetailForInvoiceConsingee(consigneeInfo[2],consigneeInfo[3],consigneeInfo[4],consigneeInfo[5]);
	}
}



// *************************************************支付和配送方式开始***************************************************************
/**
 * 编辑支付方式
 */
function edit_Payment(flag) {
	$("#payment-ship").css({
		position:"static"
	});
	if (!edit_before(OrderAppConfig.Module_PayAndShip)) {
		return;
	}
	var showPaymentUrl = OrderAppConfig.DynamicDomain
			+ "/payAndShip/showPaymentList.action";
	var param = addFlowTypeParam();
	jQuery.ajax( {
		type : "POST",
		dataType : "text",
		url : showPaymentUrl,
		data : param,
		cache : false,
		success : function(dataResult, textStatus) {
			// 没有登录跳登录
		if (isUserNotLogin(dataResult)) {
			goToLogin();
			return;
		}
		// 服务器返回异常处理,如果有消息div则放入,没有则弹出
		if (isHasMessage(dataResult)) {
			var message = getMessage(dataResult);
			alert(message);
			back_Before(OrderAppConfig.Module_PayAndShip);
	
			if (message == "请先保存收货人信息") {
				edit_Consignee();
			}
		}
		// 成功后如果有divID直接放入div，没有则返回结果 "payment-ship";
		else {
			// 收货人地址保存提示
			if(flag==1){
				$("#save-payAndShip-tip").html("<span class='save-consignee-payship'>由于您更改了收货人信息，请重新设置并<a href='#none'  style='color:#005EA7;' onclick='save_PayAndShip()'>保存支付及配送方式</a></span>");
			}
			// 如果自动展开提示单独给出
			else if(flag==2){
				$("#save-payAndShip-tip").html("<span class='save-consignee-payship'>请先<a href='#none' style='color:#005EA7;' onclick='save_PayAndShip()'>保存支付及配送方式</a>。如需修改收货人信息，请保存后再修改</span>");
			}
			// 默认提示
			else{
				$("#"+OrderAppConfig.Module_PayAndShip+"_edit_action").html("<a href='#none'  style='color:#005EA7;'  onclick='save_PayAndShip()'>保存支付及配送方式</a>");
			}
			// TODO bianji
			$("#" + OrderAppConfig.Module_PayAndShip + "_edit_action").show();
			$("#" + OrderAppConfig.Module_PayAndShip).html(dataResult);
			// 获取选中的支付方式id
			var paymentId = getSelectedPaymentId();
			if(4 != paymentId) {
				$("#payment-bankList").hide();
			}
			if(4 == paymentId) {
				$("#payment-bankList").show();
			}
			
			if(1 != paymentId) {
				$("#payment-factoryShipCod").hide();
			}
			if(1 == paymentId) {
				$("#payment-factoryShipCod").show();
			}
// var installPay = $("#pay-method-8").attr("checked");
//		
// if(installPay && isShowInstalmentPlan()) {
// // 展示
// $(".payRemark_8").show();
// getInstallmentInfo();
// } else {
// // 不展示
// $(".payRemark_8").hide();
// }
			edit_Shipment(paymentId);
			// 选中的为加亮
			lightRadio("payAndShipParam.payId", "payItem");
			// baitiao
			showWhiteBar();
			
	}
	},
	error : function(XMLHttpResponse) {
	alert("系统繁忙，请稍后再试！");
	back_Before(OrderAppConfig.Module_PayAndShip);
	}
	});
}

/**
 * 是否显示打白条
 * 
 */
function showWhiteBar(){
	try{
		$.getJSON("http://baitiao.jd.com/account/query?callback=?",
				function(data){
					if(data==null){
						return;
					}
					if(data.result!=null && data.result.isSuccess && (data.status==2 || data.status==3 )){
						$(".whiteBarSpanClass").show();
						$("#baitiaomessage").show();
					}else{
						$(".whiteBarSpanClass").hide();
						$("#baitiaomessage").hide();
					}
				});
	}catch(err){
		
	}
}

/**
 * 是否显示分期付款
 */
function isShowInstalmentPlan(){
	// 分期付款改动 add by DXF
	var instalmentPlan=$("#instalmentPlan").val();
	if(!isEmpty(instalmentPlan) && instalmentPlan == "true"){
		return true;
	}
	else{
		return false;
	}
}

function getSelectedPaymentId() {
	var paymentId = 4;
	paymentId = $("input[name='payment'][checked]").val();
	return paymentId;
}

/**
 * 编辑配送方式
 * 
 * @param type
 */
function edit_Shipment(type) {
	var actionUrl = OrderAppConfig.DynamicDomain
			+ "/payAndShip/getCombinationShipment.action";
	var param = "paymentId="+type;
    param = addFlowTypeParam(param);
	jQuery.ajax({
				type : "POST",
				dataType : "text",
				url : actionUrl,
				data : param,
				cache : false,
				success : function(dataResult, textStatus) {
					// 没有登录跳登录
					if (isUserNotLogin(dataResult)) {
						goToLogin();
						return;
					}
					// 服务器返回异常处理,如果有消息div则放入,没有则弹出
					if (isHasMessage(dataResult)) {
						var message = getMessage(dataResult);
						alert(message);
						back_Before(OrderAppConfig.Module_Shipment);
					}
					// 成功后如果有divID直接放入div，没有则返回结果
					else {
						$("#" + OrderAppConfig.Module_Shipment + "_edit_action")
								.show();
						$("#" + OrderAppConfig.Module_Shipment)
								.html(dataResult);
						// 付款方式
						jdPayWay = $("input[name='jd-payway'][checked]").val();
						otherPayWay = $("input[name='other-payway'][checked]").val();
						// 自提点
						if($("#pickSiteInfo").html() != null){
							radioSelect({
								obj:$('.sment-box')
							});
						}
						// 预约配送311
						showPromise311(type);
						// 预约配送411
						showPromise411(type);

					}
					$('#store-selector')
				    .bind('mouseover',function(){
				        $(this).addClass('hover');
				        $('iframe',this).css({
				        	height:$('#store-selector .content').height()
				        });
				        $('iframe',this).css({
				        	height:$(this).height()
				        });
				        $('#pickDate').blur();
				    })
				    .bind('mouseleave',function(){
				        $(this).removeClass('hover');
				    })
				    .find('.close').bind('click',function(){
				        $('#store-selector').removeClass('hover');
				    });
				},
				error : function(XMLHttpResponse) {
					alert("系统繁忙，请稍后再试！");
					back_Before(OrderAppConfig.Module_Shipment);
				}
			});
}



var hData,dData;

/**
 * 填充311预约配送日历数据
 */
function showPromise311(paymentId){ 
			jQuery.ajax({
			    type:"POST",
			    dataType:"json",
			    async:false,
			    url: OrderAppConfig.DynamicDomain+ "/payAndShip/getPromise311.action?paymentId="+paymentId+addFlowTypeParam('&')+"&rt="+ Math.random(),
			    success:function (data) {
					if (data != null&& data.support == true) {
						$("#promise-311").html('<div class="t-item"><input type="radio" value="4" class="hookbox" name="delivery-t" id="delivery-t4"><label for="delivery-t4">指定送货时间</label><input type="text" id="date-311" readonly="true"/><input type="hidden" name="sendPay311" id="sendPay311" /><input type="hidden" name="day" id="day" /><input type="hidden" id="range" name="range" /></div>');			
						hData = data.timeRangeTitle;
						dData = data.days;									
						$("#promise-311").find("#date-311").bind("click",function(){
							$("#date-delivery").show();
						});
						initCalendar();
						$("#delivery-t4").attr('checked',true);
						$("#jdShipmentTip").html("此订单支持预约配送，您可以选择指定的时间段");
						$("#jdShipmentTip").show();
						if(!isEmpty(data.tipMsg)){
							$("#promise311MsgTip").html("<font color='#FF6600;'>&nbsp;&nbsp;（"+data.tipMsg+"）</font>");
						}
						else{
							$("#promise311MsgTip").html("");
						}
						if(data.selected && !isEmpty(data.promiseSendPay)){
							$("#date-311").val(data.show311Text);
							$("#day").val(data.promiseDate);
							$("#sendPay311").val(data.promiseSendPay);
							$("#range").val(data.promiseTimeRange);						
						}
						else{
							window.setTimeout("$('#date-311').click()",300);
						}
						var pData = data.promiseTime;
						if(pData != null){
							for(var i=1;i<4;i++){
								var message=pData[i];
								if(!isEmpty(message)){
									$("#promise-t"+i).html("&nbsp;&nbsp;<font color='red'>"+message+"</font>");
								}
							}																	
						}
			        }
					else{
						showCodeTime();
					}
			    },
			    error : function(XMLHttpResponse){
			    	showCodeTime();
				}
			});
}

/**
 * 显示配送方式显示的时间
 */
function showCodeTime(){
   $(".t-item").each(function(){
	  $(this).show();
   });
   $("#jdShipmentTip").show();
}

/**
 * 选中promise
 */
function selectedPromise(){
	$("#delivery-t4").attr('checked',true);
	$('#date-311').click();
}

/**
 * 获得411急速达信息
 * 
 * @param paymentId
 * @param shipmentId
 */
function showPromise411(paymentId){
	var actionUrl = OrderAppConfig.AsyncDomain+ "/payAndShip/getPromise411.action";
	var param = "paymentId="+paymentId;
	param = addFlowTypeParam(param);
		jQuery.ajax( {
			type : "POST",
			dataType : "json",
			url : actionUrl,
			data : param,
			cache : false,
			success : function(data, textStatus) {
				// 没有登录跳登录
			if (isUserNotLogin(data)) {
				goToLogin();
				return;
			}
			if (data.support == true) {
				var rapidShipmentTemplat = "<div class='list payment-type'>" +
												"<div class='field'>" +
													"<input type='radio' name='delivery-t' id='delivery-t5' class='hookbox'  value='5'>" +
												    "<input type='hidden' id='sendPay411' value='"+data.sendPay+"'>"+
												"</div>" ;
				if(data.carriageMoney!=0){
					rapidShipmentTemplat += "<label for='delivery-t5' id='sendPay411_remarkInfo'>极速达&nbsp;&nbsp;(下单后或支付成功后3小时送达，运费" + data.carriageMoney + "元)</label>";
				}else{
					rapidShipmentTemplat += "<label for='delivery-t5' id='sendPay411_remarkInfo'>极速达&nbsp;&nbsp;(下单后或支付成功后3小时送达，免运费)</label>";
				}
				rapidShipmentTemplat +=	"<span id='sendPay411_grayMsg' class='speed411'></span></div>";
				$("#promise-411").html(rapidShipmentTemplat);
				if(data.grayFlag == true){
					$("#delivery-t5").attr("disabled",true);
					$("#sendPay411_remarkInfo").css("color","#999999");
					$("#sendPay411_grayMsg").append("<a href='#none' class='tips-i' id='sendPay411-tip-btn'>&nbsp;</a>");
					$('#sendPay411-tip-btn').Jtips({// 随点随帮tip弹出
						   "content":data.grayMsg,
						   "close":true,
						   "position": 'bottom'
					  });
				}else{
					if(data.selected == true){
						$("#delivery-t5").attr("checked","checked");
					}
					$("#delivery-t5").attr("disabled",false);
				}
				$(".speed411").hover(function(){
					$(".bt-topp").show();
				},function(){
					$(".bt-topp").hide();
				});				
			}
			},
			error : function(XMLHttpResponse) {
			}
		});
}


/**
 * 加载预约配送信息
 */
function loadPromise(resetPromise311){
//	var actionUrl =  OrderAppConfig.AsyncDomain + "/payAndShip/getPromiseByCurrentOrder.action";
//	var param = addFlowTypeParam();
//	if(resetPromise311){
//		actionUrl=actionUrl+"?resetPromise311=true";
//	}
//	jQuery.ajax( {
//		type : "POST",
//		dataType : "json",
//		url : actionUrl,
//		data : param,
//		cache : false,
//		success : function(data, textStatus) {
//		// 没有登录跳登录
//		if (isUserNotLogin(data)) {
//			goToLogin();
//			return;
//		}
//		if(data.openPayAndShip){
//			edit_Payment(1);
//			return ;
//		}
//		if(!isEmpty(data.promiseMessage)){
//			$("#payment-ship_back").remove();
//			$("#promise_jd_message").html("&nbsp;&nbsp;<font color='red'>"+data.promiseMessage+"</font>");
//		}
//		if(!isEmpty(data.show311Text)){
//			$("#promise311tip").html(data.show311Text);	
//		}
//		// 大家电配送异步加载
//		if(!isEmpty(data.bigItemShipDate)){
//			$("#bigItemShipDate").html('<font color="#FF6600;">'+data.bigItemShipDate+"送货"+'</font>');	
//		}
//		// 大家电安装异步加载
//		if(!isEmpty(data.bigItemInstallDate)){
//			$(".bigItemInstallInfoDateStr").html(data.bigItemInstallDate);	
//		}
//		// 411免运费
//		if(data.freeForSpeed){
//			$("#speedFreightNote").text("下单后或支付成功后3小时之内送达，免运费");
//		}else{
//			$("#speedFreightNote").text("下单后或支付成功后3小时之内送达，需要加收运费49.00元");
//		}
//		},
//		error : function(XMLHttpResponse) {
//		}
//	});
}

/**
 * 保存支付与配送方式
 */

function save_PayAndShip() {
    $("#payment-ship").css({
		position:"relative"
	});
	var param = "";
	// var payid = $("#payment-ship").find("input[type='radio']").val();
	var payid = $("input[name='payment'][checked]").val();
	
	var addMoney=0;
	// 如果支付方式是在线支付，把选择银行信息传到后台
	if(payid==4){
		param = "saveParam.paymentId=" + payid ;
	// 分期付款
	}else if(payid==8){
		var selectedBankId=$("input[name^='ins_banks'][checked]").val();
		var selectedPeriod=$("input[name^='ins_periods'][checked]").val();
		param = "saveParam.paymentId=" + payid +"&saveParam.selectedBankId="+selectedBankId+"&saveParam.selectedPeriod="+selectedPeriod;
		// 保存分期付款手续费
		addMoney = $("#add_money").text();
	}
	else{
		param = "saveParam.paymentId=" + payid;
	}
	// 京东配送
	var jd_shipment = $("input[id='jd-shipment'][checked]").val();
	// 京东三方配送
	var other_shipment = $("input[id='other-shipment'][checked]").val();
	// sop三方配送
	var sop_other_shipment = $("input[id='sop-other-shipment'][checked]").val();
	// 自提
	var pick_shipment = $("input[id='pick-shipment'][checked]").val();
	
	var jdShipTime = 0;
	// var jdReserveTime = 0;
	var jdNightShip = 0;
	var jdBeforeNotify = 0;
	var jdPayWay = 0;
	var jdBigItemTime = 0;
	if (!isEmpty(jd_shipment)) {
		param += "&saveParam.jdShipmentType=" + jd_shipment;
		if (!isEmpty($("#jd-delivery-time").html())) {
			jdShipTime = $("input[name='delivery-t'][checked]").val();
			param += "&saveParam.jdShipTime=" + jdShipTime;
		}
		// ADDED BY DENGYOUYOU
		if (jdShipTime == 4) {

			promiseDate =  $("#day").val();
			promiseTimeRange =  $("#range").val();
			promiseSendPay = $("#sendPay311").val();
            // 日历为空没有选择给一个默认的过期时间，异步验证会取最近的时间，提升用户体验
			if (promiseDate == null || promiseDate == "") {
				promiseDate = "2011-06-27";
				promiseSendPay = "{'1':1,'35':0,'30':1}";
				promiseTimeRange= "9:00-15:00";
			}
			param += "&saveParam.promiseType=1&saveParam.promiseDate="+promiseDate+"&saveParam.promiseTimeRange="+promiseTimeRange+"&saveParam.promiseSendPay="+promiseSendPay;
		}
		// add by DXF 411急速达
		else if(jdShipTime == 5){
			promiseSendPay = $("#sendPay411").val();
			if(isEmpty(promiseSendPay)){
				param += "&saveParam.promiseType=2";
			}else{
				param += "&saveParam.promiseType=2&saveParam.promiseSendPay=" + promiseSendPay;
			}
		}
	
		if (!isEmpty($("#jd-night-ship").html())) {
			jdNightShip = $("#jdNightShipId").attr("checked");
			param += "&saveParam.canJdNightShip=" + jdNightShip;
		}
	
		if (!isEmpty($("#jd-before-notify").html())) {
			jdBeforeNotify = $("input[name='jd-inform'][checked]").val();
			param += "&saveParam.jdBeforeNotify=" + jdBeforeNotify;
		}
	
		if (!isEmpty($("#jd-payment-way").html())) {
			jdPayWay = $("input[name='jd-payway'][checked]").val();
			if(!isEmpty(jdPayWay)){
				param += "&saveParam.jdPayWayId=" + jdPayWay;
				param += "&saveParam.jdCheckType=2";
			}
		}
	
		if (!isEmpty($("#jd-bigItem-ship").html())) {
			jdBigItemTime = $("#jd-bigItem-ship-date").val();
	
			if (jdBigItemTime == -1) {
				alert("请选择大件商品送货时间");
				return;
			}
			param += "&saveParam.jdBigItemTime=" + jdBigItemTime;
			// 是否选择大家电晚间配送
			if ($("#bigItemNightShip").attr("checked")) {
				param += "&saveParam.selectedBigItemNightShip=true";
			}
			if($('#jd-bigItem-install-date').length>0){
				selectBigItemInstallTime = $('#jd-bigItem-install-date').val();
				if(selectBigItemInstallTime == -1){
					alert("请选择大件商品安装时间");
					return;
				}
				param += "&saveParam.selectJdBigItemInstallTime="+selectBigItemInstallTime;
			}else{
				param += "&saveParam.selectJdBigItemInstallTime=-1";
			}
		}else{
			param += "&saveParam.jdBigItemTime=-1&saveParam.selectJdBigItemInstallTime=-1";
		}
	}
	
	var otherShipTime = 0;
	var otherReserveTime = 0;
	var canOtherNightShip = 0;
	var otherBigIntemInstallOffset = 0;
	if (!isEmpty(other_shipment)) {
		param += "&saveParam.otherShipmentType=" + other_shipment;
		if (!isEmpty($("#other-delivery-time").html())) {
			otherShipTime = $("input[name='delivery-t'][checked]").val();
			param += "&saveParam.otherShipTime=" + otherShipTime;
		}
	
		// 中小件预约配送
		if (otherShipTime == 4) {
			otherReserveTime = $("#reserve-time").val();
			if (otherReserveTime == -1) {
				alert("请选择中小件预约配送时间");
				return;
			}
			param += "&saveParam.otherReserveTime=" + otherReserveTime;
		}
	
		// 夜间配送
		if (!isEmpty($("#night-ship").html())) {
			canOtherNightShip = $("#nightShipId").attr("checked");
			param += "&saveParam.canOtherNightShip=" + canOtherNightShip;
		}
		
		// 付款方式
		if (!isEmpty($("#other-payment-way").html())) {
			jdPayWay = $("input[name='other-payway'][checked]").val();
			if(!isEmpty(jdPayWay)){
				param += "&saveParam.otherPayWayId=" + jdPayWay;
				param += "&saveParam.otherCheckType=2";
			}
		}
		
		// 大家电
		if (!isEmpty($("#other-bigItem-ship").html())) {
			otherBigIntemInstallOffset = $("#other-bigItem-ship-date").val();
			if (otherBigIntemInstallOffset == -1) {
				alert("请选择大件商品送货时间");
				return;
			}
			param += "&saveParam.otherBigIntemInstallOffset=" + otherBigIntemInstallOffset;
			if($('#other-bigItem-install-date').length>0){
				selectBigItemInstallTime = $('#other-bigItem-install-date').val();
				if(selectBigItemInstallTime == -1){
					alert("请选择大件商品安装时间");
					return;
				}
				param += "&saveParam.selectOtherBigItemInstallTime="+selectBigItemInstallTime;
			}else{
				param += "&saveParam.selectOtherBigItemInstallTime=-1";
			}
		}else{
			param += "&saveParam.otherBigIntemInstallOffset=-1&saveParam.selectOtherBigItemInstallTime=-1";
		}
	
	}
	
	if (!isEmpty(sop_other_shipment)) {
		param += "&saveParam.sopOtherShipmentType=" + sop_other_shipment;
	}
	
	var pickSiteId = "";
	var pickDate = "";
	if (!isEmpty(pick_shipment)) {
		param += "&saveParam.pickShipmentType=" + pick_shipment;
		pickSiteId = $("input[name='pick'][checked]").val();
		var pickRegionId = $("#selectedRegionId").val();
		// var num = $("#address-more-txt").attr("page-no");
		var pickSiteNum = 5;
		if(isEmpty(pickSiteId)){
			alert("请选择自提站点");
			return;
		}	
		param += "&saveParam.pickSiteId=" + pickSiteId;
		// 自提柜无需获取自提时间
		if (pick_shipment != 19) {
			pickDate = $("#pickDate").val();
			param += "&saveParam.pickDate=" + pickDate;
		}
		param += "&saveParam.pickSiteNum=" + pickSiteNum;
		if(isEmpty(pickRegionId)){
			pickRegionId="-1";
		}
		param += "&saveParam.pickRegionId=" + pickRegionId;
		
		
	}
	param = addFlowTypeParam(param);
	$(".loading").css("display", "block");
	jQuery.ajax({
		type : "POST",
		dataType : "text",
		url : OrderAppConfig.DynamicDomain + "/payAndShip/savePayAndShip.action",
		data : param,
		cache : false,
		success : function(dataResult, textStatus) {
			// 没有登录跳登录
			if (isUserNotLogin(dataResult)) {
				goToLogin();
				return;
			}
			// 服务器返回异常处理,如果有消息div则放入,没有则弹出
			if (isHasMessage(dataResult)) {
				var message = getMessage(dataResult);
				alert(message);
				back_Before(OrderAppConfig.Module_PayAndShip);
			}
			// 成功后如果有divID直接放入div，没有则返回结果
			else {
				$("#" + OrderAppConfig.Module_PayAndShip).html(dataResult);
				save_Module(OrderAppConfig.Module_PayAndShip);
				// 刷新价格
				flushOrderPrice(eval("(" +$(dataResult).find("#orderPricePayAndShip").val() + ")"),false);
				// 取消使用京豆（避免价格变化导致可使用京豆数不准）
				useCancelEditJdBean(0,null,true);
				// 保存完支付配送重新刷新商品清单
				$("#span-skulist").html($("#savePayAndShipSkuList").val());				
				// 以旧换新逻辑
				if($("#payment-ship").find("#canReplacement").val()=="true"){
					$("#oldReplaceNewDiv").show();
					if($("#payment-ship").find("#useReplacement").val()=="true"){
						$("#oldReplaceNew").attr("checked","checked");
					}else{
						$("#oldReplaceNew").attr("checked","");
					}
				}else{
					$("#oldReplaceNewDiv").hide();
				}
				var replacementDiscount=$("#payment-ship").find("#replacementDiscount").val();
				var replacementPrice=$("#replacementPrice").text().replace("每件商品立减","").replace("元","");;
				if(replacementDiscount!=replacementPrice){
					goOrder();
				}
				
				
				// 修改分期付款手续费
				var periodFee = parseFloat(addMoney).toFixed(2);
				if(periodFee > 0) {
					$("#showPeriodFee").css("display", "none");
					$("#periodFee").text("￥"+periodFee);
				} else {
					$("#showPeriodFee").css("display", "none");
				}
				
				if($(dataResult).find("#factoryShipCod").val()=="true"){
					$('#factoryShipCodShowDivBottom').css("display","block");
				}else{
					$('#factoryShipCodShowDivBottom').css("display","none");
				}			
				isNeedPaymentPassword(); // 是否需要支付密码
				loadPromise(false);
				copyFreightHtml();
				loadSkuListStock();// 加载商品库存
				showTangJiuSkuIcon();// 加载Icon
				showWhiteBar();
				
				var isNeedOpenInvoice = $("#isNeedOpenInvoice").val();// 隐藏域，判断修改地址后，是否需要修改发票信息，广州机构比较特殊
				if(isNeedOpenInvoice != "false"){
					edit_Invoice() ;
				}
				window.location.hash="consigneeFocus";
			}
		},
		error : function(XMLHttpResponse) {
			alert("系统繁忙，请稍后再试！");
			back_Before(OrderAppConfig.Module_PayAndShip);
		}
	});
}

function removeMessageTip(){
	$("#save-payAndShip-tip").html("");
	$("#save-consignee-tip").html("");
	$("#save-invoice-tip").html("");
}

/**
 * 用户选中支付方式radio弹出层显示支持与不支持的商品列表
 * 
 * @param obj
 */
var YP_Sku_Flag = null;

function showSkuDialog(obj) {
	if($(obj).attr("payid") != 4) {
		$("#payment-bankList").hide();
	} 
	if($(obj).attr("payid") == 4) {
		$("#payment-bankList").show();
	}
	
	if($(obj).attr("payid") != 1) {
		$("#payment-factoryShipCod").hide();
	}
	if($(obj).attr("payid") == 1) {
		$("#payment-factoryShipCod").show();
	}
	
	if($(obj).attr("payid") == 8 && isShowInstalmentPlan()) {
		
		$("#payRemark_8").show();
	}
	if($(obj).attr("payid") != 8) {
		$("#payRemark_8").hide();
	}
	if(YP_Sku_Flag){
		YP_Sku_Flag = $(obj).parents('.item').parent().find('.item-selected :radio');
	 }
	
	 var payArr = $("[id^='pay-method-']");
	 for(var i = 0 ;i < payArr.length ;i++){
		 $(payArr[i]).parent().parent().removeClass("item-selected");
		 var itempayid=$(payArr[i]).parent().parent().attr("payid");
		
		 $("#supportPaySkus-" + itempayid).css("display", "none");
		// $("#otherSupportSkus-" + itempayid).css("display", "none");
		 
	 }
	 var selectedPay = $(obj).parent().parent();
	 selectedPay.addClass("item-selected");
	 
	var payId = $(obj).attr("payid");
	// 清除其他选项的选中状态
	var itemList=$(".payment").find('.item');
	for(var i = 0 ;i < itemList.length ;i++){
		var item = itemList[i];
		var $item = $(item);
		$item.height(28);
		$item.find(".label").find("span").hide();
		$item.find(".label").find(".orange").show();
		$item.find(".sment-mark").css("display","none");
	}
// if(payId == 8) {
// getInstallmentInfo();
// $("#showPeriodFee").hide();
// } else {
// $("#showPeriodFee").hide();
// }
	
	var dialogDiv = $("#payment-dialog-" + payId)[0];
	if (!!dialogDiv) {
		$.jdThickBox(
						{
							width : 550,
							height : 330,
							title : "请确认支付方式",
							_box : "payment_dialog",
							_con : "payment_dialog_box",
							_close : "payment_dialog_close",
							// source: $("#payment-dialog") // 当指定type时，页面元素容器
							source : '<div class="iloading" style="padding:20px;">正在加载中...<\/div>'
						},
						function() {
							$("#payment_dialog, #payment_dialog_box").css("height", "auto");

							var PDHTML = $("#payment-dialog-" + payId)[0].value;

							$("#payment_dialog_box").html(PDHTML);

							$("#dialog-enter-" + payId).bind("click",
									function() {
										// 清除其他选项的选中状态
										var itemList=$(".payment").find('.item');
										for(var i = 0 ;i < itemList.length ;i++){
											var item = itemList[i];
											var $item = $(item);
											$item.height(28);
											$item.find(".label").find("span").hide();
											$item.find(".label").find(".orange").show();
											$item.find(".sment-mark").css("display","none");
										}
// $("#otherSupportSkus-"+type).css("display","");
								       // alert( $("#supportPaySkus-" +
										// payId).val())
								        $("#supportPaySkus-" + payId).css("display", "inline-block");
								        $("#otherSupportSkus-"+payId).css("display","block");
								        
										      
								        edit_Shipment(payId);
									    jdThickBoxclose();
									    if($("#otherSupportSkus-"+payId)&&$("#otherSupportSkus-"+payId).length>0&&$("#otherSupportSkus-"+payId).find('span').size()>0){
											 selectedPay.height(56);
										 }else{
											 selectedPay.height(28);
										}
										YP_Sku_Flag=obj;
										$(obj).attr("checked","checked");
								});
							$("#dialog-cancel-" + payId).bind("click",
									function() {
								        
											var itemList=$(".payment").find('.item');
											for(var i = 0 ;i < itemList.length ;i++){
												var item = itemList[i];
												var $item = $(item);
												$item.height(28);
												$item.find(".label").find("span").hide();
												$item.find(".label").find(".orange").show();
												$item.find(".sment-mark").css("display","none");
											}
								
										jdThickBoxclose();
										$(obj).attr('checked',false);
										$(obj).parents(".item").removeClass('item-selected');
										$("#pay-method-4").attr('checked',true);
										$("#pay-method-4").parents(".item").addClass('item-selected');
										edit_Shipment(4);										
									});
						});
	}else{
		 edit_Shipment(payId);
	}

}

/**
 * 支付配送展开后的弹窗
 * 
 * @param id
 * @param skuDivId
 * @return
 */
function showShipmentSkuList(id, skuDivId){
	$("#" + skuDivId).removeClass("hide").show();
	var offset = $("#" + id).position();
	var x = offset.left + 60;
	$('#' + skuDivId).show().css({
		left: x,
		top: -2
	});
}

/**
 * 支付配送关闭后的配送的弹窗
 * 
 * @param id
 * @param SkuDiagId
 * @return
 */
function showShipmentSkuListOutside(id,SkuDiagId){
	if($("#payment-ship").find("#payment-window-1").html()!=null){
		$("#payment-ship").find("#payment-window-1").hide();
	}
	if($("#payment-ship").find("#payment-window-2").html()!=null){
		$("#payment-ship").find("#payment-window-2").hide();
	}
	if($("#payment-ship").find("#pick-show-sku-out-1").html()!=null){
		$("#payment-ship").find("#pick-show-sku-out-1").hide();
	}
	if($("#payment-ship").find("#pick-show-sku-out-2").html()!=null){
		$("#payment-ship").find("#pick-show-sku-out-2").hide();
	}
	if($("#payment-ship").find("#pick-show-sku-out-3").html()!=null){
		$("#payment-ship").find("#pick-show-sku-out-3").hide();
	}
	var topDistance=parseInt(id.substring(id.length-1,id.length)-1)*20;
    $("#payment-ship").find("#"+SkuDiagId).css({
		position:"absolute",
		top:(20+topDistance)+"px",
		left:130,
		display:"block"
    });
	
}

/**
 * 支付配送关闭后的支付方式的弹窗
 * 
 * @param id
 * @param SkuDiagId
 * @return
 */
function showPaymentSkuListOutside(id,SkuDiagId){
	if($("#payment-ship").find("#payment-window-1").html()!=null){
		$("#payment-ship").find("#payment-window-1").hide();
	}
	if($("#payment-ship").find("#payment-window-2").html()!=null){
		$("#payment-ship").find("#payment-window-2").hide();
	}
	if($("#payment-ship").find("#pick-show-sku-out-1").html()!=null){
		$("#payment-ship").find("#pick-show-sku-out-1").hide();
	}
	if($("#payment-ship").find("#pick-show-sku-out-2").html()!=null){
		$("#payment-ship").find("#pick-show-sku-out-2").hide();
	}
	if($("#payment-ship").find("#pick-show-sku-out-3").html()!=null){
		$("#payment-ship").find("#pick-show-sku-out-3").hide();
	}
	
	var distance=0;
	if($.trim($("#payment-ship").find("#pay-name-for-window-1").text()).length==5){
		distance=8;
	}else if($.trim($("#payment-ship").find("#pay-name-for-window-1").text()).length==7){
		distance=36;
	}else if($.trim($("#payment-ship").find("#pay-name-for-window-1").text()).length==8){
		distance=46;
	}
	if("pay-name-for-window-1"==id){
		$("#payment-ship").find("#payment-window-1").css({
			position:"absolute",
			top:-4,
			left:(165+distance)+"px",
			display:"block"
        });
	}else{
		if($.trim($("#payment-ship").find("#check-info-name").text())!=""){
			distance+=368;
		}
		$("#payment-ship").find("#payment-window-2").css({
			position:"absolute",
			top:-4,
			left:(225+distance)+"px",
			display:"block"
        });
	}
}


/**
 * 支付配送关闭后的配送方式商品弹窗
 * 
 * @param skuId
 * @return
 */
function removeShipmentSkuListOutside(skuId){
	$("#payment-ship").find("#"+skuId).hide();
}
/**
 * 支付配送关闭后的支付方式商品弹窗
 * 
 * @param skuId
 * @return
 */
function removePaymentSkuListOutside(skuId){
	$("#payment-ship").find("#"+skuId).hide();
}
/**
 * 支付配送展开后的商品弹窗
 * 
 * @param skuDivId
 * @return
 */
function removeShipmentSkuListInside(skuDivId){
	$("#" + skuDivId).hide();
}

/**
 * 运费弹窗
 * 
 * @return
 */
function showFreightSpan(){
	showFerightSopName();	
}

function removeFreightSpan(){
	 $("#transport").hide();
}

function changeBigItemDate(dateValue) {
	jQuery
			.ajax({
				type : "POST",
				dataType : "text",
				url : OrderAppConfig.DynamicDomain
						+ "/payAndShip/getInstallDates.action?payAndShipParam.bigSkuTimeId="
						+ dateValue,
				data : "",
				cache : false,
				success : function(dataResult, textStatus) {
					// 没有登录跳登录
					if (isUserNotLogin(dataResult)) {
						goToLogin();
						return;
					}
					$("#installOptionDiv").html(dataResult);
				},
				error : function(XMLHttpResponse) {
					alert("系统繁忙，请稍后再试！");
					return false;
				}
			});
}

/**
 * 获取支票信息
 * 
 * @param type
 * @return
 */
function getCheckInfo(type){
	
	// 2为支票, 如果选择的不为支票则清空支票信息div
	if(type != 2){
		$("#checkInfo").html("");
	}else{
		var param = addFlowTypeParam();
		$.ajax({
			type : "POST",
			dataType : "text",
			url : OrderAppConfig.AsyncDomain
					+ "/payAndShip/getShipmentCheckInfo.action",
			data : param,
			cache : false,
			success : function(dataResult, textStatus) {
				// 没有登录跳登录
				if (isUserNotLogin(dataResult)) {
					goToLogin();
					return;
				}
				$("#checkInfo").html(dataResult);
				$('.cheque-item :radio').bind('click',function(){
					$('.cheque-btn a').removeClass().addClass('btn-submit');
					$('.cheque-item').removeClass('current');
					$(this).parents('.cheque-item').addClass('current');
				});
			},
			error : function(XMLHttpResponse) {
				alert("系统繁忙，请稍后再试！");
				return false;
			}
		});
	}
}

/**
 * 跳转到公司转账
 * 
 * @return
 */
function goToCompanyTransfer(){
	// 设置当前选中支付方式为公司转账
	$("#pay-method-5").attr("checked",true);
	// 刷新配送方式
	edit_Shipment(5);
	$("#pay-method-1").parents(".item").removeClass("item-selected").height(28);
	$("#supportPaySkus-1").hide();
	$("#otherSupportSkus-1").hide();
	$("#pay-method-5").parents(".item").addClass("item-selected");
	
}
// 关闭支付与配送方式中的提示框
function closeTip(type) {
	$("#" + type).css("display", "none");
}
// 获取radio中选中的值
function getRadioValue(name) {
	var list = document.getElementsByName(name);
	for ( var i = 0; i < list.length; i++) {
		if (list[i].checked == true)
			return list[i].value;
	}
}
// 对选中的radio进行加亮
function lightRadio(name, id) {
	var list = document.getElementsByName(name);
	for ( var i = 0; i < list.length; i++) {
		if (list[i].checked == true) {
			$("#" + id + "-" + list[i].value).attr("class",
					"item item-selected");
		} else {
			$("#" + id + "-" + list[i].value).attr("class", "item");
		}
	}
}
// 显示支票的提示选项
function showCheckDiv(id) {
	if (id == "2") {
		$("#tip1").css("display", "block");
	} else {
		$("#tip1").css("display", "none");
	}
}

// 获取分期付款信息

var installmentInfo = "";
function getInstallmentInfo(){
jQuery.ajax({
    type:"POST",
    dataType:"json",
    async:false,
    url: OrderAppConfig.DynamicDomain + "/payAndShip/getInstallmentInfo.action?"+addFlowTypeParam()+"&rt="+ Math.random(),
    success:function (data) {
		if (data != null&& data.resultFlag == true) {
			// 如果分期信息为空则不显示
			if(data.installmentInfoList == null || data.installmentInfoList.length<=0 || !isShowInstalmentPlan()){
				$("#payRemark_8").hide();
			}else{
				installmentInfo = data;
				// 先清空再展现
				$("#banks").empty();
				$("#banks").append(TrimPath.processDOMTemplate("installment_banks", installmentInfo));
				$("#periods").append(TrimPath.processDOMTemplate("installment_periods", installmentInfo));
				var selectedBank = $("input[name='ins_banks'][checked]").val();
				changeBank(selectedBank, false);
				
				// 获取费率
				var rate = getRate(installmentInfo.selectedBankId, installmentInfo.selectedPeriod);
				changePeriod(installmentInfo.selectedBankId, installmentInfo.selectedPeriod, rate);
			}
        }
    
    }
});
}

// 获取费率
function getRate(bankId, period){
	var installmentInfoList = installmentInfo.installmentInfoList;
	var rate = 0;
    for(var i = 0; i < installmentInfoList.length; i++){
            var itemInfo = installmentInfoList[i];
            if(itemInfo.bankId == bankId){
                    for(var j = 0; j < itemInfo.installmentNumberInfo.length; j++){
                            var numItem = itemInfo.installmentNumberInfo[j];
                            if(numItem.installmentNumber == period){
                                    rate = numItem.rate;
                                    break;
                            }
                    }
            }
    }
    return rate;
}

// 修改银行
function changeBank(bankId, flag){
	// 先清空再展现
    $("#periods").empty();
    $("#periods").append(TrimPath.processDOMTemplate("installment_periods", installmentInfo));
    if(flag){
    	$("input[name='ins_periods']:first").attr("checked",true);
    	changePeriod();
    }
}
// 修改分期数
function changePeriod(){
	var bankId = $("input[name='ins_banks'][checked]").val();
	var period = $("input[name='ins_periods'][checked]").val();
	var rate = getRate(bankId, period);
	var totalMoney = $("#needPay").val();
	
	var add_money = (totalMoney * rate * period).toFixed(2);
	var all_money = (Number(totalMoney) + Number(add_money)).toFixed(2);
	var period_money = (all_money / period).toFixed(2);
	$("#all_money").text(all_money);
	$("#add_money").text(add_money);
	$("#order_money").text((totalMoney * 1).toFixed(2));
	$("#period_money").text(period_money);
	$("#result_period").text(period);
}

/** *****************************************************优惠券************************************************* */

var item = "item";
var itemToggleActive = "item toggle-active";
var orderCouponItem = "orderCouponItem";
var orderGiftCardItem = "orderGiftCardItem";
var orderGiftECardItem = "orderECardItem";
var orderCouponId = "orderCouponId";
var giftCardId = "giftCardId";
var giftECardId = "eCardId";
var toggleWrap = "toggle-wrap";
var toggleWrapHide = "toggle-wrap hide";
var BALANCE_PWD_TYPE = "balancePwdType";
var JING_PWD_TYPE = "jingPwdType";
var LPK_PWD_TYPE = "lpkPwdType";
var dongType = "dongType";
var jingType = "jingType";

function couponTip() {
	$(function() {
		$("#coupons .virtual-from").find(".coupon-scope")
				.each(
						function() {
							var $this = $(this), parent = $this
									.parents(".list"), dialog = parent
									.find(".coupon-tip");

							var left = $this.position().left
									+ ($this.width() / 2);

							dialog.css( {
								"left" : left + "px",
								"display" : "none"
							});

							$this.bind("mouseenter", function() {
								parent.css( {
									"overflow" : "visible",
									"z-index" : 5
								});
								dialog.css("display", "block");
							}).bind("mouseleave", function() {
								parent.css( {
									"overflow" : "hidden",
									"z-index" : 1
								});
								dialog.css("display", "none");
							});
						});
	});
}

/**
 * 优惠券查询
 */
function query_coupons() {
	var flag = $("#" + orderCouponId).css('display') == 'none'; // 判断隐藏还是显示优惠券列表
	if (flag) {// 显示优惠券列表
		var param = addFlowTypeParam();
		var url = OrderAppConfig.DynamicDomain + "/coupon/getCoupons.action";
		jQuery.ajax( {
			type : "POST",
			dataType : "text",
			url : url,
			data : param,
			async : true,
			cache : false,
			success : function(result) {
				if (isUserNotLogin(result)) {
					goToLogin();
					return;
				}
				if (isHasMessage(result)) {
					var message = getMessage(result);
					alert(message);
					return;
				} 
				checkPaymentPasswordSafe(JING_PWD_TYPE);
				$("#" + orderCouponId).css("display", "block");
				// 优惠券显示样式
				changeClassStyle(orderCouponId, toggleWrap);
				changeClassStyle(orderCouponItem, itemToggleActive);
				$("#" + OrderAppConfig.Module_Coupon).html(result);
				$("#coupons").Jtab({ compatible: true, event: "click" });
				entityCouponInputEventInit();// 实体券输入框初始化
				// 东券提示文字
				couponTip();

				// 使用优惠券时，如果礼品卡列表是展开的，则将其关闭
				// 隐藏礼品卡列表
				// 隐藏礼品卡样式
				$("#"+giftCardId).css('display', 'none');
				$("#"+giftECardId).css('display', 'none');
				changeClassStyle(giftCardId, toggleWrapHide);
				changeClassStyle(orderGiftCardItem, item);
				changeClassStyle(giftECardId, toggleWrapHide);
				changeClassStyle(orderGiftECardItem, item);
					
				isNeedPaymentPassword(); // 是否需要支付密码
			},
			error : function(XMLHttpResponse) {
				alert("系统繁忙，请稍后再试！");
			}
		});
	} else {
				// 隐藏优惠券列表
				$("#" + orderCouponId).css('display', 'none');
				// 优惠券隐藏样式
				changeClassStyle(orderCouponId, toggleWrapHide);
				changeClassStyle(orderCouponItem, item);
			}
}



/**
 * 检查余额安全，是否开启支付密码
 */
function checkBalancePwdResult(type) {
	var param = "couponParam.fundsPwdType=" + type;
	param = addFlowTypeParam(param);
	var url = OrderAppConfig.DynamicDomain + "/coupon/checkFundsPwdResult.action";
	jQuery.ajax( {
		type : "POST",
		dataType : "json",
		url : url,
		data : param,
		async : true,
		cache : false,
		success : function(flag) {
			if (isUserNotLogin(flag)) {
				goToLogin();
				return;
			}
			if (!flag) {
				cancelUsedBalance(); // 账户不安全，设置余额不可用
	}
}
	});
}

/**
 * 设置余额不可用
 */
function cancelUsedBalance() { 
	if ($("#selectOrderBalance").is(':checked')) {// 选中状态
		$("#selectOrderBalance").click(); // JS模拟取消
	}
	$("#selectOrderBalance").attr('disabled', true);
	if ($("#showOrderBalance").css("display") != "none") { 
		$("#safeVerciryPromptPart").show();
	}
}

/**
 * 选择京券
 */
function selectJing(obj, key, id) {
	var flag = (obj.checked) ? "1" : "0"; // 判断是否选中京券
	if (flag == 1) {// 选择京券，刷新优惠券列表
		useOrCancelCoupon(OrderAppConfig.DynamicDomain + "/coupon/useCoupon.action", key, obj, 1, jingType);
	} else {
		useOrCancelCoupon(OrderAppConfig.DynamicDomain + "/coupon/cancelCoupon.action", id, obj, 0, jingType);
	}

}


/**
 * 选择东券
 */
function selectDong(obj, key, id) {

	var flag = (obj.checked) ? "1" : "0"; // 判断是否选中东券
	if (flag == 1) {// 选择东券，刷新优惠券列表
		useOrCancelCoupon(OrderAppConfig.DynamicDomain + "/coupon/useCoupon.action", key, obj, 1, dongType);
	} else {
		useOrCancelCoupon(OrderAppConfig.DynamicDomain + "/coupon/cancelCoupon.action", id, obj, 0, dongType);
	}
}

/**
 * 添加实体券
 * 
 * @param obj
 */
function addEntityCoupon(obj) {

	if ($('#couponKeyPressFirst').val() == ""
			|| $('#couponKeyPressSecond').val() == ""
			|| $('#couponKeyPressThrid').val() == ""
			|| $('#couponKeyPressFourth').val() == "") {
		alert("请输入优惠券密码");
		return;
	}
	var key = $("#couponKeyPressFirst").val() + "-"
			+ $("#couponKeyPressSecond").val() + "-"
			+ $("#couponKeyPressThrid").val() + "-"
			+ $("#couponKeyPressFourth").val();
	// TODO
	$("input[id^='couponKeyPress']").each(function() {
		$(this).val("");
	});
	useOrCancelCoupon(OrderAppConfig.DynamicDomain + "/coupon/useCoupon.action", key,
			obj, 1, "");
}

function removeShiTiCoupon(id) {
	useOrCancelCoupon(OrderAppConfig.DynamicDomain + "/coupon/cancelCoupon.action",
			id, null, 0, "");
}

var safeFlag = true;
/**
 * 使用或者取消优惠券 1：使用优惠券，0：取消优惠券
 */
function useOrCancelCoupon(url, id, obj, flag, couponType) {
	var param = "";
	if (flag == 1) {// 使用券传的是couponKey
		param += "couponParam.couponKey=" + id;
	} else {// 取消券使用的是couponId
		param += "couponParam.couponId=" + id;
	}
	param = addFlowTypeParam(param);
	jQuery.ajax( {
				type : "POST",
				dataType : "text",
				url : url,
				data : param,
				async : true,
				cache : false,
				success : function(result) {
					if (isUserNotLogin(result)) {
						goToLogin();
						return;
					}
					if (isHasMessage(result)) {
						var message = getMessage(result);
						alert(message);
						if(obj.checked) {
							obj.checked=false;
						}
						return;
					}
					checkPaymentPasswordSafe(JING_PWD_TYPE,0);// 用户安全，检查是否开启支付密码
					changeClassStyle(orderCouponId, toggleWrap);
					changeClassStyle(orderCouponItem, itemToggleActive);
					$("#" + OrderAppConfig.Module_Coupon).html(result);
					$("#coupons").Jtab({ compatible: true, event: "click" });
					// 刷新显示：优惠券优惠金额，礼品卡优惠金额，余额优惠金额，实际应付总金额
					useCancelEditJdBean(0,null,true);
					flushOrderPriceByCoupon(); // 改变优惠券状态
					checkCouponWaste();// 检查优惠券是否存在浪费情况
					isNeedPaymentPassword(); // 是否需要支付密码
		}
	});

}

/**
 * 检查优惠券是否存在浪费情况
 */
function checkCouponWaste(){
	if($("#hidden_wasteFlag").val() == "true"){
		alert("您的京券金额多于应付总额，京券差额不予退还哦~");
	}
}

/**
 * 使用优惠券、礼品卡时检查是否开启支付密码
 * 
 * @param type
 */
function checkPaymentPasswordSafe(type,giftCardType){
	
	var url = OrderAppConfig.DynamicDomain + "/coupon/checkFundsPwdResult.action";
	var param = "couponParam.fundsPwdType=" + type;
	param = addFlowTypeParam(param);
	jQuery.ajax( {
				type : "POST",
				dataType : "json",
				url : url,
				data : param,
				async : true,
				cache : false,
				success : function(result) {

					if (isUserNotLogin(result)) {
						goToLogin();
						return;
					}
					if (isHasMessage(result)) {
						var message = getMessage(result);
						alert(message);
						if(obj.checked) {
							obj.checked=false;
						}
						return;
					}
					if(!result){
						if(type == JING_PWD_TYPE){
							cancelAllUsedCoupons();
							return;
						}else if(type == LPK_PWD_TYPE){
							cancelAllUsedGiftCards(giftCardType);
							return;
						}
						
					}
					
		}
	});
}


/**
 * 刷新订单价格
 * 
 * @param orderPrice
 *            是一个json对象
 */
function flushOrderPrice(orderPrice,isFlushSkuList) {
	if(orderPrice == null) {
		return ;
	}
	
	// 修改运费
	if(orderPrice.freight != null) {
		if(orderPrice.freight>0){
			$("#freightPriceId").html("<font color='#FF6600'> ￥" + orderPrice.freight.toFixed(2)+"</font>");
			$("#freightSpan").html("<font color='#005EA7'>运费：</font>");
		}else{
			$("#freightPriceId").html("<font color='#000000'> ￥" + orderPrice.freight.toFixed(2)+"</font>");
			$("#freightSpan").html("<font color='#000000'>运费：</font>");
		}
	}
	
	// 修改优惠券结算信息
	if(orderPrice.couponDiscount != null) {
		$("#couponPriceId").text("-￥" + orderPrice.couponDiscount.toFixed(2));
		if(orderPrice.couponDiscount == 0) {
			$("#showCouponPrice").css("display", "none");
		} else {
			$("#showCouponPrice").css("display", "block");
		}
	} else {
		$("#couponPriceId").css("display", "none");
	}
	
	// 修改礼品卡结算信息
	if(orderPrice.giftCardDiscount != null) {
		$("#giftCardPriceId").text("-￥" + orderPrice.giftCardDiscount.toFixed(2));
		if(orderPrice.giftCardDiscount == 0) {
			$("#showGiftCardPrice").css("display", "none");
		} else {
			$("#showGiftCardPrice").css("display", "block");
		}
	} else {
		$("#showGiftCardPrice").css("display", "none");
	}
	
	// 修改余额
	if(orderPrice.usedBalance != null) {
		$("#usedBalanceId").text("-￥" + orderPrice.usedBalance.toFixed(2));
		if(orderPrice.usedBalance == 0) {
			$("#showUsedOrderBalance").css("display", "none");
		} else {
			$("#showUsedOrderBalance").css("display", "block");
		}
	} else {
		$("#showUsedOrderBalance").css("display", "none");
	}
	// 修改京豆
	if(orderPrice.usedJdBeanDiscout != null) {
		$("#usedJdBeanId").text("-￥" + orderPrice.usedJdBeanDiscout.toFixed(2));
		if(orderPrice.usedJdBeanDiscout == 0) {
			$("#showUsedJdBean").css("display", "none");
		} else {
			$("#showUsedJdBean").css("display", "block");
		}
	} else {
		$("#showUsedJdBean").css("display", "none");
	}
	
	// 修改应付余额
	if(orderPrice.payPrice != null) {
		var curPrice = orderPrice.promotionPrice - orderPrice.cashBack;
		var prePrice = $("#warePriceId").attr("v") - $("#cachBackId").attr("v");
		if(curPrice > prePrice){
			$("#changeAreaAndPrice").show();
		}else{
			$("#changeAreaAndPrice").hide();
		}
		$("#warePriceId").attr("v",orderPrice.promotionPrice);
		$("#cachBackId").attr("v",orderPrice.cashBack);
		
		$("#payPriceId").text("￥" + orderPrice.payPrice.toFixed(2));
		$("#sumPayPriceId").text("￥" + orderPrice.payPrice.toFixed(2));
	} 
	
	// 商品总金额
	if(orderPrice.skuNum != null && orderPrice.skuNum > 0) {
		$("#span-skuNum").text(orderPrice.skuNum);
	}
	if(orderPrice.promotionPrice != null) {
		$("#warePriceId").text("￥" + orderPrice.promotionPrice.toFixed(2));
	}
	if(isFlushSkuList){	
		loadSkuList();
	}
}


function flushOrderPriceByCoupon(){
	// 修改运费
	if($("#hiddenFreight_coupon")[0]) {
		$("#freightPriceId").text(" ￥" + $("#hiddenFreight_coupon").val());
	}
	
	// 修改优惠券结算信息
	if($("#hiddenCouponDiscount")[0]) {
		$("#couponPriceId").text("-￥" + $("#hiddenCouponDiscount").val());
		if($("#hiddenCouponDiscount").val() == 0) {
			$("#showCouponPrice").css("display", "none");
		} else {
			$("#showCouponPrice").css("display", "block");
		}
	} else {
		$("#couponPriceId").css("display", "none");
	}
	
	// 修改礼品卡结算信息
	if($("#hiddenGiftCardDiscount_coupon")[0]) {
		$("#giftCardPriceId").text("-￥" + $("#hiddenGiftCardDiscount_coupon").val());
		if($("#hiddenGiftCardDiscount_coupon").val() == 0) {
			$("#showGiftCardPrice").css("display", "none");
		} else {
			$("#showGiftCardPrice").css("display", "block");
		}
	} else {
		$("#showGiftCardPrice").css("display", "none");
	}
	
	// 修改余额
	if($("#hiddenUsedBalance_coupon")[0]) {
		$("#usedBalanceId").text("-￥" + $("#hiddenUsedBalance_coupon").val());
		if($("#hiddenUsedBalance_coupon").val() == 0) {
			$("#showUsedOrderBalance").css("display", "none");
		} else {
			$("#showUsedOrderBalance").css("display", "block");
		}
	} else {
		$("#showUsedOrderBalance").css("display", "none");
	}
	
	// 修改应付余额
	if($("#hiddenPayPrice_coupon")[0]) {
		$("#payPriceId").text("￥" + $("#hiddenPayPrice_coupon").val());
		$("#sumPayPriceId").text("￥" + $("#hiddenPayPrice_coupon").val());
	} 
	loadSkuList();
}

function changeOrderPrice(result) {
	$("#safeLpkPart").show(); // 显示开启支付密码提示框
	$("#lpk_count").text("0");// 礼品卡数量
	$("#lpk_discount").text("0.00"); // 礼品卡列表栏金额
	$("#giftCardPriceId").text("-￥0.00"); // 商品金额栏的礼品卡金额
	$("#payPriceId").text("￥" + result.factPrice.toFixed(2));// 实际应付金额
	$("#sumPayPriceId").text("￥" + result.factPrice.toFixed(2));
	$("#usedBalanceId").text("-￥" + result.usedBalance.toFixed(2));

	// 余额显示变化
	if (result.usedBalanceFlag) {
		$("#selectOrderBalance").attr("checked", true);
		$("#showUsedOrderBalance").show();
		checkBalancePwdResult(BALANCE_PWD_TYPE);
	} else {
		$("#selectOrderBalance").attr("checked", false);
		$("#showUsedOrderBalance").hide();
	}
	loadSkuList();
}


function changeGiftCardState(result) {
	$("#lpk_count").text(result.giftCardNum);
	$("#lpk_discount").text(result.giftCardPrice.toFixed(2));
	$("input[id^='lpkItem_']").each(function() {
		var cardId = $(this).attr("id").split("_")[1];
		$(this).attr("checked", false); // 是否勾选
			$("#lpkCurUsed_" + cardId).html("0.00");
		});
	if (result.giftCardInfoViewList != null
			&& result.giftCardInfoViewList.length > 0) {
		$.each(result.giftCardInfoViewList, function(i, giftCardInfo) { // 重置礼品卡列表
					$("#lpkItem_" + giftCardInfo.id).attr("checked", true); // 是否勾选
				$("#lpkCurUsed_" + giftCardInfo.id).text(
						giftCardInfo.curUsedMoney.toFixed(2));
				$("#lpkBalance_" + giftCardInfo.id).text(
						giftCardInfo.balance.toFixed(2));
			});
	}
}

/**
 * 填充结算页面余额相关的金额信息
 */
function changeBalanceState(result) {
	$("#payPriceId").text("￥" + result.payPrice.toFixed(2));// 实际应付金额
	$("#sumPayPriceId").text("￥" + result.payPrice.toFixed(2));// 实际应付金额
	$("#canUsedBalanceId").text(
			"使用余额（账户当前余额：" + result.leaveBalance.toFixed(2) + "元）"); // 剩余可用余额
	$("#usedBalanceId").text("-￥" + result.usedBalance.toFixed(2)); // 使用的余额
	$("#selectOrderBalance").attr("checked", result.checked);
	if (result.usedBalance > 0) {
		$("#showUsedOrderBalance").show();
	} else {
		$("#showUsedOrderBalance").hide();
	}
	loadSkuList();

}

/**
 * 重置所有优惠券不可用
 */
function cancelAllUsedCoupons() {

	$("input[id^='coupon_']").each(function() {
		$(this).attr("disabled",true);
		if ($(this).is(':checked')) {
			return false;
		}
	});
	var param = addFlowTypeParam();
	var url = OrderAppConfig.DynamicDomain + "/coupon/cancelAllUsedCoupons.action";
	jQuery.ajax( {
				type : "POST",
				dataType : "text",
				url : url,
				data : param,
				async : true,
				cache : false,
				success : function(result) {
					if (isUserNotLogin(result)) {
						goToLogin();
						return;
					}
					if (isHasMessage(result)) {
						var message = getMessage(result);
						alert(message);
						return;
					} 
					$("#" + OrderAppConfig.Module_Coupon).html(result);
					$("#safeJingPart").show();
					$("input[type=checkbox][id^='coupon_']").each(function() {
						$(this).attr("disabled",true);
					});
					$("#coupons").Jtab({ compatible: true, event: "click" }); 
					flushOrderPriceByCoupon(); 
				}
			});
}

/**
 * 是否需要支付密码
 */
function isNeedPaymentPassword() {
	$("#txt_paypassword").val("");
	var param = addFlowTypeParam();
	var url = OrderAppConfig.DynamicDomain + "/order/isNeedPaymentPassword.action";
	jQuery.ajax( {
		type : "POST",
		dataType : "json",
		url : url,
		data : param,
		async : true,
		cache : false,
		success : function(flag) {
			if (isUserNotLogin(flag)) {
				goToLogin();
				return;
			}
			if (isHasMessage(flag)) {
				var message = getMessage(flag);
				alert(message);
				return;
			} else {
				if (flag) {
					$("#paypasswordPanel").show();
				} else {
					$("#paypasswordPanel").hide();
				}
			}
		}
	});

}

/**
 * 改变优惠券、礼品卡样式
 */
function changeClassStyle(classId, classStyle) {
	$("#" + classId).removeClass();
	$("#" + classId).addClass(classStyle);
}

/**
 * 是否显示 输入实体券密码框
 */
function showEntityPanel() {
	if ($("#entityPanel")[0]) {
		if ($("#entityPanel").css("display") == "none") {
			$("#entityPanel").css("display", "block");
		} else {
			$("#entityPanel").css("display", "none");
		}
	}
}

/** ***************************************************礼品卡******************************************** */

/**
 * 礼品卡输入事件
 */
function lipinkaInputEventInit(giftCardType) {
	
	var orderGiftCardModule = OrderAppConfig.Module_GiftCard;
	if(giftCardType == 3){
		orderGiftCardModule = OrderAppConfig.Module_GiftECard;
	}
	
	$("#"+ orderGiftCardModule + " .textbox").keyup(function() {
		var $this = $(this);
		$this.val($this.val().replace(/[^a-zA-Z0-9]/g, '').toUpperCase());
		$this.val($this.val().replace('O', '0'));
		if ($this.val().length == 4 && $this.attr('id') != 'lpkKeyPressForth-'+giftCardType) {
			$this.next().next().focus();
		}
	});
}

/**
 * 实体优惠券输入事件 FIXME 对实体券输入没有生效，事件绑定错误。没有线上bug提出来，所以是否需要修改，等上级指示。 DYY
 */
function entityCouponInputEventInit() {
	$("#coupons .textbox").keyup(
			function() {
				var $this = $(this);
				$this.val($this.val().replace(/[^a-zA-Z0-9]/g, '')
						.toUpperCase());
				$this.val($this.val().replace('O', '0'));
				if ($this.val().length == 4
						&& $this.attr('id') != 'couponKeyPressFourth') {
					$this.next().next().focus();
				}
			});
}

function query_giftCards(giftCardType) {
	
	var giftCardProxyId = giftCardId;
	var orderGiftCardProxyItem = orderGiftCardItem;
	var orderGiftCardModule = OrderAppConfig.Module_GiftCard;
	if(giftCardType == 3){
		giftCardProxyId = giftECardId;
		orderGiftCardProxyItem = orderGiftECardItem;
		orderGiftCardModule = OrderAppConfig.Module_GiftECard;
	}
	
	var flag = $("#" + giftCardProxyId).attr('class') == "toggle-wrap hide";
	if (flag) {// 显示礼品卡列表
		var param = "giftCardParam.giftCardType=" + giftCardType;
		param = addFlowTypeParam(param);
		var url = OrderAppConfig.DynamicDomain + "/giftCard/getGiftCardList.action";
		jQuery.ajax( {
			type : "POST",
			dataType : "text",
			url : url,
			data : param,
			async : true,
			cache : false,
			success : function(result) {
				if (isUserNotLogin(result)) {
					goToLogin();
					return;
				}
				if (isHasMessage(result)) {
					var message = getMessage(result);
					alert(message);
					return;
				} else {
					checkPaymentPasswordSafe(LPK_PWD_TYPE,giftCardType);
					// 显示礼品卡样式
					$("#"+giftCardProxyId).css('display', 'block');
					changeClassStyle(giftCardProxyId, toggleWrap);
					
					changeClassStyle(orderGiftCardProxyItem, itemToggleActive);
					$("#"+giftCardProxyId +" " + "#" + orderGiftCardModule).html(result);
					lipinkaInputEventInit(giftCardType); // 礼品卡输入KEY限制
		}

	},
	error : function(XMLHttpResponse) {
		alert("系统繁忙，请稍后再试！");
	}
		});
		
			// 使用礼品卡时，关闭优惠券列表
			// 隐藏优惠券列表
			couponTip();
			$("#" + orderCouponId).css('display', 'none');
			// 优惠券隐藏样式
			changeClassStyle(giftCardProxyId, toggleWrapHide);
			changeClassStyle(orderGiftCardProxyItem, item);
	} else {
		// 隐藏礼品卡列表
		// 隐藏礼品卡样式
		$("#" + giftCardProxyId).css("display","none");
		changeClassStyle(giftCardProxyId, toggleWrapHide);
		changeClassStyle(orderGiftCardProxyItem, item);
	}

}

/**
 * 检查礼品卡安 如果使用礼品卡，必须开启支付密码
 */
function checkUsedGiftCardsPwd(type,giftCardType) {
	var url = OrderAppConfig.DynamicDomain + "/coupon/checkFundsPwdResult.action";
	var param = "couponParam.fundsPwdType=" + type;
	param = addFlowTypeParam(param);
	jQuery.ajax( {
		type : "POST",
		dataType : "json",
		url : url,
		data : param,
		async : true,
		cache : false,
		success : function(flag) {
			if (isUserNotLogin(flag)) {
				goToLogin();
				return;
			}
			if (!flag) {
				// 账户不安全，设置所有礼品卡不可用
		cancelAllUsedGiftCards(giftCardType);
	}
}
	});
}

/**
 * 选择礼品卡
 * 
 * @param obj
 * @param bindFlag
 * @param key
 * @param id
 */
function selectGiftCard(obj, key, id, giftCardType) {
	var checked = obj.checked;
	if (checked) {
		useOrCancelGiftCard(OrderAppConfig.DynamicDomain
				+ "/giftCard/useGiftCard.action", key, obj, checked, false, giftCardType);
	} else {
		useOrCancelGiftCard(OrderAppConfig.DynamicDomain
				+ "/giftCard/cancelGiftCard.action", id, obj, checked, false, giftCardType);
	}

}

/**
 * 添加礼品卡
 */
function addGiftCard(obj,giftCardType) {
	if ($("#lpkKeyPressFirst"+"-"+giftCardType).val() == ""
			|| $("#lpkKeyPressSecond"+"-"+giftCardType).val() == ""
			|| $("#lpkKeyPressThird"+"-"+giftCardType).val() == ""
			|| $("#lpkKeyPressForth"+"-"+giftCardType).val() == "") {
		
		if(giftCardType == 3){
			alert("请输入京东E卡密码");
		}else{
			alert("请输入京东卡密码");
		}
		return;
	}
	var key = $("#lpkKeyPressFirst"+"-"+giftCardType).val() + "-"
			+ $("#lpkKeyPressSecond"+"-"+giftCardType).val() + "-"
			+ $("#lpkKeyPressThird"+"-"+giftCardType).val() + "-" + $("#lpkKeyPressForth"+"-"+giftCardType).val();
	useOrCancelGiftCard(OrderAppConfig.DynamicDomain
			+ "/giftCard/useMaterialGiftCard.action", key, obj, false, true, giftCardType);
}

/**
 * 使用或者取消礼品卡
 * 
 * @param url
 * @param key
 * @param obj
 * @param checked
 * @param bindFlag
 */
function useOrCancelGiftCard(url, key, obj, checked, bindFlag, giftCardType) {
	var param = "giftCardParam.giftCardType=" + giftCardType + "&giftCardKey=" + key + "&fundsPwdtype="+LPK_PWD_TYPE;
	var orderGiftCardModule = OrderAppConfig.Module_GiftCard;
	var giftCardProxyId = giftCardId;
	var orderGiftCardProxyItem = orderGiftCardItem;
	var giftCardTypeName = "京东卡";
	if(giftCardType == 3){
		giftCardProxyId = giftECardId;
		orderGiftCardProxyItem = orderGiftECardItem;
		orderGiftCardModule = OrderAppConfig.Module_GiftECard;
		giftCardTypeName = "京东E卡";
	}
	param = addFlowTypeParam(param);
	jQuery.ajax( {
		type : "POST",
		dataType : "text",
		url : url,
		data : param,
		async : true,
		cache : false,
		success : function(result) {
			// 没有登录跳登录
			if (isUserNotLogin(result)) {
				goToLogin();
				return;
			}
			if(result==false || result=="false"){
				// 隐藏礼品卡列表
				// 隐藏礼品卡样式
				$("#" + giftCardProxyId).css("display","none");
				changeClassStyle(giftCardProxyId, toggleWrapHide);
				changeClassStyle(orderGiftCardProxyItem, item);
				return;
			}
			if (isHasMessage(result)) {
				var message = getMessage(result);
				alert(message);
				if (checked == true) {
					$(obj).attr("checked", false);
				} else {
					$(obj).attr("checked", true);
				}
				return;
			}
			checkPaymentPasswordSafe(LPK_PWD_TYPE,giftCardType);
			$("#" + orderGiftCardModule).html(result);
			changeOrderInfoPrice(giftCardType);
			isNeedPaymentPassword();// 是否需要支付密码
			if(bindFlag && ($("#hiddenBindFlag"+"-"+giftCardType).val() == "true")){
				
			  if (confirm("密码正确！是否将该"+giftCardTypeName+"绑定至当前账号？")) {
                  bindGiftCard(key,giftCardType);   // 异步判断是否绑定成功
              }
			}
			lipinkaInputEventInit(giftCardType); // 礼品卡输入KEY限制
		}
	});
}

function changeOrderInfoPrice(giftCardType) {
	// 已优惠的礼品卡金额
	if ($("#hiddenGiftCardDiscount"+"-"+giftCardType)[0]) {
		$("#giftCardPriceId").text("-￥" + $("#hiddenGiftCardDiscount"+"-"+giftCardType).val());
		if ($("#hiddenGiftCardDiscount"+"-"+giftCardType).val() > 0) {
			$("#showGiftCardPrice").show();
		} else {
			$("#showGiftCardPrice").hide();
		}
	}

	// 余额
	if ($("#hiddenUsedBalance"+"-"+giftCardType)[0]) {
		$("#usedBalanceId").text("-￥" + $("#hiddenUsedBalance"+"-"+giftCardType).val());
		if ($("#hiddenUsedBalance"+"-"+giftCardType).val() > 0) {
			$("#showUsedOrderBalance").show();
		} else {
			$("#showUsedOrderBalance").hide();
		}
	}

	// 实际应付金额
	if ($("#hiddenPayPrice"+"-"+giftCardType)[0]) {
		$("#payPriceId").text("￥" + $("#hiddenPayPrice"+"-"+giftCardType).val());
		$("#sumPayPriceId").text("￥" + $("#hiddenPayPrice"+"-"+giftCardType).val());
	}
	loadSkuList();
}
/**
 * 绑定礼品卡
 */
function bindGiftCard(key, giftCardType) {
	var param = "giftCardParam.giftCardType=" + giftCardType + "&giftCardKey=" + key;
	var url = OrderAppConfig.DynamicDomain + "/giftCard/bindGiftCard.action";
	
	var orderGiftCardModule = OrderAppConfig.Module_GiftCard;
	if(giftCardType == 3){
		orderGiftCardModule = OrderAppConfig.Module_GiftECard;
	}
	
	param = addFlowTypeParam(param);
	jQuery.ajax( {
		type : "POST",
		dataType : "text",
		url : url,
		data : param,
		async : true,
		cache : false,
		success : function(result) {
			if (isUserNotLogin(result)) {
				goToLogin();
				return;
			}
			if (isHasMessage(result)) {
				var message = getMessage(result);
				alert(message);
				return;
			} 
			$("#" + orderGiftCardModule).html(result);
			isNeedPaymentPassword();// 是否需要支付密码
			lipinkaInputEventInit(giftCardType); // 礼品卡输入KEY限制
		}
	});
}

/**
 * 重置所有礼品卡不可用
 */
function cancelAllUsedGiftCards(giftCardType) {

	$("input[type=checkbox][id^='lpkItem_']").each(function() {
		$(this).attr("disabled",true);
		if ($(this).is(":checked")) {
		}
	});
	
	var orderGiftCardModule = OrderAppConfig.Module_GiftCard;
	if(giftCardType == 3){
		orderGiftCardModule = OrderAppConfig.Module_GiftECard;
	}
	
	
	// 发请求取消所有礼品卡的使用
    var param = "giftCardParam.giftCardType=" + giftCardType;	param = addFlowTypeParam(param);
	var url = OrderAppConfig.DynamicDomain + "/giftCard/cancelAllGiftCard.action";
	jQuery.ajax( {
		type : "POST",
		dataType : "text",
		url : url,
		data : param,
		async : true,
		cache : false,
		success : function(result) {
			if (isUserNotLogin(result)) {
				goToLogin();
				return;
			}
			if (isHasMessage(result)) {
				var message = getMessage(result);
				alert(message);
				$("input[type=checkbox][id^='lpkItem_']").attr(
						"disabled", false);
				return;
			} 
			$("#" + orderGiftCardModule)
					.html(result);
			$("input[type=checkbox][id^='lpkItem_']").each(function() {
				$(this).attr("disabled",true);
			});
			$("#safeLpkPart"+"-"+giftCardType).show(); 
			changeOrderInfoPrice(giftCardType);
			lipinkaInputEventInit(giftCardType); // 礼品卡输入KEY限制
		}
	});
}

	/** ***************************************************余额******************************************** */

	function useOrCancelBalance(obj) {
		var url = "";
		var flag = $(obj).is(':checked') ? 1 : 0;

		if (flag) {
			url = OrderAppConfig.DynamicDomain + "/balance/useBalance.action";
		} else {
			url = OrderAppConfig.DynamicDomain + "/balance/cancelBalance.action";
		}
		var param = "fundsPwdType=" + BALANCE_PWD_TYPE;
		param = addFlowTypeParam(param);
		jQuery.ajax( {
			type : "POST",
			dataType : "json",
			url : url,
			data : param,
			async : true,
			cache : false,
			success : function(result) {
				if (isUserNotLogin(result)) {
					goToLogin();
					return;
				}
				if (isHasMessage(result)) {
					var message = getMessage(result);
					alert(message);
					if (flag == 1) {
						$(obj).attr("checked", false);
					} else {
						$(obj).attr("checked", true);
					}
					return;
				} else if (result != null && result == false) { 
					// 开启支付密码接口失败
					cancelUsedBalance();
				} else if (result != null && result != false) {
					changeBalanceState(result);
					isNeedPaymentPassword();// 是否需要支付密码
					if ($("#selectOrderBalance").is(":checked")) { // 余额被使用时，验证是否安全
						checkBalancePwdResult(BALANCE_PWD_TYPE);
					}
				}
	}
		});
	}

	// ****************************************************订单页面相关****************************************************************
	
	/**
	 * 加载页面异步相关信息
	 */
	function loadOrderExt() {
//		var actionUrl = OrderAppConfig.AsyncDomain
//		+ "/obtainOrderExt.action";
//		var param = addFlowTypeParam();
//		jQuery.ajax( {
//			type : "POST",
//			dataType : "json",
//			url : actionUrl,
//			data : param,
//			cache : false,
//			success : function(dataResult, textStatus) {
//				// 没有登录跳登录
//			if (isUserNotLogin(dataResult)) {
//				goToLogin();
//				return;
//			}
//			// 服务器返回异常处理,如果有消息div则放入,没有则弹出
//			if (isHasMessage(dataResult)) {
//				var message = getMessage(dataResult);
//				alert(message);
//			}
//			
//			// =================1.刷新商品库存状态==============
//			var states = dataResult.skuStockInfos;
//			// 成功后如果有divID直接放入div，没有则返回结果
//			loadSkuListStockData(states);
//			
//			// =================2.加载验证码==============
//// if(dataResult.showCheckCode){
//// refreshCheckCode(dataResult.encryptClientInfo);
//// }
//			// ===============3.加载订单备注==============
//			if(dataResult.showOrderRemark){
//				showOrderRemark();
//			}
//
//			// ===============4.是否需要支付密码==============
//			if (dataResult.needPayPwd) {
//				$("#paypasswordPanel").show();
//			} else {
//				$("#paypasswordPanel").hide();
//			} 
//			
//			// ==================5.加载余额==================
//			if(dataResult.balance.success){
//				var useFlag = dataResult.balance.checked;
//				$("#selectOrderBalance").attr("checked",useFlag);
//				$("#canUsedBalanceId").text("使用余额（账户当前余额：" + dataResult.balance.leavyMoney.toFixed(2) + "元）");
//				if(dataResult.balance.leavyMoney > 0){
//					$("#showOrderBalance").css("display", "block");
//				}else{
//					$("#showOrderBalance").css("display", "none");
//				}
//				// 验证余额是否开启支付密码
//				if(dataResult.showOpenPayPwd){
//					cancelUsedBalance();
//				}
//			}
//			// 京豆优惠购是否足额和京豆优惠购商品id
//			var showOpenPayPwd = dataResult.showOpenPayPwd;
//			var existsJdbeanPromotion = dataResult.existsJdbeanPromotion;
//			var checkJdbeanPromotion = dataResult.checkJdbeanPromotion;
//			// 成功后如果有divID直接放入div，没有则返回结果
//			checkShowOpenPwd(showOpenPayPwd,existsJdbeanPromotion,checkJdbeanPromotion);
//			
//		},
//		error : function(XMLHttpResponse) {
//			
//		}
//		});
	}
	
	/**
	 * 加载商品清单库存状态数据
	 */
	function loadSkuListStockData(states){
		$(".p-inventory").each(function() {
			var skuId = $(this).attr("skuId");
			if (states != null && states.length > 0) {
				for ( var i = 0; i < states.length; i++) {
					var state = states[i];
					if (state.skuId == skuId) {
						var info;
						switch (state.stockStateId) {
						case 33:
							info = "有货";
							break;
						case 34:
							info = "<span style='color:#e4393c'>无货</span>";
							break;
						case 36:
							info = "预订";
							break;
						case 39:
							info = "有货";
							break;
						case 40:
							info = "有货";
							break;
						default:
							info = "<span style='color:#e4393c'>无货</span>";
						}
						$(this).html(info);
					}
				}
			} else {
				$(this).html("有货");
			}
		});
	}
	
	/**
	 * 异步加载商品清单库存状态
	 */
	function loadSkuListStock() {
		var actionUrl = OrderAppConfig.AsyncDomain
				+ "/loadSkuListStock.action";
		var param = addFlowTypeParam();
		jQuery.ajax( {
			type : "POST",
			dataType : "json",
			url : actionUrl,
			data : param,
			cache : false,
			success : function(dataResult, textStatus) {
				// 没有登录跳登录
			if (isUserNotLogin(dataResult)) {
				goToLogin();
				return;
			}
			// 服务器返回异常处理,如果有消息div则放入,没有则弹出
			if (isHasMessage(dataResult)) {
				var message = getMessage(dataResult);
				alert(message);
			}
			var states = dataResult;
			// 成功后如果有divID直接放入div，没有则返回结果
			loadSkuListStockData(states);
		},
		error : function(XMLHttpResponse) {
		}
		});
	}
	
	function loadSkuList(){
		var actionUrl = OrderAppConfig.AsyncDomain + "/loadSkuList.action";
		var param = addFlowTypeParam();
       jQuery.ajax( {
	    type : "POST",
	    dataType : "json",
	    url : actionUrl,
	    data : param,
	    cache : false,
	    success : function(dataResult, textStatus) {
		// 没有登录跳登录
	    if (isUserNotLogin(dataResult)) {
		goToLogin();
		return;
	   }
	   // 服务器返回异常处理,如果有消息div则放入,没有则弹出
	   if (isHasMessage(dataResult)) {
		  var message = getMessage(dataResult);
		  alert(message);
	   }
	   if(dataResult.success){
		  $("#span-skulist").html(dataResult.skuList);
		  loadSkuListStock();
		  showTangJiuSkuIcon();// 加载Icon
	   }
   },
   error : function(XMLHttpResponse) {
   }
   });	
   }

	/**
	 * 添加备注
	 */
	function selectRemark(obj) {
		if ($("#remarkId").attr("class") == toggleWrapHide) {
			$("#remarkId").removeClass();
			$("#remarkId").addClass("toggle-wrap");
			changeClassStyle("orderRemarkItem", itemToggleActive);
			if ($("#remarkText").val() == "") {
				$("#remarkText").val("限15个字");

			}

		} else {
			$("#remarkId").removeClass();
			$("#remarkId").addClass("toggle-wrap hide");
			changeClassStyle("orderRemarkItem", item);
		}
	}
	
	/**
	 * 订单页面余额
	 */
	function loadOrderBalance(){
		if(!$("#selectOrderBalance").is(":checked")){
			var actionUrl = OrderAppConfig.AsyncDomain + "/isShowOrderBalance.action";
			var param = addFlowTypeParam();
			jQuery.ajax( {
				type : "POST",
				dataType : "json",
				url : actionUrl,
				data : param,
				cache : false,
				success : function(result, textStatus) {
					// 没有登录跳登录
					if (isUserNotLogin(result)) {
						goToLogin();
						return;
					}
					if(result.resultFlag){
						var useFlag = result.checked;
						$("#selectOrderBalance").attr("checked",useFlag);
						$("#canUsedBalanceId").text("使用余额（账户当前余额：" + result.leavyMoney.toFixed(2) + "元）");
						if(result.leavyMoney > 0){
							$("#showOrderBalance").css("display", "block");
						}else{
							$("#showOrderBalance").css("display", "none");
						}
						checkBalancePwdResult(BALANCE_PWD_TYPE);// 验证余额是否开启支付密码
					}
					
				},
				error : function(XMLHttpResponse) {
				}
			});
		}
	}

	/**
	 * 显示订单备注
	 */
	function showOrderRemark(){
		var remarkTemplate = "<div class='toggle-title'>"
			+ "<a class='toggler' href='javascript:void(0)' onclick='selectRemark(this)'><b></b>添加订单备注</a></div>"
			+ "<div class='toggle-wrap hide' id='remarkId'>"
			+ "<div class='cbox' id='order-remark'>"
			+ "<div class='inner'>"
			+ "<div class='group'>"
			+ "<input type=''  class='textbox1'  id='remarkText' maxlength='45' size='15'    style='color:#cccccc;padding:3px'  value='限45个字' "
			+ " onblur="
			+ "\""
			+ "if(this.value==''||this.value=='限45个字'){this.value='限45个字';this.style.color='#cccccc'}"
			+ "\""
			+ "onfocus="
			+ "\""
			+ "if(this.value=='限45个字') {this.value='';};this.style.color='#000000';"
			+ "\"" + "  />  "
			+ "<span class='label'>&nbsp;&nbsp;提示：请勿填写有关支付、收货、发票方面的信息。</span>"
			+ "</div>" + "</div>" + "</div>" + "</div>";
		$("#orderRemarkItem").html(remarkTemplate);
	}

	/**
	 * 是否显示订单备注
	 */
	function loadOrderRemark() {
		var actionUrl = OrderAppConfig.AsyncDomain
				+ "/isShowOrderRemark.action";
		var param = addFlowTypeParam();
		jQuery.ajax( {
			type : "POST",
			dataType : "json",
			url : actionUrl,
			data : param,
			cache : false,
			success : function(result, textStatus) {
				// 没有登录跳登录
			if (isUserNotLogin(result)) {
				goToLogin();
				return;
			}
			if (result == true) {
				showOrderRemark();
			}
		},
			error : function(XMLHttpResponse) {
		}
		});

	}

	function editOrderRemark(obj) {
		if ($(obj).val() == "限15个字") {
			$(obj).val("");
		}
	}


	/**
	 * 是否显示验证码
	 */
	function loadCheckCode() {
		var actionUrl = OrderAppConfig.DynamicDomain + "/order/isShowCheckCode.action";
		var param = addFlowTypeParam();
		jQuery.ajax( {
			type : "POST",
			dataType : "json",
			url : actionUrl,
			data : param,
			cache : false,
			success : function(dataResult) {
					if(dataResult){
						refreshCheckCode();
					}
			},
			error : function(XMLHttpResponse) {
			}
			
		});
	}

	// 判断是否加载验证码
	function showCheckCode(){
		
		var showCheckCode = $("#showCheckCode").val();
		var encryptClientInfo = $("#encryptClientInfo").val();
		
		if(showCheckCode=="true"){
			refreshCheckCode(encryptClientInfo);
		}
	}
	
	/**
	 * 获取验证码模版
	 * 
	 * @returns {String}
	 */
	function getCheckCodeTemplate(encryptClientInfo) {
		var rid=Math.random().toString()+"_"+Math.random().toString();
		var checkCodeUrl="";
		var checkCodeUrl="http://captcha.jd.com/verify/image?acid="+rid+"&srcid=trackWeb&is="+encryptClientInfo;
		return "<span style='color:red'></span>"
				+ "<img id='orderCheckCodeImg' src='"
				+ checkCodeUrl
				+ "' onclick='getNextCheckCode()' "
				+ "alt='点击更换验证码' title='点击更换验证码' style='display:inline;cursor:pointer;border:#ebcca0 1px solid;' />"
				+ "<input id='checkcodeTxt'  type='text' style='width:50px;margin:0 5px 0 3px;height:22px;padding-left:2px;font-size:17px;font-weight:bold' />"
				+ "<input id='checkcodeRid'  type='hidden' value='"+ rid+"' />"
		        + "<input id='encryptClientInfo'  type='hidden' value='"+ encryptClientInfo+"' />";
	}

	/**
	 * 显示下一张验证码
	 * 
	 * @param obj
	 */
	function getNextCheckCode() {
		var obj = document.getElementById("orderCheckCodeImg");
		var rid = Math.random().toString()+"_"+Math.random().toString(); 
		var checkCodeUrl="";
		var encryptClientInfo=$("#encryptClientInfo").val();

		var checkCodeUrl="http://captcha.jd.com/verify/image?acid="+rid+"&srcid=trackWeb&is="+encryptClientInfo;

		
		obj.src = checkCodeUrl;
		$("#checkcodeRid").val(rid);
		$('#checkcodeTxt').val("");
	}

	/**
	 * 刷新验证码
	 */
	function refreshCheckCode(encryptClientInfo) {
		if (isEmpty($("#checkCodeDiv").html())) {
			$("#checkCodeDiv").html(getCheckCodeTemplate(encryptClientInfo));
		} else {
			getNextCheckCode();
		}
	}


	/**
	 * 设置无货商品
	 * 
	 * @param outSkus
	 */
	function setOutSkus(skuIds) {
		var hasOutSkus = false;
		var outSkus = skuIds.split(",");
		if (outSkus != null && outSkus.length > 0) {
			$(".p-inventory")
					.each(
							function() {
								var skuId = $(this).attr("skuId");
								if (outSkus != null && outSkus.length > 0) {
									for ( var i = 0; i < outSkus.length; i++) {
										if (outSkus[i] == skuId) {
											hasOutSkus = true;
											$(this)
													.html(
															"<strong>暂时无货</strong><br/>"
																	+ "<a href='#'"
																	+ " onclick=\"deleteOutSku('"
																	+ skuId
																	+ "')\">"
																	+ "[删除并关注]</a>");
											$(this)
													.parent()
													.parent()
													.parent()
													.addClass(
															"review-tbody-highlight");
										}
									}
								}
							});
			if (hasOutSkus) {
				$("#batchDeleteNoStockSkus").show();
			}
		}
	}

	/**
	 * 一键删除所有无货商品
	 */
	function deleteAllOutSku() {
		var skuIds = $("#noStockSkuIds").val();
		deleteOutSku(skuIds);
	}

	/**
	 * 商品全部无货，或者赠品无货，跳向购物车
	 * 
	 * @param skuIds
	 * @returns {Boolean}
	 */
	function outSkuIsGoCart(skuIds) {
		var outSkus = skuIds.split(",");
		// 如果只有一个商品，则跳回购物车
		var flag = 0;
		var flag2 = 0;
		$(".p-inventory").each(function() {
			flag2 = flag2 + 1;
			var skuId = $(this).attr("skuId");
			if (outSkus != null && outSkus.length > 0) {
				for ( var i = 0; i < outSkus.length; i++) {
					if (outSkus[i] == skuId) {
						flag = flag + 1;
					}
				}
			}
		});
		// 存在主商品有货，但是赠品或者附件无货
		if (flag < outSkus.length) {
			return true;
		}
		// 所有商品都无货
		if (flag == flag2) {
			return true;
		}
	}

	/**
	 * 删除无货商品
	 * 
	 * @param obj
	 */
	function deleteOutSku(skuIds) {
		// 如果只有一个商品，则直接去购物车
		if (outSkuIsGoCart(skuIds)) {
			goCart();
			return;
		}
		// todo删除购物车和结算服务cookie
		var actionUrl = OrderAppConfig.DynamicDomain 
				+ "/order/deleteNoStockSkus.action?orderInfoParam.outSkuIds="
				+ skuIds;
		var param = addFlowTypeParam();
		jQuery.ajax( {
			type : "POST",
			dataType : "json",
			url : actionUrl,
			data : param,
			cache : false,
			success : function(dataResult, textStatus) {
				// 没有登录跳登录
			if (isUserNotLogin(dataResult)) {
				goToLogin();
				return;
			}
			// 没有登录跳登录
			if (isUserNotLogin(dataResult)) {
				goToLogin();
				return;
			}
			// 删除成功后刷新订单页面
			if (dataResult == true) {
				goOrder();
			}
		},
		error : function(XMLHttpResponse) {
		}
		});

	}
	/**
	 * 是否展开配收货人
	 */
	function isNewUser() {
		if (checkIsNewUser()) {
			if(isLocBuy()){
				edit_LocConsignee();
			}else{
				edit_Consignee();
			}
		}
	}
	
	/**
	 * 检查是否是新用户
	 * 
	 * @returns {Boolean}
	 */
	function checkIsNewUser(){
		var val = $("#isOpenConsignee").val();
		if (val != undefined && (val == 1 || val == "1")) {
			return true;
		}
		return false;
	}
	
	/**
	 * 是否刷新地址，针对轻松购
	 * 
	 * @return
	 */
	function isRefreshArea(){
		var val = $("#isRefreshArea").val();
		if (val != undefined && (val == 1 || val == "1")) {
			return true;
		}
		return false;
	}

	/**
	 * 是否展开配送和支付方式
	 */
	function isOpenPaymentAndShip() {
		if($("#isOpenPaymentAndShip").length > 0){
			var val=$("#isOpenPaymentAndShip").val();
			// 如果是新用户，必须需先填写收货人地址
			if (val != undefined  && val != "undefined" && (val == 1 || val == "1") && (checkIsNewUser() == false)) {
				if(isLocBuy()){
					edit_LocPayment(2);
				}else{
					edit_Payment(2);
				}
			}
		}
		
	}

	/**
	 * 大家电换区逻辑
	 */
	function isBigItemChange() {
		if ($("#isChangeItemByArea").val()==="true") {
			return true;
		} 
		return false;
	}
	
	/**
	 * 是否含有糖酒
	 */
	function hasTang9(){
		if($("#hasTang9").val()=="true" || $("#hasTang9").val()==true){
			return true;
		}
		return false;
	}
	

	/**
	 * 提交订单方法
	 */
	function submit_Order() {
		$("#submit_message").hide();
		jQuery.ajax( {
			type : "POST",
			dataType : "json",
			url : "/order/submit",
			data : $("#orderForm").serialize(),
			cache : false,
			success : function(result) {
				if(result.status == 200){
					location.href = "/order/success.html?id="+result.data;
				}else{
					$("#submit_message").html("订单提交失败，请稍后重试...").show();
				}
			},
			error : function(error) {
				$("#submit_message").html("亲爱的用户请不要频繁点击, 请稍后重试...").show();
			}
		});
	}
	
	/**
	 * 使用以旧换新逻辑
	 * 
	 * @return
	 */
	function useOldRepalceNew(){
		var isReplace=false;
		if($("#oldReplaceNew:checked").size()>0){
			isReplace=true;
		}else{
			isReplace=false;
		}
		jQuery.ajax( {
			type : "POST",
			dataType : "text",
			url : OrderAppConfig.AsyncDomain + "/useOldReplaceNew.action",
			data : addFlowTypeParam("isReplace="+isReplace),
			cache : false,
			success : function(dataResult, textStatus) {	
				// 没有登录跳登录
				if (isUserNotLogin(dataResult)) {
					goToLogin();
					return;
				}
				$("#span-skulist").html(dataResult);
				var orderPrice=eval("(" +$("#orderPriceInSkuList").val() + ")");
				// 修改优惠券结算信息
				if(orderPrice.couponDiscount != null) {
					$("#couponPriceId").text("-￥" + orderPrice.couponDiscount.toFixed(2));
					if(orderPrice.couponDiscount == 0) {
						$("#showCouponPrice").css("display", "none");
					} else {
						$("#showCouponPrice").css("display", "block");
					}
				} else {
					$("#couponPriceId").css("display", "none");
				}
				
				// 修改礼品卡结算信息
				if(orderPrice.giftCardDiscount != null) {
					$("#giftCardPriceId").text("-￥" + orderPrice.giftCardDiscount.toFixed(2));
					if(orderPrice.giftCardDiscount == 0) {
						$("#showGiftCardPrice").css("display", "none");
					} else {
						$("#showGiftCardPrice").css("display", "block");
					}
				} else {
					$("#showGiftCardPrice").css("display", "none");
				}
				
				// 修改余额
				if(orderPrice.usedBalance != null) {
					$("#usedBalanceId").text("-￥" + orderPrice.usedBalance.toFixed(2));
					if(orderPrice.usedBalance == 0) {
						$("#showUsedOrderBalance").css("display", "none");
					} else {
						$("#showUsedOrderBalance").css("display", "block");
					}
				} else {
					$("#showUsedOrderBalance").css("display", "none");
				}
				
				// 修改应付余额
				if(orderPrice.payPrice != null) {
					$("#payPriceId").text("￥" + orderPrice.payPrice.toFixed(2));				
					$("#sumPayPriceId").text("￥" + orderPrice.payPrice.toFixed(2));

				} 
				// 商品总金额
				if(orderPrice.promotionPrice != null) {
					$("#warePriceId").text("￥" + orderPrice.promotionPrice.toFixed(2));
				}
			},
			error : function(XMLHttpResponse) {
			}
		});
	}
	
	/** *********************************************有货先发****************************************************** */
	
	/**
	 * 大家电换区
	 * 
	 * @return
	 */
	function bigItemChangeArea(){
		var actionUrl=OrderAppConfig.AsyncDomain + "/isBigItemChangeArea.action";
		var param = addFlowTypeParam();
		jQuery.ajax( {
					type : "POST",
					dataType : "json",
					url : actionUrl,
					data : param,
					cache : false,
					success : function(dataResult, textStatus) {
							if (dataResult.resultFlag) {
								if(dataResult.message){
									alert(dataResult.message);
								}else{
									alert("请注意：根据您最新的收货地址，您购物车中的商品或价格发生了变化！");
								}
								goOrder();
							}else{
								if(dataResult.message){
									alert(dataResult.message);
								}
							}
							
			},
			error : function(XMLHttpResponse) {
			}
		});
	}
	
	/**
	 * 糖酒换区
	 * 
	 * @return
	 */
	function tang9ChangeArea(){
		var actionUrl=OrderAppConfig.AsyncDomain + "/tang9ChangeArea.action";
		var param = addFlowTypeParam();
		jQuery.ajax( {
			type : "POST",
			dataType : "json",
			url : actionUrl,
			data : param,
			cache : false,
			success : function(dataResult, textStatus) {
				if (dataResult.resultFlag) {
					if(dataResult.message){
						alert(dataResult.message);
					}else{
						alert("请注意：根据您最新的收货地址，您购物车中的商品或价格发生了变化！");
					}
					goOrder();
				}else{
					if(dataResult.message){
						alert(dataResult.message);
					}
				}
				
			},
			error : function(XMLHttpResponse) {
			}
		});
	}
	
	
	/** *********************************************京豆****************************************************** */
	/**
	 * 京豆支付展开关闭
	 */
	function showOrHideJdBean(){
		if($("#orderBeanItem").hasClass("toggle-active")){
			$("#orderBeanItem").removeClass("toggle-active");
			$("#jdBeans").hide();
		}else{
			var actionUrl=OrderAppConfig.DynamicDomain + "/jdbean/getJdBean.action";
			var params = addFlowTypeParam();
			jQuery.ajax({
				type : "POST",
				dataType : "html",
				data : params,
				url : actionUrl,
				cache : false,
				success : function(result) {
					// 没有登录跳登录
					if (isUserNotLogin(result)) {
						goToLogin();
						return;
					}
					$("#orderBeanItem").addClass("toggle-active");
					$("#jdBeans").html(result);
					flushOrderPrice(eval("(" +$("#jdBeanOrderPrice").val() + ")"),true);
					$("#jdBeans").show();
					var param = "couponParam.fundsPwdType=JdBean";
					var url = OrderAppConfig.DynamicDomain + "/coupon/checkFundsPwdResult.action";
					param = addFlowTypeParam(param);
					jQuery.ajax({
						type : "POST",
						dataType : "json",
						url : url,
						data : param,
						async : true,
						cache : false,
						success : function(flag) {
							if(!flag){
								if($("#usedJdBean").length>0){
									// 取消京豆
									useJdBean(0);
								}
								$("#jdBean-safe-tip").show();
							}
						}
					});
				},
					error : function(XMLHttpResponse) {
				}
			});
		}
	}
	/**
	 * 取消使用京豆，不展开京豆选项
	 */
	function cancelJdBeanWithoutOpen(){
		var actionUrl=OrderAppConfig.DynamicDomain + "/jdbean/useJdBean.action";
		var param ="jdBeanParam.usedJdBean=0";
		param = addFlowTypeParam(param);
		jQuery.ajax({
			type : "POST",
			dataType : "html",
			url : actionUrl,
			data : param,
			cache : false,
			success : function(result) {
				flushOrderPrice(eval("(" +$("#jdBeanOrderPrice").val() + ")"),true);
				isNeedPaymentPassword();// 是否需要支付密码
			},
				error : function(XMLHttpResponse) {
			}
		});
	}
	/**
	 * 使用京豆
	 */
	function useJdBean(jdbean){
		var actionUrl=OrderAppConfig.DynamicDomain + "/jdbean/useJdBean.action";
		var param ="jdBeanParam.usedJdBean="+jdbean;
		param = addFlowTypeParam(param);
		jQuery.ajax({
			type : "POST",
			dataType : "html",
			url : actionUrl,
			data : param,
			cache : false,
			success : function(result) {
				// 没有登录跳登录
				if (isUserNotLogin(result)) {
					goToLogin();
					return;
				}
				$("#orderBeanItem").addClass("toggle-active");
				$("#jdBeans").html(result);
				$("#jdBeans").show();
				flushOrderPrice(eval("(" +$("#jdBeanOrderPrice").val() + ")"),true);
				isNeedPaymentPassword();// 是否需要支付密码
			},
				error : function(XMLHttpResponse) {
			}
		});
	}
	
	/**
	 * 京豆使用取消修改
	 * 
	 * @return
	 */
	function useCancelEditJdBean(jdbean,rate,cancel){
		if(jdbean < 0 || (cancel && $("#showUsedJdBean:visible").length == 0)){
			return;
		}
		// 取消使用京豆，不用校验支付密码开启状态
		if(cancel){
			useJdBean(0);
		}else{// 使用京豆，先校验支付密码开启状态
			var param = "couponParam.fundsPwdType=JdBean";
			var url = OrderAppConfig.DynamicDomain + "/coupon/checkFundsPwdResult.action";
			param = addFlowTypeParam(param);
			jQuery.ajax({
				type : "POST",
				dataType : "json",
				url : url,
				data : param,
				async : true,
				cache : false,
				success : function(flag) {
					if (isUserNotLogin(flag)) {
						goToLogin();
						return;
					}
					if (flag) {
						$("#jdBean-safe-tip").hide();
						useJdBean(jdbean);
					}else{
						alert("为保障您的账户资金安全，京豆暂时不可用，请先开启支付密码");
						$("#jdBean-safe-tip").show();
						return;
					}
				}
			});
		}

	}
	
	
	/** ******************************免注册下单开始******************************** */
	function sendMobileCode(){
		var mobile=$("#consignee_mobile").val();
		
		if(!checkMobilePhone()){
			return ;
		}
		
		$("#sendMobileCodeBtn").attr("disabled","disabled");
		jQuery.ajax({
	        type: "POST",
	        dataType: "json",
	        url: OrderAppConfig.DynamicDomain + "/order/sendMobileCode.action",
	        data: "consigneeWithoutRegistParam.mobile="+mobile,
	        cache: false,
	        success: function(dataResult) {
				if(dataResult.success){
					$("#call_div_error").hide();
	                $("#call_div").removeClass("message");
					// 倒计时
					$("#sendMobileCodeBtn").attr("disabled","disabled");
					$("#sendMobileCodeBtn").val("120秒后重新获取");
					setTimeout(countDown,1000);
					
				}else{
					var errorMessage=dataResult.message;
					if(errorMessage.indexOf("已注册")>-1){
						errorMessage=errorMessage+"，<a href='https://passport.jd.com/new/login.aspx?ReturnUrl=http%3A%2F%2Fcart.jd.com%2Fcart%2Fcart.html' >立即登录</a>";
					}
					$("#call_div_error").html(errorMessage);
	            	$("#call_div_error").show();
	                $("#call_div").addClass("message");
	                $("#sendMobileCodeBtn").attr("disabled","");
				}
	        },
	        error: function(XMLHttpResponse) {}
	    });
	}

	function checkMobilePhone(){
		var mobile=$("#consignee_mobile").val();
		var checkFlag = true;
		var reg =/^1[3|4|5|8]\d{9}/;
		var errorMessage="";
		if(isEmpty(mobile)){
			errorMessage = "请输入手机号";
			checkFlag = false;
		}else{
			if(mobile.match(reg)==null){
				checkFlag = false ;
				errorMessage = "手机号格式错误";
			}
		}
		if(!checkFlag){
			$("#call_div_error").html(errorMessage);
	    	$("#call_div_error").show();
	        $("#call_div").addClass("message");
		}else{
			$("#call_div_error").hide();
			$("#call_div").removeClass("message");
		}
		return checkFlag;
	}

	/**
	 * 发送验证码倒计时
	 * 
	 * @return
	 */
	function countDown(){
		var text=$("#sendMobileCodeBtn").val();
		var secondTxt=text.substring(0,text.indexOf("秒"));
		var second=parseInt(secondTxt);
		if(second<=0){
			$("#sendMobileCodeBtn").attr("disabled","");
			$("#sendMobileCodeBtn").val("获取验证码");
		}else{
			second--;
			$("#sendMobileCodeBtn").val(second+"秒后重新获取");
			setTimeout(countDown,1000);
		}
	}

	function checkMobileCode(){
		var code=$("#mobileCode").val();
		if(isEmpty(code)){
			$("#mobileCode_div_error").html("验证失败，请核对手机号和验证码，必要时重新获取");
	        $("#mobileCode_div").addClass("message");
	        return;
		}
		jQuery.ajax({
	        type: "POST",
	        dataType: "json",
	        url: OrderAppConfig.DynamicDomain + "/order/checkMobileCode.action",
	        data: "consigneeWithoutRegistParam.code="+code,
	        cache: false,
	        success: function(dataResult) {
				if(dataResult){
					$("#mobileCode_div_success").show();
					$("#mobileCode_div_error").hide();
					$("#mobileCode_div").removeClass("message");
				}else{
					$("#mobileCode_div_success").hide();
					$("#mobileCode_div_error").html("验证失败，请核对手机号和验证码，必要时重新获取");
					$("#mobileCode_div_error").show();
					$("#mobileCode_div").addClass("message");
					return;
				}
			},
	        error: function(XMLHttpResponse) {}
	    });
	}
	function save_ConsigneeWithoutRegister(){
		// 普通地址
		var consignee_id = 0;
	    var consignee_type = 1;
	    var consignee_provinceId = null;
	    var consignee_cityId = null;
	    var consignee_countyId = null;
	    var consignee_townId = null;
	    var consignee_name = null;
	    var consignee_email = "";
	    var consignee_address = null;
	    var consignee_mobile = null;
	    var consignee_phone = "";
	    var consignee_provinceName = null;
	    var consignee_cityName = null;
	    var consignee_countyName = null;
	    var consignee_townName = null;
	    var isUpdateCommonAddress = 0;
	    var mobileCode="";
	    
	    consignee_provinceId = $("#consignee_province").find("option:selected").val();
	    consignee_cityId = $("#consignee_city").find("option:selected").val();
	    consignee_countyId = $("#consignee_county").find("option:selected").val();
	    consignee_townId = $("#consignee_town").find("option:selected").val();
	    consignee_provinceName = $("#consignee_province").find("option:selected").text().replace("*", "");
	    consignee_cityName = $("#consignee_city").find("option:selected").text().replace("*", "");
	    consignee_countyName = $("#consignee_county").find("option:selected").text().replace("*", "");
	    if (!$("#span_town").is(":hidden")) {
	        consignee_townName = $("#consignee_town").find("option:selected").text().replace("*", "");
	    }
	    
	    consignee_name = $("#consignee_name").val();
	    consignee_address = $("#consignee_address").val();
	    consignee_mobile = $("#consignee_mobile").val();
	    mobileCode = $("#mobileCode").val();
	    var checkConsignee = true;
	    // 验证收货人信息是否正确
	    if (!check_Consignee("name_div")) {
	        checkConsignee = false;
	    }
	    // 验证地区是否正确
	    if (!check_Consignee("area_div")) {
	        checkConsignee = false;
	    }
	    // 验证收货人地址是否正确
	    if (!check_Consignee("address_div")) {
	        checkConsignee = false;
	    }
	    // 验证手机号码是否正确
	    if(!checkMobilePhone()){
	    	checkConsignee = false;
		}
	    if(isEmpty(mobileCode)){
	    	$("#mobileCode_div_success").hide();
			$("#mobileCode_div_error").html("验证失败，请核对手机号和验证码，必要时重新获取");
			$("#mobileCode_div_error").show();
			$("#mobileCode_div").addClass("message");
	    	checkConsignee = false;
	    }
	    if (!checkConsignee) {
	        return;
	    }
		
	    var param = "consigneeWithoutRegistParam.id=" + consignee_id + "&consigneeWithoutRegistParam.type=" + consignee_type 
	    			+ "&consigneeWithoutRegistParam.name=" + consignee_name + "&consigneeWithoutRegistParam.provinceId=" + consignee_provinceId + "&consigneeWithoutRegistParam.cityId=" + consignee_cityId 
	    			+ "&consigneeWithoutRegistParam.countyId=" + consignee_countyId + "&consigneeWithoutRegistParam.townId=" + consignee_townId 
	    			+ "&consigneeWithoutRegistParam.address=" + consignee_address + "&consigneeWithoutRegistParam.mobile=" + consignee_mobile 
	    			+ "&consigneeWithoutRegistParam.email=" + consignee_email + "&consigneeWithoutRegistParam.phone=" + consignee_phone 
	    			+ "&consigneeWithoutRegistParam.provinceName=" + consignee_provinceName + "&consigneeWithoutRegistParam.cityName=" + consignee_cityName 
	    			+ "&consigneeWithoutRegistParam.countyName=" + consignee_countyName + "&consigneeWithoutRegistParam.townName=" + consignee_townName 
	    			+ "&consigneeWithoutRegistParam.isUpdateCommonAddress=" + isUpdateCommonAddress
	    			+ "&consigneeWithoutRegistParam.code="+mobileCode;
	    
	    jQuery.ajax({
	        type: "POST",
	        dataType: "json",
	        url: OrderAppConfig.DynamicDomain + "/order/saveConsigneeWithoutRegist.action",
	        data: param,
	        cache: false,
	        success: function(dataResult) {
	    		if(dataResult == null){
	    			$("#mobileCode_div_success").hide();
					$("#mobileCode_div_error").html("验证失败，请核对手机号和验证码，必要时重新获取");
					$("#mobileCode_div_error").show();
					$("#mobileCode_div").addClass("message");
	    			return ;
	    		}
	    			
	    		if(dataResult.success){
	    			goOrder();
	    		}else{
	    			var errorMessage=dataResult.message;
					if(errorMessage.indexOf("已注册")>-1){
						errorMessage=errorMessage+"，<a href='https://passport.jd.com/new/login.aspx?ReturnUrl=http%3A%2F%2Fcart.jd.com%2Fcart%2Fcart.html'>立即登录</a>";
						$("#call_div_error").html(errorMessage);
		            	$("#call_div_error").show();
		                $("#call_div").addClass("message");
		                $("#sendMobileCodeBtn").attr("disabled","");
		                return;
					}
					if(errorMessage.indexOf("验证失败")>-1){
						$("#mobileCode_div_success").hide();
						$("#mobileCode_div_error").html("验证失败，请核对手机号和验证码，必要时重新获取");
						$("#mobileCode_div_error").show();
						$("#mobileCode_div").addClass("message");
						return ;
					}
					alert("系统繁忙，请稍后再试！");
	    		}
	    	},
	        error: function(XMLHttpResponse) {}
	    });
	}

	function getSkuListWithUuid(){
		jQuery.ajax({
	        type: "POST",
	        dataType: "json",
	        url: OrderAppConfig.DynamicDomain + "/order/getSkuList.action",
	        data: "",
	        cache: false,
	        success: function(dataResult) {
	    		$("#span-skulist").html(dataResult);
	    		$("#sumPayPriceId").text("￥ "+$("#totalFee").val());
	    		$("#payPriceId").text("￥ "+$("#totalFee").val());
	    	},
	        error: function(XMLHttpResponse) {}
	    });
	}

	/** ******************************免注册下单结束******************************** */

    /**
	 * 是否是实体礼品卡流程
	 */
    function isLipinkaPhysical(){
        var lpkVal = $("#flowType").val();
        if(lpkVal == "4"){
            return true;
        }else{
            return false;
        }
    }

	/**
	 * 是否是礼品购流程
	 */
	function isGiftBuy(){
		var giftBuyVal = $("#flowType").val();
		if(giftBuyVal == "2"){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * 是否是礼品购流程
	 */
	function isLocBuy(){
		var locBuyVal = $("#flowType").val();
		if(locBuyVal == "1"){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 加载礼品购的“是否隐藏价格”的checkBox,同时改变返回购物车的连接
	 */
	function loadGiftBuyHidePrice(){
		if(isGiftBuy()){
			cartUrl ="http://cart.gift.jd.com/cart/cart.html";
			$("#cartRetureUrl").attr("href","http://cart.gift.jd.com/cart/cart.html");
			$("#cartRetureUrl").text("返回修改礼品购购物车");
			$("#giftBuyHidePriceDiv").show();
			$("#consigneeTitleDiv").text("收礼人信息");
		}else{
			cartUrl ="http://cart.jd.com/cart/cart.html";
			$("#cartRetureUrl").attr("href","http://cart.jd.com/cart/cart.html");
			$("#cartRetureUrl").text("返回修改购物车");
			$("#giftBuyHidePriceDiv").hide();
			$("#consigneeTitleDiv").text("收货人信息");
		}
	}
	
	function addFlowTypeParam(params){
		var flowType = $("#flowType").val();
		if(isEmpty(flowType)){
			return params;
		}else{
			if(isEmpty(params)){
				return "flowType="+flowType;
			}else{
				return params+"&flowType="+flowType;
			}
		}
	}
	
	// ------------------------------------------------------------页面出来后异步加载-----------------------------------------------------------

	// 预售结算页 有message提示
	if($("#isPresale").val()=="true"){
		$("#submit_check_info_message").html("<span>预售商品定金恕不退换，请同意支付定金</span>").show();
		$("#order-submit").attr("class", "checkout-submit-disabled");
		$("#presaleEarnest").bind("click",function(){
			if($("#presaleEarnest").attr("checked")==true){
				$("#submit_check_info_message").html("").hide();
				$("#order-submit").attr("class", "checkout-submit");
			}else{
				$("#submit_check_info_message").html("<span>预售商品定金恕不退换，请同意支付定金</span>").show();
				$("#order-submit").attr("class", "checkout-submit-disabled");
			}
		});
	}
	
	// 加载验证码
	showCheckCode();
	
	var isUnregister = $("#isUnregister").val();
	// 如果不是免注册下单，调用异步服务
	if (isUnregister || isUnregister == "true"){
		loadProvinces();
		getSkuListWithUuid();
	}else {
	    // 大家电换区
	    if (isBigItemChange()) {
	        bigItemChangeArea();
	    }
	    // 糖酒
	    if (hasTang9()) {
			tang9ChangeArea();
		}
	    showSopInvoiceNote();
	    isNewUser(); // 新用户展开地址
	    isOpenPaymentAndShip(); // 是否展开配送支付方式
	    loadOrderExt();
	    showWhiteBar();
	    openConsignee();
	    if(!isLocBuy()){
		    loadPromise(true);
		    copyFreightHtml();
		    showOrHideFactoryShipCod();
		    showFerightInsure();
		    showTangJiuSkuIcon();
	    }
	    // 如果是礼品购流程，加载隐藏价格
	    if(isGiftBuy()){
	    	loadGiftBuyHidePrice();
	    }
	}

/**
 * 修改选中样式
 */
(function(win){
	var RadioChecked = function(o){
		this.obj = o.obj;
		this.init();
	};
	RadioChecked.prototype = {
		init: function(){
			this.bindEvent();
		},
		bindEvent: function(){
			var self = this;
			self.obj.find('.hookbox').bind('click',function(){
				self.obj.find('.item-selected').removeClass('item-selected');
				$(this).parents('.item').addClass('item-selected');
			});
		}
	};
	win.radioSelect = function(o){
		new RadioChecked(o);
	};
}(window));

(function(win){
	var PaymentBank = function(obj,fun){
		this.obj = obj;
		this.fn = fun || function(){};
		this.init();
	};
	PaymentBank.prototype = {
		init:function(){
			this.bindEvent();
		},
		bindEvent: function(){
			var self = this,
				liNodes = self.obj.find('li');
			liNodes.bind('click',function(){
				liNodes.removeClass('selected');
				$(this).addClass('selected');
				self.fn($(this));
			});
		}
	};
	win.paymentBank = function(o,fn){
		new PaymentBank(o,fn);
	};
}(this));

function changeCodDate(codDateOffset,isJdOrOther){
	var bigItemInstallInfo = "";
	if(isJdOrOther || isJdOrOther == "true"){
		bigItemInstallInfo = $("#bigItemInstallDateInfoForJd").val();
	}else{
		bigItemInstallInfo = $("#bigItemInstallDateInfoForOtherShip").val();
	}
	if(!isEmpty(bigItemInstallInfo)){
		var installDateMap=eval('('+bigItemInstallInfo+')');
		var installDateMapHtml = "<option value=\"-1\">请选择日期</option>";
		for(var key in installDateMap){
		    if(key==codDateOffset){
		        var dateListStr= installDateMap[key]+"";
		        var dateList=dateListStr.split(',');
		        for(var i=0;i<dateList.length;i++){
		            if(i==0){
		            	installDateMapHtml+="<option selected value='"+dateList[i].split('-')[1]+"'>"+dateList[i].split('-')[0]+"</option>";  
		            }else{
		            	installDateMapHtml+="<option value='"+dateList[i].split('-')[1]+"'>"+dateList[i].split('-')[0]+"</option>";            
		            }
		        }
		        break;
		    }
		}
		installDateMapHtml+="<option value=\"-2\">暂缓安装</option>";
		if(isJdOrOther || isJdOrOther == "true"){
			$('#jd-bigItem-install-date').html(installDateMapHtml);
		}else{
			$('#other-bigItem-install-date').html(installDateMapHtml);
		}
		return;
	}
	
	if($('#jd-bigItem-install-date').length>0){
		var actionUrl=OrderAppConfig.DynamicDomain + "/payAndShip/getInstallDateList.action";
		if(codDateOffset==-1){
			$('#jd-bigItem-install-date').html('<option value="-1">请选择日期</option>');
		}else{
			var param = "selectedCodDateOffSet="+codDateOffset;
			param = addFlowTypeParam(param);
			jQuery.ajax( {
				type : "POST",
				url : actionUrl,
				data : param,
				cache : false,
				success : function(dataResult, textStatus) {					
					$('#jd-bigItem-install-date').html(dataResult);
				},
				error : function(XMLHttpResponse) {
				}
			});
		}
	}
}
/**
 * 将payAndShip中的运费弹窗复制到orderInfo中，因为取数据是在payAndShip中，而弹窗必须放到orderInfo最下面，否则会串行
 * 
 * @return
 */

function copyFreightHtml(){
		var freightHtml=$("#payment-ship").find("#transportInPay").html();
		if(freightHtml!=""){
			$("#transport").html(freightHtml);
		}
}

function showOrHideFactoryShipCod(){
	if($("#factoryShipCod").val()=="true"){
		$('#factoryShipCodShowDivBottom').css("display","block");
	}
}

function getPickSiteListByRegion(obj){
	var pickSiteId = $("input[name='pick'][checked]").val();
	
	var payid = $("input[name='payment'][checked]").val();
	var regionId = $(obj).attr("data-value");
	if(isEmpty(regionId)){
		regionId="-1";
	}
	var repRegionId = regionId.replace(/:/g,"-");
	var regionHTML = $("#region-" + repRegionId).find("a").html();
	var param = "shipParam.pickSiteId=" + pickSiteId;
	param += "&shipParam.payId=" + payid; 
	param += "&shipParam.regionId=" + regionId;
	param += "&shipParam.pickSiteNum=5";
	param = addFlowTypeParam(param);
	jQuery.ajax({
		type : "POST",
		dataType : "text",
		url : OrderAppConfig.AsyncDomain
				+ "/payAndShip/getPickSiteByRegion.action",
		data : param,
		cache : false,
		success : function(dataResult, textStatus) {
			// 没有登录跳登录
			if (isUserNotLogin(dataResult)) {
				goToLogin();
				return;
			}
			if(dataResult=="null"){
				alert("自提点获取异常，请重新选择或稍后尝试");
				window.location.href="http://trade.jd.com/order/getOrderInfo.action?rid=" + Math.random(); 
			}
			var jsonO = eval("("+dataResult+")");
			if(jsonO.pickViewList.length==0){
				alert("自提点获取异常，请重新选择或稍后尝试");
				window.location.href="http://trade.jd.com/order/getOrderInfo.action?rid=" + Math.random(); 
			}
			$('#store-selector').removeClass('hover');
			var oldText = $("#store-selector").find('.text').find("div").attr("title");
			var newText = oldText+regionHTML;
			$("#store-selector").find('.text').find("div").html(newText);
			$("#selectedRegionId").val(regionId);
			$("#address-more-txt").attr("page-no","1");
			$("#address-more-txt").attr("page-size","5");
			var jsonO = eval("("+dataResult+")");  
			var pageSize =  jsonO.pickViewList.length;
			if(pageSize>=5){
				$("#address-more-new").parent().css("display","block");
			}else{
				$("#address-more-new").parent().css("display","none");
			}
			handdelPickSiteResult(dataResult);
			close_MorePicksite();
		},
		error : function(XMLHttpResponse) {
			alert("系统繁忙，请稍后再试！");
			return false;
		}
	});
}
function open_MorePicksite(obj){
	var pickSiteId = $("input[name='pick'][checked]").val();
	var payid = $("input[name='payment'][checked]").val();
	var pickSiteNum = 100;
	var regionId = $("#selectedRegionId").val();
	if(isEmpty(regionId)){
		regionId="-1";
	}
	var param = "shipParam.pickSiteId=" + pickSiteId;
	param += "&shipParam.payId=" + payid; 
	param += "&shipParam.pickSiteNum=" + pickSiteNum;
	param += "&shipParam.regionId=" + regionId;
    param = addFlowTypeParam(param);
	jQuery.ajax({
		type : "POST",
		dataType : "text", 
		url : OrderAppConfig.DynamicDomain
				+ "/payAndShip/getMorePickSite.action",
		data : param,
		cache : false,
		success : function(dataResult, textStatus) {
			if (isUserNotLogin(dataResult)) {
				goToLogin();
				return;
			}
			if(dataResult=="null"){
				alert("自提点获取异常，请重新选择或稍后尝试");
				window.location.href="http://trade.jd.com/order/getOrderInfo.action?rid=" + Math.random(); 
			}
			var jsonO = eval("("+dataResult+")");
			if(jsonO.pickViewList.length==0){
				alert("自提点获取异常，请重新选择或稍后尝试");
				window.location.href="http://trade.jd.com/order/getOrderInfo.action?rid=" + Math.random(); 
			}
			handdelPickSiteResult(dataResult);
			$("#address-more-new").removeClass("select-expand").addClass("select-close")
			.html("<span onclick=\"close_MorePicksite()\">收起自提点</span><s></s>");
			$("#pickSiteInfo").find(".item").each(function() {
				$(this).show();
			});
		},
		error : function(XMLHttpResponse) {
			alert("系统繁忙，请稍后再试！");
			return false;
		}
	});
}

function close_MorePicksite() {
	$("#address-more-new").removeClass("select-close").addClass("select-expand")
		.html("<span onclick=\"open_MorePicksite()\">选择更多自提点</span><s></s>");
	$("input[name='pick'][checked]").parent().parent().prependTo('#pickSiteInfo');
	$("#pickSiteInfo").find(".item").each(function(i) {
		if(i>4){
			$(this).hide();
		}
	});
}

function handdelPickSiteResult(dataResult){
	var jsonO = eval("("+dataResult+")");  
	var pickSiteListHTML = "";
	var pickDateHTML = "";
	
	if(jsonO.pickViewList.length!=0){
		for(var i=0;i<jsonO.pickViewList.length;i++){ 
			pickSiteListHTML = pickSiteListHTML+ "<div class='item ";
			if(jsonO.pickViewList[i].selected==true){
				pickSiteListHTML = pickSiteListHTML+ " item-selected";
			}
			pickSiteListHTML = pickSiteListHTML+ "'> <div class='label' style='width:210px;'>";
			
			if(jsonO.pickViewList[i].cabinetAvailable==false){
				pickSiteListHTML = pickSiteListHTML+ " <input name='pick' onclick='showPickDateList(this)' id='sment-address-c"+ jsonO.pickViewList[i].pickId+"' disabled";
			}else{
				pickSiteListHTML = pickSiteListHTML+ " <input name='pick' onclick='showPickDateList(this)' id='sment-address-c"+ jsonO.pickViewList[i].pickId+"'";
				if(jsonO.pickViewList[i].selected==true){
					pickSiteListHTML = pickSiteListHTML+ " checked ";
				}
			}
			pickSiteListHTML = pickSiteListHTML+ " class='hookbox' value='"+jsonO.pickViewList[i].pickId+"' type='radio'/> ";
			pickSiteListHTML = pickSiteListHTML+ " <label for='sment-address-c"+jsonO.pickViewList[i].pickId+"'>"+jsonO.pickViewList[i].pickName;
			if(jsonO.pickViewList[i].used==true){
				pickSiteListHTML = pickSiteListHTML+ " <span class='orange'>[常用]</span><font color='red'></font>";
			}
			if(jsonO.pickViewList[i].cabinetAvailable==false){
				pickSiteListHTML = pickSiteListHTML+ " <span class='orange'>[已满]</span><font color='red'></font>";
			}
			if(jsonO.pickViewList[i].limitKeyword=="1"){
				pickSiteListHTML = pickSiteListHTML+ " <span class='orange'>[限]</span><font color='red'></font>";
			}
			pickSiteListHTML = pickSiteListHTML+ " </label></div> ";
			pickSiteListHTML = pickSiteListHTML+ " <div class='field'> ";
			pickSiteListHTML = pickSiteListHTML+ " <span class='tip'> ";
			pickSiteListHTML = pickSiteListHTML+ jsonO.pickViewList[i].address+"&nbsp;&nbsp;<a style='TEXT-DECORATION:none' target='_blank' href='"+jsonO.pickViewList[i].mapUrl+"'>"+jsonO.pickViewList[i].helpMessage+"</a> ";
			pickSiteListHTML = pickSiteListHTML+ " </span> ";
			pickSiteListHTML = pickSiteListHTML+ " </div> ";
			pickSiteListHTML = pickSiteListHTML+ " </div> ";
			
			if(jsonO.pickViewList[i].limitKeyword=="1" && jsonO.pickViewList[i].specialRemark!=""){
				pickSiteListHTML = pickSiteListHTML+ "<div class='item limit-lab'><input id='' class='hookbox' type='radio' name='' disabled='disabled'><span>"+jsonO.pickViewList[i].specialRemark+"</span></div>";
			}
		}
	} 	
	if(jsonO.codDateList.length!=0){
		for(var j=0;j<jsonO.codDateList.length;j++){ 
			pickDateHTML = pickDateHTML+"<option value='"+jsonO.codDateList[j].codDate+"'";
			if(jsonO.codDateList[j].codDate==jsonO.selectedPickCodDate){
				pickDateHTML = pickDateHTML+" selected ";
			}
			pickDateHTML = pickDateHTML + ">"+jsonO.codDateList[j].name+"</option>";
		} 
	}
	$("#pickSiteInfo").html(pickSiteListHTML);
	$("#pickDate").html(pickDateHTML);
	
}
function showPickDateList(obj){
	var pickid = $(obj).attr("value");
	var param = "pickid="+pickid;
    param = addFlowTypeParam(param);
	// $(obj).parent().parent().css("class","item item-selected");
	$(obj).parent().parent().addClass('item-selected').siblings().removeClass('item-selected');
	jQuery.ajax({
		type : "POST",
		dataType : "text",
		url : OrderAppConfig.AsyncDomain
				+ "/payAndShip/getPickSiteDate.action",
		data : param,
		cache : false,
		success : function(dataResult, textStatus) {
			// 没有登录跳登录
			var jsonO = eval("("+dataResult+")");  
			var pickDateHTML = "";
				for(var i=0;i<jsonO.length;i++){ 
					pickDateHTML = pickDateHTML+"<option value='"+jsonO[i].codDate+"'>"+jsonO[i].name+"</option>";
				} 
			$("#pickDate").html(pickDateHTML);
		},
		error : function(XMLHttpResponse) {
			alert("系统繁忙，请稍后再试！");
			return false;
		}
	});
}

function showFerightInsure(){
//	var popVenderIdStr=$("#cartVenderIdStr").val();
//	if(popVenderIdStr==""){
//		return;
//	}
//	var param = "popVenderIdStr="+popVenderIdStr;
//	param = addFlowTypeParam(param);
//	jQuery.ajax( {
//		type : "POST",
//		url : OrderAppConfig.AsyncDomain + "/showFerightInsure.action",
//		data : param,
//		cache : false,
//		dataType: "json",
//		success : function(dataResult) {
//			if(dataResult.venderNameList&&dataResult.venderNameList.length>0){
//				var showShopName="";
//				for(var i=0;i<dataResult.venderNameList.length;i++){
//					if(i<dataResult.venderNameList.length-1){
//						showShopName+=dataResult.venderNameList[i]+"、";
//					}else{
//						showShopName+=dataResult.venderNameList[i];
//					}
//				}
//				var showHtml="<i class=\"yfx\"></i>"+showShopName+" 店铺为您购买了运费险，最高赔付20.00元/单。";
//				$("#showFerightInsure").addClass("review-tbody");
//				$("#showFerightInsure").html(showHtml);
//			}
//		},
//		error : function(XMLHttpResponse) {
//		}
//	});
}

function showFerightSopName(){
    if($("#transport").html()!=null){
		var popVenderIdStr = "";
		$("#transport #freightSopNames li").each(function() {
			popVenderIdStr += $(this).attr("venderId")+",";
		});
		popVenderIdStr = popVenderIdStr.substring(0, popVenderIdStr.length-1);
		if(popVenderIdStr == ""){
			showFreight();
			return;
		}
		var param = "popVenderIdStr="+popVenderIdStr;
		param = addFlowTypeParam(param);
		jQuery.ajax( {
			type : "POST",
			url : OrderAppConfig.AsyncDomain + "/showFerightSopName.action",
			data : param,
			cache : false,
			dataType: "json",
			success : function(dataResult) {
				for(var key in dataResult.sopNameMap){  
					$("#transport #freightSopNames li").each(function() {
						if($(this).attr("venderId")==key){
							if(dataResult.sopNameMap[key] != null && dataResult.sopNameMap[key] != "undefined"){
								if(dataResult.sopNameMap[key].length>16)
									dataResult.sopNameMap[key] = dataResult.sopNameMap[key].substring(0,15)+"...";
								$(this).attr("venderId","");
								$(this).children("label").html(dataResult.sopNameMap[key]);
							}
						}
					});
				} 
				showFreight();
			},
			error : function(XMLHttpResponse) {
				showFreight();
			}
		});
    }
}

function showFreight(){
	var obj=$("#freightSpan");
    if($("#transport").html()!=null){
		 $("#transport").css({
							position:"absolute",
							top:(obj.offset().top)+"px",
							left:(obj.offset().left-345)+"px",
							display:"block"
			               });
	}
}
function checkShowOpenPwd(showOpenPayPwd,existsJdbeanPromotion,checkJdbeanPromotion){
	if(existsJdbeanPromotion == true) {
		if(showOpenPayPwd==false){
			$("#paypasswordPanel").show();
			if(checkJdbeanPromotion==false){
				$("#submit_message").html("<span>京豆不足,不能使用京豆优惠购,点击<a href='http://cart.jd.com/cart/cart.html?outBean=1'>返回购物车 </a></span> ").show();
			}
		}else{
			$("#submit_message").html("<span>为保障您的账户资金安全，京豆暂时不可用，请先<a href='http://safe.jd.com/user/paymentpassword/safetyCenter.action' target='_blank'>开启支付密码 </a></span> ").show();	
		}
	}
}


function operate_presaleMobile(thisObj){
	if($("#presaleMobile input").size()>0){//点击保存
		var mobile=$("#presaleMobile input").val();
		if(testMobile(mobile)){
			$("#presaleMobile").html("<strong class=\"phone-num\" id=\"userMobileByPresale\" >"+mobile+"</strong></span>");
			$("#hiddenUserMobileByPresale").val(mobile);
			$(thisObj).html("修改");
			$("#cancelOperatePresaleMob").hide();
		}else{
			var html="<input type=\"text\" class=\"itxt error-itxt\" maxlength=\"11\"><span class=\"error-msg\">请输入正确的手机号</span></span>";
			$("#presaleMobile").html(html);
		}
	}else{//点击修改
		$("#presaleMobile").html("<input type=\"text\"  class=\"itxt focus-itxt\" maxlength=\"11\"/>"); 
		$("#presaleMobile input").focus();
		$(thisObj).html("保存");
		if($("#cancelOperatePresaleMob").size()>0){
			$("#cancelOperatePresaleMob").show();
		}else{
			var copm=$("<a href=\"#none\" class=\"a-link\" id=\"cancelOperatePresaleMob\">取消</a>");
			copm.bind("click",function(){
				$("#presaleMobile").html("<strong id=\"userMobileByPresale\" class=\"phone-num\">"+$("#hiddenUserMobileByPresale").val()+"</strong></span>");
				$("#cancelOperatePresaleMob").hide();
				$("#operatePresaleMobile").html("修改");
			})
			$(thisObj).after(copm).after("&nbsp;");
		}
	}
}

function check_presaleMobile(){
	var mobile="";
	if($("#presaleMobile input").size()>0){
		mobile=$("#presaleMobile input").val();
	}else{
		mobile=$("#userMobileByPresale").html();
	}
	if(testMobile(mobile)){
		return true;
	}else{
		return false;
	}
}

// 结算页手机号标准
function testMobile(mobile){
	var myreg = /^1[3|4|5|8]\d{9}/;
	return myreg.test(mobile);
}

/**
 * 预售支付方式选择器
 * @param id
 */
function choosePresaleType(thisObj) {
	if($(thisObj).attr("id") == "EarnestPayRadio"){
		$("#presaleEarnOnlyList").show();
		$("#presaleEarnOnlyInfo").show();
		$("#presaleAllPayList").hide();
	}else{
		$("#presaleEarnOnlyList").hide();
		$("#presaleEarnOnlyInfo").hide();
		$("#presaleAllPayList").show();
	}
}
/**
 * 异步请求获取唐久商品icon
 */
function showTangJiuSkuIcon(){
//	var skuIdAndNums=$("#mainSkuIdAndNums").val();
//	var areaIds = $("#hideAreaIds").val();
//	if(isEmpty(skuIdAndNums) || isEmpty(areaIds) ){
//		return ;
//	}
//	var param = "areaIds="+areaIds+"&skuIdAndNums="+skuIdAndNums;
//    param = addFlowTypeParam(param);
//	jQuery.ajax({
//		type : "POST",
//		url : OrderAppConfig.AsyncDomain + "/showTangJiuSkuIcon.action",
//		data : param,
//		cache : false,
//		dataType: "json",
//		success : function(dataResult) {
//			var skuicons = eval(dataResult);
//			if(!skuicons || skuicons =='false'){
//				return;
//			}
//			for(var i=0;i < skuicons.length;i++){
//				var arrIcons = skuicons[i].icons;
//				if(arrIcons != null && arrIcons.length > 0){
//					for(var j = 0 ;j < arrIcons.length ;j++){
//						if(arrIcons[j] == 1 || arrIcons[j] == "1"){
//							if($("#speedFreightNote").length >0 && $("#speedFreightNote").html().length>0 ){
//								$("#promise_"+skuicons[i].skuId).append("<a class='promisejsd' title='下单后或支付成功后3小时送达，运费49元' href='javascript:void(0);'></a>");
//							}
//						}else if(arrIcons[j] == 2 || arrIcons[j] == "2"){
//							$("#promise_"+skuicons[i].skuId).append("<a class='promisexsd' title='9:00-18:00下单，一小时内送达' href='javascript:void(0);'></a>");
//
//						}
//						
//					}
//				}
//			}
//		},
//		error : function(XMLHttpResponse) {
//		}
//	});
}



/**
 * 使用兑换码兑换优惠券 Author:曹森 DateTime:2014/04/23 16:00
 * 
 * @param
 */
function exchangeCoupons(obj) {

	if ($('#couponKeyPressFirst').val() == ""
			|| $('#couponKeyPressSecond').val() == ""
			|| $('#couponKeyPressThrid').val() == ""
			|| $('#couponKeyPressFourth').val() == "") {
		alert("请输入优惠券兑换码");
		return;
	}
	var key = $("#couponKeyPressFirst").val() 
			+ $("#couponKeyPressSecond").val() 
			+ $("#couponKeyPressThrid").val() 
			+ $("#couponKeyPressFourth").val();
	// TODO
	$("input[id^='couponKeyPress']").each(function() {
		$(this).val("");
	});
	var param = "couponParam.couponKey=" + key;
	param = addFlowTypeParam(param);
	jQuery.ajax( {
				type : "POST",
				dataType : "json",
				url : OrderAppConfig.AsyncDomain + "/coupon/exchangeCoupons.action",
				data : param,
				async : true,
				cache : false,
				success : function(result) {
					if (isUserNotLogin(result)) {
						goToLogin();
						return;
					}
					if (!result.resultFlag) {
						var message = result.message;
						alert(message);
						if(obj.checked) {
							obj.checked=false;
						}
						return;
					}
					
					changeClassStyle(orderCouponId, toggleWrap);
					changeClassStyle(orderCouponItem, itemToggleActive);
					alert(result.message);
					$("#" + orderCouponId).css('display', 'none');
					query_coupons();
					showEntityPanel();
		}
	});

}

function shipmentToggle(th){
	if($(th).attr("id")=="jd-shipment"){// 选择京东配送
		$(th).parent().parent().addClass("item-selected");
		$("#pick-shipment").parent().parent().removeClass("item-selected");
		
		$("#jd-shipment-way-category").addClass("way-category-selected");
		$("#pick-shipment-way-category").removeClass("way-category-selected");
		
		$("#jd-show-sku-count").show();
		$("#jd-shipment-extend-info").show();
		
		if(!isEmpty($("#pick-shipment").val())){
			$("#pick-shipment").attr("checked",false);
			$("#pick-show-sku-count").hide();
			$("#pick-shipment-extend-info").hide();
			$("#subway-sment").hide();
		}
		
	}else if($(th).attr("id")=="pick-shipment"){// 选择自提
		$(th).parent().parent().addClass("item-selected");
		$("#pick-shipment-way-category").addClass("way-category-selected");
		
		if(!isEmpty($("#jd-shipment").val())){
			$("#jd-shipment").parent().parent().removeClass("item-selected");
			$("#jd-shipment").attr("checked",false);			
		}

		if(!isEmpty($("#other-shipment").val())){
			$("#other-shipment").parent().parent().removeClass("item-selected");
			$("#other-shipment").attr("checked",false);
		}
		
		if(!isEmpty($("#jd-shipment-way-category").html())){
			$("#jd-shipment-way-category").removeClass("way-category-selected");
		}
		
		if(!isEmpty($("#other-shipment-way-category").html())){
			$("#other-shipment-way-category").removeClass("way-category-selected");
		}
		
		
		$("#pick-show-sku-count").show();
		$("#pick-shipment-extend-info").show();
		$("#subway-sment").show();
		if(!isEmpty($("#jd-shipment-extend-info").html())) $("#jd-shipment-extend-info").hide();
		if(!isEmpty($("#other-shipment-extend-info").html())) $("#other-shipment-extend-info").hide();
		
		if(!isEmpty($("#jd-show-sku-count").html())) $("#jd-show-sku-count").hide();
		if(!isEmpty($("#other-show-sku-count").html())) $("#other-show-sku-count").hide();
	
	}else if($(th).attr("id")=="other-shipment"){// 选择京东三方配送
		$(th).parent().parent().addClass("item-selected");
		$("#pick-shipment").parent().parent().removeClass("item-selected");
		
		$("#other-shipment-way-category").addClass("way-category-selected");
		$("#pick-shipment-way-category").removeClass("way-category-selected");
		
		$("#other-shipment-extend-info").show();
		$("#other-show-sku-count").show();
		
		if(!isEmpty($("#pick-shipment").val())){
			$("#pick-shipment").attr("checked",false);
			$("#pick-show-sku-count").hide();
			$("#pick-shipment-extend-info").hide();
			$("#subway-sment").hide();
		}

	}
}
