package com.supermarket;


public class WebUtils {
    /**
     * 工具类，私有化构造方法
     * */
    private WebUtils(){
    }

    /**
     * 判断字符串是否为空
     * @param value 传入的字符串
     * @return 字符串是否为空
     * */
    public static boolean isNull(String value){
        return value == null || value.length() == 0;
    }




}
