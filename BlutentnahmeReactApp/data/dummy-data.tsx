import Patient from "../models/Patient";

export const PATIENTEN: Patient[] = [
  new Patient("p1", "Karsten", "Krebs", new Date(1478708162000), null),
  new Patient(
    "p2",
    "Christina",
    "Krebs",
    new Date(1478708162000),
    "starke schmerzen"
  ),
  new Patient(
    "p3",
    "Makise",
    "Kurisu",
    new Date(1478708162000),
    "El Psy Congroo"
  ),
  new Patient(
    "p4",
    "Linus",
    "Marks Hartmann",
    new Date(1478708162000),
    "muss auf klo"
  ),
];
