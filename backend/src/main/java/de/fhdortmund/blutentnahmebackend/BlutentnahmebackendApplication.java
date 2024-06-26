package de.fhdortmund.blutentnahmebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "de.fhdortmund.blutentnahmebackend.repo")
public class BlutentnahmebackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlutentnahmebackendApplication.class, args);
	}

}
