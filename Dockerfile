# ETAPA 1 (build): compila el proyecto y genera el jar ejecutable.
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Se copia primero el pom solo para descargar las dependencias.
# Docker cachea cada paso: mientras el pom no cambie, esta descarga no se repite
# aunque cambie el codigo fuente. Si copiaramos todo junto, cada cambio en un .java
# obligaria a bajar Maven entero de nuevo.
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

# ETAPA 2 (runtime): imagen final, solo con lo necesario para ejecutar.
# Lleva un JRE (no un JDK) y no incluye Maven ni el codigo fuente:
# la imagen queda mucho mas chica que la de la etapa anterior.
FROM eclipse-temurin:17-jre

WORKDIR /app

# Se trae unicamente el jar ya compilado desde la etapa de build
COPY --from=build /app/target/ecommerce-api-*.jar app.jar

# Documenta que la app escucha en el 8080 (no publica el puerto por si solo)
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
