import { Timespan } from "react-native/Libraries/Utilities/IPerformanceLogger";

export default class Blutprobe {
  constructor(
    public probeID: string,
    public hinweise: string,
    public grund: string,
    public maximaleVerweildauer: Timespan, // richtiger Datentyp?
    public entnahmeZeitpunkt: Date
  ) {}
}
