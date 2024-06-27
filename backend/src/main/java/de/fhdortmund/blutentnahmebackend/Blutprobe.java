package de.fhdortmund.blutentnahmebackend;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
public class Blutprobe {
    @Id
    @Column(name = "ProbeID", nullable = false)
    private Integer id;

    @Lob
    @Column(name = "Grund")
    private String grund;

    @Lob
    @Column(name = "Hinweise")
    private String hinweise;

    @Column(name = "MaxVerweildauer")
    private Integer maxVerweildauer;

    @Column(name = "EntnahmeZeitpunkt")
    private Instant entnahmeZeitpunkt;

    @Column(name = "Laboreingang")
    private Instant laboreingang;

    @ManyToOne
    @JoinColumn(name = "PersonalID")
    private Personal personalID;

    @ManyToOne
    @JoinColumn(name = "AuftragsID")
    private Auftrag auftragsID;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getGrund() {
        return grund;
    }

    public void setGrund(String grund) {
        this.grund = grund;
    }

    public String getHinweise() {
        return hinweise;
    }

    public void setHinweise(String hinweise) {
        this.hinweise = hinweise;
    }

    public Integer getMaxVerweildauer() {
        return maxVerweildauer;
    }

    public void setMaxVerweildauer(Integer maxVerweildauer) {
        this.maxVerweildauer = maxVerweildauer;
    }

    public Instant getEntnahmeZeitpunkt() {
        return entnahmeZeitpunkt;
    }

    public void setEntnahmeZeitpunkt(Instant entnahmeZeitpunkt) {
        this.entnahmeZeitpunkt = entnahmeZeitpunkt;
    }

    public Instant getLaboreingang() {
        return laboreingang;
    }

    public void setLaboreingang(Instant laboreingang) {
        this.laboreingang = laboreingang;
    }

    public Personal getPersonalID() {
        return personalID;
    }

    public void setPersonalID(Personal personalID) {
        this.personalID = personalID;
    }

    public Auftrag getAuftragsID() {
        return auftragsID;
    }

    public void setAuftragsID(Auftrag auftragsID) {
        this.auftragsID = auftragsID;
    }

}