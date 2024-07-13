import Auftrag from "./Auftrag";
import Personal from "./Personal";

export default class Blutprobe {
  constructor(
    public probeNr: number,
    public rohrID: string | undefined,
    public hinweise: string | undefined,
    public grund: string | undefined,
    public spätesterEntnahmezeitpunkt: Date,
    public entnahmeZeitpunkt: Date | undefined,
    public auftrag: Auftrag | undefined,
    public personal: Personal | undefined,
    public laborEingang: Date | undefined
  ) {}
}
