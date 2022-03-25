# 启动注册中心
docker network create --driver bridge --subnet 192.165.0.0/16 --gateway 192.165.0.1 net-app
docker run -d --name supermarket-common-1 --restart always --net net-app -p 10000:10000 zongxr/supermarket-common:1.0-SNAPSHOT
docker network connect net-es supermarket-common-1
