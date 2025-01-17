plugins {
	java
	id("org.springframework.boot") version "3.4.1"
	id("io.spring.dependency-management") version "1.1.7"
}

group = "team16"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(23)
	}
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	// Spring Data JPA
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")

	// Validation
	implementation("org.springframework.boot:spring-boot-starter-validation")

	// Spring Web
	implementation("org.springframework.boot:spring-boot-starter-web")

	// Lombok
	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")

	// Spring DevTools
	developmentOnly("org.springframework.boot:spring-boot-devtools")

	// H2 Database
	runtimeOnly("com.h2database:h2")

	// Spring Boot Test
	testImplementation("org.springframework.boot:spring-boot-starter-test")

	// JUnit Platform Launcher
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")

	// Springdoc OpenAPI for Swagger UI
	implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.1")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
