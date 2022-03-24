# create elasticsearch subnet
docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 net-es

# start es nodes
docker run -d --name es-1 --net net-es -p 9201:9200 -p 9301:9300 -e "discovery.zen.ping.unicast.hosts=es-2,es-3" zongxr/elasticsearch:6.8.6
docker run -d --name es-2 --net net-es -p 9202:9200 -p 9302:9300 -e "discovery.zen.ping.unicast.hosts=es-1,es-3" zongxr/elasticsearch:6.8.6
docker run -d --name es-3 --net net-es -p 9200:9200 -p 9300:9300 -e "discovery.zen.ping.unicast.hosts=es-1,es-2" zongxr/elasticsearch:6.8.6

# check the cluster
docker exec es-1 curl -XGET 'http://es-3:9200/_cluster/health?pretty'

# crack
docker exec es-1 curl -XPUT -u elastic:changeme  -H "Content-Type: application/json"  -d @license.json "http://es-3:9200/_xpack/license"
docker exec es-1 curl -XGET -u elastic:changeme 'http://es-3:9200/_license'