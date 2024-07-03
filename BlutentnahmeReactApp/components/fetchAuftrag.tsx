import { useEffect, useState } from "react";
import Patient from "../models/Patient";
import Blutprobe from "../models/Blutprobe";
import Auftrag from "../models/Auftrag";

// Helper function to deserialize JSON into class instances
const deserializeAuftrag = (data: any): Auftrag => {
  const patient = new Patient(
    data.patient.personID,
    data.patient.vorname,
    data.patient.nachname,
    new Date(data.patient.geburtsdatum),
    data.patient.hinweise,
    [] // We'll populate this later
  );

  const blutproben: Blutprobe[] = data.blutproben.$values.map(
    (bp: any) =>
      new Blutprobe(
        bp.probeNr,
        bp.rohrID,
        bp.hinweise,
        bp.grund,
        new Date(bp.spätesterEntnahmezeitpunkt),
        bp.entnahmeZeitpunkt ? new Date(bp.entnahmeZeitpunkt) : undefined,
        undefined, // We'll populate this later
        undefined // Assuming personal is not provided in the API response
      )
  );

  const auftrag = new Auftrag(
    data.auftragsID,
    new Date(data.geplanterZeitpunkt),
    blutproben,
    patient
  );

  // Set references to the parent objects
  blutproben.forEach((bp) => (bp.auftrag = auftrag));
  patient.auftragList.push(auftrag);

  return auftrag;
};

interface FetchAuftragResult {
  auftrag: Auftrag | null;
  loading: boolean;
  error: string | null;
}

// Custom Hook to fetch data from the API
const useFetchAuftrag = (apiUrl: string): FetchAuftragResult => {
  const [auftrag, setAuftrag] = useState<Auftrag | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();

        const auftrag = deserializeAuftrag(json);
        setAuftrag(auftrag);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { auftrag, loading, error };
};

export default useFetchAuftrag;
