FROM openjdk:11.0.7-jre
MAINTAINER ZongXiangrui<zxr@tju.edu.cn>
ENV APP_PORT=10003
ENV CUSTOM_IMGLOCAL=/opt/supermarketimg/
ENV CUSTOM_IMGWEB=http://image.supermarket.com/
EXPOSE ${APP_PORT}
VOLUME ${CUSTOM_IMGLOCAL}
ARG JAR_FILE
WORKDIR /opt
COPY target/${JAR_FILE} /opt/app.jar
CMD ["java", "-version"]
ENTRYPOINT ["java", "-jar", "/opt/app.jar"]