package com.supermarket.exception;

public class RunSQLException extends RuntimeException{
    /**
     * 含参构造方法
     * @param message SQL错误提示
     */
    public RunSQLException(String message) {
        super(message);
    }

    /**
     * 获取提示信息
     * @return SQL错误提示
     */
    @Override
    public String getMessage() {
        return super.getMessage();
    }
}
