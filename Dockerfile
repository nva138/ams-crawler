FROM eclipse-temurin:25-jdk AS build
WORKDIR /build
COPY backend/ .
RUN chmod +x mvnw && ./mvnw -q -DskipTests package

FROM eclipse-temurin:25-jre AS jre

FROM mcr.microsoft.com/playwright:v1.61.0-noble
COPY --from=jre /opt/java/openjdk /opt/java/openjdk
ENV JAVA_HOME=/opt/java/openjdk
ENV PATH="$JAVA_HOME/bin:$PATH"

WORKDIR /app
COPY scraper/ /app/scraper/
RUN cd /app/scraper && npm ci
COPY --from=build /build/target/*.jar /app/app.jar

ENV SCRAPER_PATH=/app/scraper
EXPOSE 8081
CMD ["java", "-jar", "/app/app.jar"]
