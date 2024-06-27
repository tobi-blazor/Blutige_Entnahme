package de.fhdortmund.blutentnahmebackend;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
public class Auftrag {
    @Id
    @Column(name = "AuftragsID", nullable = false)
    private Integer id;

    @Column(name = "GeplanterZeitpunkt")
    private Instant geplanterZeitpunkt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PatientID")
    private Patient patientID;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Instant getGeplanterZeitpunkt() {
        return geplanterZeitpunkt;
    }

    public void setGeplanterZeitpunkt(Instant geplanterZeitpunkt) {
        this.geplanterZeitpunkt = geplanterZeitpunkt;
    }

    public Patient getPatientID() {
        return patientID;
    }

    public void setPatientID(Patient patientID) {
        this.patientID = patientID;
    }

}