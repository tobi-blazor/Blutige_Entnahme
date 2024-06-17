import Auftrag from "../models/Auftrag";
import Personal from "../models/Personal";
import Patient from "../models/Patient";
import Blutprobe from "../models/Blutprobe";

// Define Timespan type
class Timespan {
  constructor(public startTime: number, public endTime: number) {}
}

// Dummy data for Blutprobe
const blutprobe1 = new Blutprobe(
  "BP001",
  "Patient fasting",
  "Routine checkup",
  new Timespan(
    new Date("2024-06-17T08:30:00Z").getTime(),
    new Date("2024-06-18T08:30:00Z").getTime()
  ),
  new Date("2024-06-17T08:30:00Z"),
  undefined, // auftrag will be assigned later
  undefined // personal will be assigned later
);

const blutprobe2 = new Blutprobe(
  "BP002",
  "Patient on medication",
  "Diabetes monitoring",
  new Timespan(
    new Date("2024-06-17T07:45:00Z").getTime(),
    new Date("2024-06-17T16:00:00Z").getTime()
  ),
  new Date("2024-06-17T07:45:00Z"),
  undefined, // auftrag will be assigned later
  undefined // personal will be assigned later
);

const blutprobe3 = new Blutprobe(
  "BP003",
  "Patient fasting",
  "Lipid profile",
  new Timespan(
    new Date("2024-06-17T09:00:00Z").getTime(),
    new Date("2024-06-18T09:00:00Z").getTime()
  ),
  new Date("2024-06-17T09:00:00Z"),
  undefined, // auftrag will be assigned later
  undefined // personal will be assigned later
);

const blutprobe4 = new Blutprobe(
  "BP004",
  "Patient experiencing fatigue",
  "Thyroid function test",
  new Timespan(
    new Date("2024-06-17T10:00:00Z").getTime(),
    new Date("2024-06-17T14:00:00Z").getTime()
  ),
  new Date("2024-06-17T10:00:00Z"),
  undefined, // auftrag will be assigned later
  undefined // personal will be assigned later
);

const blutprobe5 = new Blutprobe(
  "BP005",
  "Patient on antibiotics",
  "Infection monitoring",
  new Timespan(
    new Date("2024-06-17T11:00:00Z").getTime(),
    new Date("2024-06-17T18:00:00Z").getTime()
  ),
  new Date("2024-06-17T11:00:00Z"),
  undefined, // auftrag will be assigned later
  undefined // personal will be assigned later
);

// Dummy data for Patient
const patient1 = new Patient(
  "PAT001",
  "John",
  "Doe",
  new Date("1980-01-15"),
  "Diabetic",
  [] // auftragList will be assigned later
);

const patient2 = new Patient(
  "PAT002",
  "Jane",
  "Smith",
  new Date("1975-05-30"),
  "Hypertensive",
  [] // auftragList will be assigned later
);

const patient3 = new Patient(
  "PAT003",
  "Alice",
  "Johnson",
  new Date("1990-11-25"),
  "Thyroid issues",
  [] // auftragList will be assigned later
);

const patient4 = new Patient(
  "PAT004",
  "Bob",
  "Brown",
  new Date("1985-08-20"),
  "On antibiotics",
  [] // auftragList will be assigned later
);

// Dummy data for Auftrag
const auftrag1 = new Auftrag(
  "AUF001",
  new Date("2024-06-17T08:00:00Z"),
  [blutprobe1, blutprobe2],
  patient1 // Reference to patient1
);

const auftrag2 = new Auftrag(
  "AUF002",
  new Date("2024-06-17T09:00:00Z"),
  [blutprobe3],
  patient2 // Reference to patient2
);

const auftrag3 = new Auftrag(
  "AUF003",
  new Date("2024-06-17T10:00:00Z"),
  [blutprobe4],
  patient3 // Reference to patient3
);

const auftrag4 = new Auftrag(
  "AUF004",
  new Date("2024-06-17T11:00:00Z"),
  [blutprobe5],
  patient4 // Reference to patient4
);

// Dummy data for Personal
const personal1 = new Personal(
  "PER001",
  "Dr. Anna",
  "Baker",
  new Date("1970-03-10"),
  [blutprobe1, blutprobe2]
);

const personal2 = new Personal(
  "PER002",
  "Dr. Bill",
  "Carter",
  new Date("1980-06-15"),
  [blutprobe3]
);

const personal3 = new Personal(
  "PER003",
  "Dr. Cindy",
  "Davis",
  new Date("1990-07-20"),
  [blutprobe4]
);

const personal4 = new Personal(
  "PER004",
  "Dr. David",
  "Evans",
  new Date("1985-09-25"),
  [blutprobe5]
);

// Assigning references to auftrag and personal in Blutprobe instances
blutprobe1.auftrag = auftrag1;
blutprobe1.personal = personal1;

blutprobe2.auftrag = auftrag1;
blutprobe2.personal = personal1;

blutprobe3.auftrag = auftrag2;
blutprobe3.personal = personal2;

blutprobe4.auftrag = auftrag3;
blutprobe4.personal = personal3;

blutprobe5.auftrag = auftrag4;
blutprobe5.personal = personal4;

// Assigning auftragList to patients
patient1.auftragList.push(auftrag1);
patient2.auftragList.push(auftrag2);
patient3.auftragList.push(auftrag3);
patient4.auftragList.push(auftrag4);

// Exporting auftragArray as an array of Auftrag instances
export const auftragArray = [auftrag1, auftrag2, auftrag3, auftrag4];
console.log(auftragArray);
