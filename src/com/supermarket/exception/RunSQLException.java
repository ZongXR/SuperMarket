package com.supermarket.exception;

import org.apache.log4j.Logger;

public class RunSQLException extends RuntimeException{
    private Logger log = Logger.getLogger(this.getClass());
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

    /**
     * 打印错误信息
     */
    @Override
    public void printStackTrace() {
        super.printStackTrace();
        log.error(this.getMessage());
    }
}
