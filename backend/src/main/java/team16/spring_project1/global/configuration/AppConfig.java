package team16.spring_project1.global.configuration;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
  public static String getSiteFrontUrl() {
    return "http://localhost:3000";
  }
  //public static String getStaticDirectory() {return "/NBE3-4-1-16Team/backend/src/main/resources/static/"; }
  public static String getStaticDirectory() {return "C://"; }
  public static String getImagesFolder() {return "images/";}
}
