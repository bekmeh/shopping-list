# ----- STEP 1: BUILD -----
FROM gradle:6.0.1-jdk11 as springboot-build

# The default user for the gradle image is "gradle", so we need to use chown for correct permissions
COPY --chown=gradle:gradle . /home/gradle/src

# Working directory for the docker image
WORKDIR /home/gradle/src

# Build the spring boot app
RUN gradle build --no-daemon


# ----- STEP 2: SERVE -----
FROM openjdk:11.0-jre-slim

# Expose so we can access the spring boot app
EXPOSE 8080

# Create folder and copy .war file into it
RUN mkdir /app
COPY --from=springboot-build /home/gradle/src/build/libs/*.war /app/spring-boot-application.war

ENTRYPOINT ["java", "-XX:+UnlockExperimentalVMOptions", "-Djava.security.egd=file:/dev/./urandom","-jar","/app/spring-boot-application.war"]