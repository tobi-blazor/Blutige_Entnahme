import Auftrag from "./Auftrag";
import Personal from "./Personal";

export default class Blutprobe {
  constructor(
    public probeID: string,
    public hinweise: string,
    public grund: string,
    public spätesterEntnahmezeitpunkt: Date, // richtiger Datentyp?
    public entnahmeZeitpunkt: Date|undefined,
    public auftrag: Auftrag | undefined,
    public personal: Personal | undefined
  ) {}
}
