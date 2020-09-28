package com.supermarket.exception;

public class MsgRollbackException extends MsgException{
    /**
     * 韩餐构造方法
     *
     * @param message 在网页中的提示信息
     */
    public MsgRollbackException(String message) {
        super(message);
    }
}
