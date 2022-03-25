# create elasticsearch subnet
docker network create --driver bridge --subnet 192.166.0.0/16 --gateway 192.166.0.1 net-es

# set the vm memory
echo "vm.max_map_count=262144" >> /etc/sysctl.conf
sysctl -w vm.max_map_count=262144

# start es nodes
docker run -d --name es-1 --restart always --net net-es -p 9201:9200 -p 9301:9300 -e "discovery.zen.ping.unicast.hosts=es-2,es-3" zongxr/elasticsearch:6.8.6
docker run -d --name es-2 --restart always --net net-es -p 9202:9200 -p 9302:9300 -e "discovery.zen.ping.unicast.hosts=es-1,es-3" zongxr/elasticsearch:6.8.6
docker run -d --name es-3 --restart always --net net-es -p 9200:9200 -p 9300:9300 -e "discovery.zen.ping.unicast.hosts=es-1,es-2" zongxr/elasticsearch:6.8.6
sleep 30s

# check the cluster
docker exec es-1 curl -XGET 'http://es-3:9200/_cluster/health?pretty'

# crack
docker exec es-1 curl -XPUT -u elastic:changeme  -H "Content-Type: application/json"  -d @license.json "http://es-3:9200/_xpack/license"
docker exec es-1 curl -XGET -u elastic:changeme 'http://es-3:9200/_license'