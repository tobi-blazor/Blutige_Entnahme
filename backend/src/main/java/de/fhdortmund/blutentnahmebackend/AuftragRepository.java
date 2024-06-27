package de.fhdortmund.blutentnahmebackend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuftragRepository extends JpaRepository<Auftrag, Long> {
}
