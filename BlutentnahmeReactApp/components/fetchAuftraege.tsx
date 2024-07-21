import { useEffect, useState, useCallback } from "react";
import Patient from "../models/Patient";
import Blutprobe from "../models/Blutprobe";
import Auftrag from "../models/Auftrag";

const deserializeAuftrag = (data: any): Auftrag => {
  const patient = new Patient(
    data.patient.personID,
    data.patient.vorname,
    data.patient.nachname,
    new Date(data.patient.geburtsdatum),
    data.patient.hinweise,
    []
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
        undefined,
        undefined,
        bp.laborEingang ? new Date(bp.laborEingang) : undefined
      )
  );

  const auftrag = new Auftrag(
    data.auftragsID,
    new Date(data.geplanterZeitpunkt),
    blutproben,
    patient
  );

  blutproben.forEach((bp) => (bp.auftrag = auftrag));
  patient.auftragList.push(auftrag);

  return auftrag;
};

const useFetchAuftraege = (apiUrl: string) => {
  const [auftraege, setAuftraege] = useState<Auftrag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();

      const auftraege: Auftrag[] = json.$values.map((data: any) =>
        deserializeAuftrag(data)
      );
      setAuftraege(auftraege);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { auftraege, loading, error, refetch: fetchData };
};

export default useFetchAuftraege;
