package de.fhdortmund.blutentnahmebackend.entity;

import org.springframework.context.annotation.Bean;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Auftrag")
public class Auftrag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer auftragsId;

    @Column(name = "GeplanterZeitpunkt")
    private LocalDateTime geplanterZeitpunkt;

    @ManyToOne
    @JoinColumn(name = "PatientID", referencedColumnName = "PatientID")
    private Patient patient;

    // Konstruktor
    public Auftrag() {
    }

    // Getter und Setter Methoden
    public Integer getAuftragsId() {
        return auftragsId;
    }

    public void setAuftragsId(Integer auftragsId) {
        this.auftragsId = auftragsId;
    }

    public LocalDateTime getGeplanterZeitpunkt() {
        return geplanterZeitpunkt;
    }

    public void setGeplanterZeitpunkt(LocalDateTime geplanterZeitpunkt) {
        this.geplanterZeitpunkt = geplanterZeitpunkt;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
}
