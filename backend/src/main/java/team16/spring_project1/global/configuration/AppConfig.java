package team16.spring_project1.global.configuration;

import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
  public static String getSiteFrontUrl() {
    return "http://localhost:3000";
  }

}
