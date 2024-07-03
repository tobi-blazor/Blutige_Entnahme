import Auftrag from "../models/Auftrag";
import Blutprobe from "../models/Blutprobe";
import Patient from "../models/Patient";

const API_URL = "https://localhost:7148/api/Auftraege/aktiv"; // Ändern Sie dies auf Ihren tatsächlichen API-Endpunkt

// Funktion zum Konvertieren der API-Daten in die Modelle
function convertApiData(apiData: any): Auftrag[] {
    // Array für die Aufträge
    const auftraege: Auftrag[] = [];

    // Iteriere über die $values im apiData
    apiData["$values"].forEach((auftragData: any) => {
        // Patient extrahieren
        const patientData = auftragData.patient;

        // Blutproben extrahieren
        const blutprobenData = auftragData.blutproben["$values"];

        // Auftrag erstellen
        const auftrag = new Auftrag(
            auftragData.auftragsID,
            new Date(auftragData.geplanterZeitpunkt),
            [],
            new Patient(
                patientData.personID,
                patientData.vorname,
                patientData.nachname,
                new Date(patientData.geburtsdatum),
                patientData.hinweise,
                []
            )
        );

        // Blutproben zuweisen
        blutprobenData.forEach((blutprobeData: any) => {
            const blutprobe = new Blutprobe(
                blutprobeData.probeID,
                blutprobeData.hinweise,
                blutprobeData.grund,
                new Date(blutprobeData.spätesterEntnahmezeitpunkt),
                blutprobeData.entnahmeZeitpunkt ? new Date(blutprobeData.entnahmeZeitpunkt) : undefined,
                auftrag, // Auftrag zuweisen
                undefined // Hier könnten weitere Felder gefüllt werden, falls vorhanden
            );

            // Blutprobe dem Auftrag hinzufügen
            auftrag.entnahmeList.push(blutprobe);
        });

        // Auftrag der Liste hinzufügen
        auftraege.push(auftrag);
    });

    return auftraege;
}



export const fetchAktiveAuftraege = async (): Promise<Auftrag[]> => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return convertApiData(data);
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
};
