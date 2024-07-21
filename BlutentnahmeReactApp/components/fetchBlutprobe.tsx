import { useEffect, useState } from "react";
import Blutprobe from "../models/Blutprobe";

interface FetchBlutprobeResult {
  blutprobe: Blutprobe | null;
  loading: boolean;
  error: string | null;
}

const useFetchBlutprobe = (apiUrl: string): FetchBlutprobeResult => {
  const [blutprobe, setBlutprobe] = useState<Blutprobe | null>(null);
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

        const blutprobe = new Blutprobe(
          json.probeNr,
          json.rohrID,
          json.hinweise,
          json.grund,
          new Date(json.spätesterEntnahmezeitpunkt),
          json.entnahmeZeitpunkt ? new Date(json.entnahmeZeitpunkt) : undefined,
          json.auftrag,
          json.personal,
          json.laborEingang
        );

        setBlutprobe(blutprobe);
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

  return { blutprobe, loading, error };
};

export default useFetchBlutprobe;
