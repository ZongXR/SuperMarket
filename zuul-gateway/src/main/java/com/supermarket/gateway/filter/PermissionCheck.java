package com.supermarket.gateway.filter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import com.supermarket.common.utils.CookieUtils;
import com.supermarket.gateway.service.UserService;
import com.supermarket.gateway.utils.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Component
public class PermissionCheck extends ZuulFilter {

    @Autowired
    private UserService userService = null;

    /**
     * 需要鉴权的路径及需要的权限等级
     */
    @Value("#{${custom.uri.check}}")
    private Map<String, Integer> uriCheck = null;

    /**
     * 直接禁止的路径
     */
    @Value("#{'${custom.uri.forbidden}'.split(',')}")
    private List<String> uriForbidden = null;

    @Override
    public String filterType() {
        return "pre";
    }

    @Override
    public int filterOrder() {
        return 0;
    }

    /**
     * 如果路径包含在鉴权列表中，则进入鉴权逻辑
     * @return 路径是否在鉴权列表中
     */
    @Override
    public boolean shouldFilter() {
        RequestContext currentContext = RequestContext.getCurrentContext();
        HttpServletRequest request = currentContext.getRequest();
        String uri=request.getRequestURI();
        uri = WebUtils.removeExtraSlashOfUrl(uri);
        return this.uriCheck.containsKey(uri) || this.uriForbidden.contains(uri);
    }

    /**
     * 鉴权逻辑
     * @return 空
     * @throws ZuulException 抛出
     */
    @Override
    public Object run() throws ZuulException {
        RequestContext currentContext = RequestContext.getCurrentContext();
        HttpServletRequest request = currentContext.getRequest();
        HttpServletResponse response = currentContext.getResponse();
        String uri=request.getRequestURI();
        uri = WebUtils.removeExtraSlashOfUrl(uri);
        if (this.uriForbidden.contains(uri)){
            // TODO 禁止访问地址
            response.setContentType("text/html;charset=utf-8");
            currentContext.setSendZuulResponse(false);
            currentContext.setResponseStatusCode(401);
            //携带一个响应数据
            currentContext.setResponseBody("越权访问");
            return null;
        }else if (this.uriCheck.containsKey(uri)){
            // TODO 需要鉴权
            String ticket = CookieUtils.getCookieValue(request, "EM_TICKET", true);
            Integer userType = this.userService.queryUserType(ticket);
            if (userType == null || userType < this.uriCheck.get(uri)){
                // 越权访问
                response.setContentType("text/html;charset=utf-8");
                currentContext.setSendZuulResponse(false);
                currentContext.setResponseStatusCode(401);
                //携带一个响应数据
                currentContext.setResponseBody("越权访问");
            }
            return null;
        }else {
            // TODO 放过
            return null;
        }
    }
}
