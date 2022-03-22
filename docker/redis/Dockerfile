FROM redis:3.2.11 AS base
MAINTAINER ZongXiangrui<zxr@tju.edu.cn>
COPY redis-trib.rb /usr/local/bin

FROM ruby:2.2.5-alpine AS requirements
COPY --from=0 / /
ENV GOSU_VERSION=1.10
ENV REDIS_VERSION=3.2.11
ENV REDIS_DOWNLOAD_URL=http://download.redis.io/releases/redis-3.2.11.tar.gz
ENV REDIS_DOWNLOAD_SHA=31ae927cab09f90c9ca5954aab7aeecc3bb4da6087d3d12ba0a929ceb54081b5
VOLUME ["/data"]
WORKDIR /data
COPY redis-3.0.0.gem /usr/local/bin
RUN gem install -l /usr/local/bin/redis-3.0.0.gem
RUN chmod +x /usr/local/bin/redis-trib.rb
ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE 6379/tcp
CMD ["redis-server"]
