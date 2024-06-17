import { Timespan } from "react-native/Libraries/Utilities/IPerformanceLogger";
import Auftrag from "./Auftrag";
import Personal from "./Personal";

export default class Blutprobe {
  constructor(
    public probeID: string,
    public hinweise: string,
    public grund: string,
    public maximaleVerweildauer: Timespan, // richtiger Datentyp?
    public entnahmeZeitpunkt: Date,
    public auftrag: Auftrag | undefined,
    public personal: Personal | undefined
  ) {}
}
