package com.supermarket.listener;

import com.supermarket.utils.JDBCUtils;
import org.apache.log4j.Logger;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import javax.servlet.http.HttpSessionBindingEvent;
import java.sql.Driver;
import java.sql.DriverManager;
import java.util.Enumeration;

@WebListener()
public class ApplicationListener implements ServletContextListener{
    private Logger log = Logger.getLogger(this.getClass());

    // -------------------------------------------------------
    // ServletContextListener implementation
    // -------------------------------------------------------

    /**
     * web应用启动回调函数，在其中注册JDBC驱动
     * @param sce ServletContext事件
     */
    public void contextInitialized(ServletContextEvent sce) {
        String datasource = sce.getServletContext().getInitParameter("datasource");
        JDBCUtils.setPool(datasource);
        log.debug("web应用已创建");
    }

    /**
     * 销毁web应用的回调函数，在其中取消注册JDBC
     * @param sce ServletContext销毁事件
     */
    public void contextDestroyed(ServletContextEvent sce) {
        try {
            Enumeration<Driver> drivers = DriverManager.getDrivers();
            while(drivers.hasMoreElements()) {
                DriverManager.deregisterDriver(drivers.nextElement());
            }
        } catch(Exception e) {
            e.printStackTrace();
            log.error("取消注册JDBC时出错");
        }
        log.debug("web应用已销毁");
    }
}
