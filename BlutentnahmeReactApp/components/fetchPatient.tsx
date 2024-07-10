import { useEffect, useState } from "react";
import Patient from "../models/Patient";
import Blutprobe from "../models/Blutprobe";
import Auftrag from "../models/Auftrag";

// Helper function to deserialize JSON into class instances
const deserializePatient = (data: any): Patient => {
  const patient = new Patient(
    data.patient.personID,
    data.patient.vorname,
    data.patient.nachname,
    new Date(data.patient.geburtsdatum),
    data.patient.hinweise,
    [] // We'll populate this later
  );

  return patient;
};

interface FetchPatientResult {
  patient: Patient | null;
  loading: boolean;
  error: string | null;
}

// Custom Hook to fetch data from the API
const useFetchPatient = (apiUrl: string): FetchPatientResult => {
  const [patient, setPatient] = useState<Patient | null>(null);
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

        const auftrag = deserializePatient(json);
        setPatient(patient);
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

  return { patient, loading, error };
};

export default useFetchPatient;
