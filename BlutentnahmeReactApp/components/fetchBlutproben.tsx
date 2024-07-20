import { useCallback, useEffect, useState } from "react";
import Blutprobe from "../models/Blutprobe";

// Helper function to deserialize JSON into Blutprobe instances
const deserializeBlutprobe = (data: any): Blutprobe => {
  return new Blutprobe(
    data.probeNr,
    data.rohrID,
    data.hinweise,
    data.grund,
    new Date(data.spätesterEntnahmezeitpunkt),
    data.entnahmeZeitpunkt ? new Date(data.entnahmeZeitpunkt) : undefined,
    undefined, // Assuming personal is not provided in the API response
    undefined, // Assuming auftrag is not provided in the API response
    data.laborEingang ? new Date(data.laborEingang) : undefined
  );
};

// Custom Hook to fetch Blutproben data from the API
const useFetchBlutproben = (apiUrl: string) => {
  const [blutproben, setBlutproben] = useState<Blutprobe[]>([]);
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

      const blutproben: Blutprobe[] = json.$values.map((data: any) =>
        deserializeBlutprobe(data)
      );
      setBlutproben(blutproben);
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

  return { blutproben, loading, error, refetch: fetchData };
};

export default useFetchBlutproben;
