package de.fhdortmund.blutentnahmebackend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface PersonalRepository extends JpaRepository<Personal, Long> {
}
