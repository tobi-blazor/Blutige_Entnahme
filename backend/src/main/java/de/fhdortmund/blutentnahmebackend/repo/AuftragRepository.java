package de.fhdortmund.blutentnahmebackend.repo;

import de.fhdortmund.blutentnahmebackend.entity.Auftrag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuftragRepository extends JpaRepository<Auftrag, Long> {
}
