package de.fhdortmund.blutentnahmebackend.repo;

import de.fhdortmund.blutentnahmebackend.entity.Blutprobe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlutprobeRepository extends JpaRepository<Blutprobe, Long> {
}
