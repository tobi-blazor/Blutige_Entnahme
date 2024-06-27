package de.fhdortmund.blutentnahmebackend;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Blutprobe")
public class Blutprobe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer probeId;

    @Column(name = "Grund")
    private String grund;

    @Column(name = "Hinweise")
    private String hinweise;

    @Column(name = "MaxVerweildauer")
    private int maxVerweildauer;

    @Column(name = "EntnahmeZeitpunkt")
    private LocalDateTime entnahmeZeitpunkt;

    @Column(name = "Laboreingang")
    private LocalDateTime laboreingang;

    @ManyToOne
    @JoinColumn(name = "PersonalID", referencedColumnName = "PersonalID")
    private Personal personal;

    @ManyToOne
    @JoinColumn(name = "AuftragsID", referencedColumnName = "AuftragsID")
    private Auftrag auftrag;

    // Konstruktor
    public Blutprobe() {
    }

    // Getter und Setter Methoden
    public Integer getProbeId() {
        return probeId;
    }

    public void setProbeId(Integer probeId) {
        this.probeId = probeId;
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

    public int getMaxVerweildauer() {
        return maxVerweildauer;
    }

    public void setMaxVerweildauer(int maxVerweildauer) {
        this.maxVerweildauer = maxVerweildauer;
    }

    public LocalDateTime getEntnahmeZeitpunkt() {
        return entnahmeZeitpunkt;
    }

    public void setEntnahmeZeitpunkt(LocalDateTime entnahmeZeitpunkt) {
        this.entnahmeZeitpunkt = entnahmeZeitpunkt;
    }

    public LocalDateTime getLaboreingang() {
        return laboreingang;
    }

    public void setLaboreingang(LocalDateTime laboreingang) {
        this.laboreingang = laboreingang;
    }

    public Personal getPersonal() {
        return personal;
    }

    public void setPersonal(Personal personal) {
        this.personal = personal;
    }

    public Auftrag getAuftrag() {
        return auftrag;
    }

    public void setAuftrag(Auftrag auftrag) {
        this.auftrag = auftrag;
    }
}
