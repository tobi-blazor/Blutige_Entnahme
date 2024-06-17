import { FlatList } from "react-native";
import Auftrag from "../models/Auftrag";
import Patient from "../models/Patient";
import Blutprobe from "../models/Blutprobe";

// Generate new instances of Blutprobe
const blutprobe1 = new Blutprobe(
  "bp1",
  "Hinweise 1",
  "Grund 1",
  {
    startTime: new Date("2023-01-01T10:00:00Z").getTime(),
    endTime: new Date("2023-01-01T12:00:00Z").getTime(),
  },
  new Date("2023-01-01T10:00:00Z")
);

const blutprobe2 = new Blutprobe(
  "bp2",
  "Hinweise 2",
  "Grund 2",
  {
    startTime: new Date("2023-02-01T10:00:00Z").getTime(),
    endTime: new Date("2023-02-01T12:00:00Z").getTime(),
  },
  new Date("2023-02-01T10:00:00Z")
);

// Generate new instances of Auftrag
const auftrag1 = new Auftrag("a1", new Date("2023-03-01T09:00:00Z"), [
  blutprobe1,
  blutprobe2,
]);

const auftrag2 = new Auftrag("a2", new Date("2023-04-01T09:00:00Z"), [
  blutprobe1,
]);

// Existing PATIENTEN data with additional auftragList parameter
export const PATIENTEN: Patient[] = [
  new Patient("p1", "Karsten", "Krebs", new Date(1478708162000), null, [
    auftrag1,
  ]),
  new Patient(
    "p2",
    "Christina",
    "Krebs",
    new Date(1478708162000),
    "starke schmerzen",
    [auftrag2]
  ),
  new Patient(
    "p3",
    "Makise",
    "Kurisu",
    new Date(1478708162000),
    "El Psy Congroo",
    [auftrag1, auftrag2]
  ),
  new Patient(
    "p4",
    "Linus",
    "Marks Hartmann",
    new Date(1478708162000),
    "muss auf klo",
    [auftrag1]
  ),
];

// Generate additional patients with dummy data
const additionalPatient1 = new Patient(
  "p5",
  "Alice",
  "Wonderland",
  new Date(2000, 4, 20),
  "headache",
  [auftrag1]
);

const additionalPatient2 = new Patient(
  "p6",
  "Bob",
  "Builder",
  new Date(1995, 8, 15),
  "fractured arm",
  [auftrag2]
);

const additionalPatient3 = new Patient(
  "p7",
  "Charlie",
  "Brown",
  new Date(1988, 1, 10),
  "flu",
  [auftrag1, auftrag2]
);

// Add additional patients to the existing PATIENTEN array
PATIENTEN.push(additionalPatient1, additionalPatient2, additionalPatient3);

console.log(PATIENTEN);
