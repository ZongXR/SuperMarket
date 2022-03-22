docker exec -it es-1 \
curl -XPUT \
-u elastic:changeme \
 -H "Content-Type: application/json" \
 -d @license.json \
"http://127.0.0.1:9200/_xpack/license"