package de.fhdortmund.blutentnahmebackend.repo;

import de.fhdortmund.blutentnahmebackend.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
