package com.supermarket.common.utils;

public class TimeUtils {
    /**
     * 获取毫秒时间戳
     * @return 字符串时间戳
     */
    public static String getTimestamp(){
        long timestamp = System.currentTimeMillis();
        return String.format("%013d", timestamp);
    }

    /**
     * 获取去除时间戳之后的内容
     * @param s 原始文字
     * @return 去除时间戳之后的内容
     */
    public static String cutTimestamp(String s){
        if (s.length() < 13)
            return s;
        else
            return s.substring(0, s.length() - 13);
    }

    /**
     * 从字符串中把时间戳取出来
     * @param s 原始字符串
     * @return 其中的时间戳
     */
    public static String subTimestamp(String s){
        if (s.length() < 13)
            return null;
        return s.substring(s.length() - 13);
    }
}
