package com.supermarket.filter;

import com.supermarket.utils.JDBCUtils;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import java.io.IOException;

@WebFilter(filterName = "UseDataSource")
public class UseDataSource implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        String datasource = filterConfig.getServletContext().getInitParameter("datasource");
        JDBCUtils.setPool(datasource);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {

    }
}
