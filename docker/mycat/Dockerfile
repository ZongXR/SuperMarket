FROM openjdk:8
MAINTAINER ZongXiangrui<zxr@tju.edu.cn>
RUN cd /opt && wget https://raw.githubusercontent.com/MyCATApache/Mycat-download/master/1.5-RELEASE/Mycat-server-1.5.1-RELEASE-20161130213509-linux.tar.gz
RUN cd /opt && tar -zxvf /opt/Mycat-server-1.5.1-RELEASE-20161130213509-linux.tar.gz
RUN rm -rf /opt/Mycat-server-1.5.1-RELEASE-20161130213509-linux.tar.gz
RUN rm -rf /opt/mycat/conf/*
VOLUME ["/opt/mycat/conf/"]
WORKDIR /opt/mycat/bin
ENV MYCAT_HOME=/opt/mycat
ENV PATH="${MYCAT_HOME}/bin:${PATH}"
EXPOSE 8066 9066
CMD ["console"]
ENTRYPOINT ["mycat"]