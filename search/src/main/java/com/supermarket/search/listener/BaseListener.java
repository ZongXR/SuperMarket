package com.supermarket.search.listener;

import com.supermarket.common.domain.Product;
import com.supermarket.search.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationFailedEvent;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.ContextStoppedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class BaseListener {

    @Autowired
    private SearchService searchService = null;

    /**
     * 启动完成监听器
     * @param event 应用就绪事件
     */
    @EventListener
    public void eventReady(ApplicationReadyEvent event){
        this.searchService.createIndex(Product.class);
    }

    /**
     * 启动失败监听器
     * @param event 启动失败事件
     */
    @EventListener
    public void eventFailed(ApplicationFailedEvent event){
        this.searchService.deleteIndex("supermarket");
    }

    /**
     * 结束运行监听器
     * @param event 结束运行事件
     */
    @EventListener
    public void eventStopped(ContextStoppedEvent event){
        this.searchService.deleteIndex("supermarket");
    }
}
