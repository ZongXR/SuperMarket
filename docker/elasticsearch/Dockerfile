FROM elasticsearch:6.8.6
MAINTAINER ZongXiangrui<zxr@tju.edu.cn>
RUN echo "http.cors.enabled: true" >> /usr/share/elasticsearch/config/elasticsearch.yml
RUN echo "http.cors.allow-origin: /.*/" >> /usr/share/elasticsearch/config/elasticsearch.yml
RUN echo "xpack.security.enabled: false" >> /usr/share/elasticsearch/config/elasticsearch.yml
RUN echo "node.name: ${HOSTNAME}" >> /usr/share/elasticsearch/config/elasticsearch.yml
RUN ./bin/elasticsearch-plugin install -b https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v6.8.6/elasticsearch-analysis-ik-6.8.6.zip
RUN ./bin/elasticsearch-plugin install -b https://github.com/NLPchina/elasticsearch-sql/releases/download/6.8.6.0/elasticsearch-sql-6.8.6.0.zip
COPY x-pack-core-6.8.6.jar /usr/share/elasticsearch/modules/x-pack-core/
RUN chown elasticsearch:root /usr/share/elasticsearch/modules/x-pack-core/x-pack-core-6.8.6.jar
COPY license.json /usr/share/elasticsearch
ENV ELASTIC_CONTAINER=true
ENV JAVA_HOME=/opt/jdk-13.0.1+9
ENV ES_JAVA_OPTS="-Xms512m -Xmx512m"
WORKDIR /usr/share/elasticsearch
VOLUME ["/usr/share/elasticsearch/data"]
ENV PATH=/usr/share/elasticsearch/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
EXPOSE 9200 9300
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["eswrapper"]