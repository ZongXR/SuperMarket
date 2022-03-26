FROM openjdk:11.0.7-jre
MAINTAINER ZongXiangrui<zxr@tju.edu.cn>
ENV APP_PORT=10006
EXPOSE ${APP_PORT}
ARG JAR_FILE
WORKDIR /opt
COPY target/${JAR_FILE} /opt/app.jar
CMD ["java", "-version"]
ENTRYPOINT ["java", "-jar", "/opt/app.jar"]