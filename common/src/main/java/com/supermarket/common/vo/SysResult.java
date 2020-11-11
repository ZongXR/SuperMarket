package com.supermarket.common.vo;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SysResult {
    //表示状态码的数字
    private Integer status;
    //携带详细信息的字符串
    private String msg;
    //携带的各种数据
    private Object data;

    /**
     * 带参构造
     * @param status 状态
     * @param msg 信息
     * @param data 数据
     */
    public SysResult(Integer status, String msg, Object data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }

    /**
     * 无参构造
     */
    public SysResult() {
        // TODO Auto-generated constructor stub
    }

    /**
     * 返回状态
     * @param status 200成功，其他失败
     * @param msg ok成功，其他失败
     * @param data 数据
     * @return vo
     */
    public static SysResult build(Integer status, String msg, Object data) {
        return new SysResult(status, msg, data);
    }

    /**
     * 状态
     *
     * @return 成功
     */
    public static SysResult ok() {
        return new SysResult(200, "ok", null);
    }

    /**
     * 状态
     *
     * @param data vo要封装的数据
     * @return vo
     */
    public static SysResult ok(Object data) {
        return new SysResult(200, "ok", data);
    }
}
