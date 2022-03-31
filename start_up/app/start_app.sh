# 启动注册中心
docker network create --driver bridge --subnet 192.165.0.0/16 --gateway 192.165.0.1 net-app
docker run -d --name supermarket-eureka-1 --restart always --net net-app -p 10000:10000 zongxr/supermarket-eureka:1.0-SNAPSHOT

# 启动商品微服务
docker run -d --name supermarket-product-1 --restart always --net net-app -p 10002:10002 zongxr/supermarket-product:1.1.0.0
docker network connect net-mysql supermarket-product-1
docker network connect net-redis supermarket-product-1

# 启动购物车微服务
docker run -d --name supermarket-cart-1 --restart always --net net-app -p 10005:10005 zongxr/supermarket-cart:1.0-SNAPSHOT
docker network connect net-mysql supermarket-cart-1

# 启动订单微服务
docker run -d --name supermarket-order-1 --restart always --net net-app -p 10006:10006 zongxr/supermarket-order:1.0-SNAPSHOT
docker network connect net-mysql supermarket-order-1

# 启动用户微服务
docker run -d --name supermarket-user-1 --restart always --net net-app -p 10004:10004 zongxr/supermarket-user:1.0-SNAPSHOT
docker network connect net-mysql supermarket-user-1
docker network connect net-redis supermarket-user-1

# 启动网关
docker run -d --name supermarket-gateway-1 --restart always --net net-app -p 10001:10001 zongxr/supermarket-gateway:1.0-SNAPSHOT

# 启动图片微服务
docker run -d --name supermarket-image-1 --restart always -v /opt/supermarketimg:/opt/supermarketimg --net net-app -p 10003:10003 zongxr/supermarket-image:1.0-SNAPSHOT
docker network connect net-redis supermarket-image-1

# 启动检索微服务
docker run -d --name supermarket-search-1 --restart always --net net-app -p 10007:10007 zongxr/supermarket-search:1.1.0.0
docker network connect net-es supermarket-search-1

# 启动instant-buy微服务
docker run -d --name rabbitmq --restart always --net net-app -p 5672:5672 -p 15672:15672 rabbitmq:3.7.7
docker exec rabbitmq /usr/lib/rabbitmq/bin/rabbitmq-plugins enable rabbitmq_management
docker run -d --name supermarket-instantbuy-1 --restart always --net net-app -p 10008:10008 zongxr/supermarket-instantbuy:1.0-SNAPSHOT
docker network connect net-mysql supermarket-instantbuy-1
docker network connect net-redis supermarket-instantbuy-1

# 启动 nginx
cp ./nginx.conf /home/nginx
cp ../supermarketimg /opt
cp ../supermarketstatic /opt
docker run -d --name nginx --restart always -v /home/nginx/nginx.conf:/etc/nginx/nginx.conf -v /opt:/opt --net net-app -p 80:80 nginx:1.19.1