package de.fhdortmund.blutentnahmebackend;

import org.apache.catalina.core.ApplicationContext;
import org.hibernate.collection.spi.PersistentSortedSet;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class BlutentnahmebackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlutentnahmebackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(PersonalRepository personalRepository) {
		return runner -> {
			Personal personal = new Personal();
			personal.setId(1);
			personal.setGeburtsdatum(LocalDate.now());
			personal.setNachname("schneider");
			personal.setVorname("Jan");
			personalRepository.save(personal);
		};
	}

}
