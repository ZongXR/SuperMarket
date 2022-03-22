#!/bin/bash
for port in $(seq 1 6); \
do \
mkdir -p /home/redis/node-${port}/conf
touch /home/redis/node-${port}/conf/redis.conf
cat << EOF > /home/redis/node-${port}/conf/redis.conf
port 6379
bind 0.0.0.0
daemonize no
pidfile "/var/run/redis.pid"
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 15000
appendonly yes
EOF
done

docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 net-redis

for port in $(seq 1 6); \
do \
docker run -d \
-p $((6379+port-1)):6379 \
--name redis-${port} \
--net net-redis \
--ip 192.168.0.1${port} \
--restart always \
-v /home/redis/node-${port}/data:/data \
-v /home/redis/node-${port}/conf/redis.conf:/etc/redis.conf \
zongxr/redis:3.2.11 \
redis-server /etc/redis.conf
done
