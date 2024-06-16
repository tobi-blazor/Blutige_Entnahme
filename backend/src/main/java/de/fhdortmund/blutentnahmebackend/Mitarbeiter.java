package de.fhdortmund.blutentnahmebackend;

public class Mitarbeiter {
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAlter() {
        return alter;
    }

    public void setAlter(int alter) {
        this.alter = alter;
    }

    String name;
    int alter;
}
