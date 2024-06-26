package de.fhdortmund.blutentnahmebackend;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Personal")
public class Personal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer personalId;

    @Column(name = "Vorname", nullable = false)
    private String vorname;

    @Column(name = "Nachname", nullable = false)
    private String nachname;

    @Column(name = "Geburtsdatum", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date geburtsdatum;

    // Konstruktor
    public Personal() {
    }

    // Getter und Setter Methoden
    public Integer getPersonalId() {
        return personalId;
    }

    public void setPersonalId(Integer personalId) {
        this.personalId = personalId;
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

    public Date getGeburtsdatum() {
        return geburtsdatum;
    }

    public void setGeburtsdatum(Date geburtsdatum) {
        this.geburtsdatum = geburtsdatum;
    }
}
