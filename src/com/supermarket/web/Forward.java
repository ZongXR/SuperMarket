package com.supermarket.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 该Controller用于访问受保护的jsp页面
 */
@Controller
@RequestMapping("/forward")
public class Forward {
    /**
     * 将.action请求映射到.jsp页面
     * @param path jsp页面路径
     * @return 页面路径
     */
    @RequestMapping("/{path}.action")
    public String forward(@PathVariable String path){
        return path;
    }
}
