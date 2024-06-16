import Patient from "../models/Patient";

export const PATIENTEN = [
  new Patient(1, "Karsten", "Krebs", new Date(), null),
  new Patient(2, "Christina", "Krebs", new Date(), "starke schmerzen"),
  new Patient(3, "Makise", "Kurisu", new Date(), "El Psy Congroo"),
  new Patient(4, "Linus", "Marks Hartmann", new Date(), "muss auf klo"),
];
