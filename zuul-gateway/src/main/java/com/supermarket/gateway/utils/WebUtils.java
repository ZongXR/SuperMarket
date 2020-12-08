package com.supermarket.gateway.utils;

public class WebUtils {
    /**
     * 移除url中多余的斜杠
     * @param url url
     * @return 移除后的结果
     */
    public static String removeExtraSlashOfUrl(String url) {
        if (url == null || url.length() == 0) {
            return url;
        }
        return url.replaceAll("(?<!(http:|https:))/+", "/");
    }
}
