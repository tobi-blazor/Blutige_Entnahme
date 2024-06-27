package de.fhdortmund.blutentnahmebackend;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

import java.time.LocalDate;

@Entity
public class Patient {
    @Id
    @Column(name = "PatientID", nullable = false)
    private Integer id;

    @Column(name = "Vorname", nullable = false)
    private String vorname;

    @Column(name = "Nachname", nullable = false)
    private String nachname;

    @Column(name = "Geburtsdatum", nullable = false)
    private LocalDate geburtsdatum;

    @Lob
    @Column(name = "Hinweise")
    private String hinweise;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getVorname() {
        return vorname;
    }

    public void setVorname(String vorname) {
        this.vorname = vorname;
    }

    public String getNachname() {
        return nachname;
    }

    public void setNachname(String nachname) {
        this.nachname = nachname;
    }

    public LocalDate getGeburtsdatum() {
        return geburtsdatum;
    }

    public void setGeburtsdatum(LocalDate geburtsdatum) {
        this.geburtsdatum = geburtsdatum;
    }

    public String getHinweise() {
        return hinweise;
    }

    public void setHinweise(String hinweise) {
        this.hinweise = hinweise;
    }

}