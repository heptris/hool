package com.ssafy.hool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class HoolApplication {

	public static void main(String[] args) {
		SpringApplication.run(HoolApplication.class, args);
	}

}
