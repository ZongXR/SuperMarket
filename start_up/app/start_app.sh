# 启动注册中心
docker network create --driver bridge --subnet 192.165.0.0/16 --gateway 192.165.0.1 net-app
docker run -d --name supermarket-eureka-1 --restart always --net net-app -p 10000:10000 zongxr/supermarket-eureka:1.0-SNAPSHOT

# 启动商品微服务
docker run -d --name supermarket-product-1 --restart always --net net-app -p 10002:10002 zongxr/supermarket-product:1.0-SNAPSHOT
docker network connect net-mysql supermarket-product-1
docker network connect net-redis supermarket-product-1

# 启动购物车微服务
docker run -d --name supermarket-cart-1 --restart always --net net-app -p 10005:10005 zongxr/supermarket-cart:1.0-SNAPSHOT
docker network connect net-mysql supermarket-cart-1

# 启动订单微服务
docker run -d --name supermarket-order-1 --restart always --net net-app -p 10006:10006 zongxr/supermarket-order:1.0-SNAPSHOT
docker network connect net-mysql supermarket-order-1

