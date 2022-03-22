docker exec -it redis-1 \
/usr/local/bin/redis-trib.rb create --replicas 1 \
192.168.0.11:6379 \
192.168.0.12:6379 \
192.168.0.13:6379 \
192.168.0.14:6379 \
192.168.0.15:6379 \
192.168.0.16:6379