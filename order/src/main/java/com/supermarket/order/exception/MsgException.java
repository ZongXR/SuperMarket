package com.supermarket.order.exception;

public class MsgException extends RuntimeException{
    /**
     * 韩餐构造方法
     * @param message 在网页中的提示信息
     */
    public MsgException(String message) {
        super(message);
    }

    /**
     * 获取提示信息
     * @return 在网页中的提示信息
     */
    @Override
    public String getMessage() {
        return super.getMessage();
    }
}
