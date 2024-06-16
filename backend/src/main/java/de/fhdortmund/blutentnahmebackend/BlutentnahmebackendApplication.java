package de.fhdortmund.blutentnahmebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class BlutentnahmebackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlutentnahmebackendApplication.class, args);
	}

}
