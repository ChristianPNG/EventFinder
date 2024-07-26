package com.soloproject.EventFinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class EventFinderApplication {

	public static void main(String[] args) {
		//System.out.println("Classpath: " + System.getProperty("java.class.path"));
		Dotenv dotenv = Dotenv.configure().directory("./Backend").filename(".env").load();
        
        // Set environment variables for Spring Boot
        System.setProperty("LOCAL_ADDR", dotenv.get("LOCAL_ADDR"));
        System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
        System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		SpringApplication.run(EventFinderApplication.class, args);
	}

}
