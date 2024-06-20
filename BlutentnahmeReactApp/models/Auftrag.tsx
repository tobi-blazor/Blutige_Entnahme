import Blutprobe from "./Blutprobe";
import Patient from "./Patient";

export default class Auftrag {
  constructor(
    public auftragsID: string,
    public geplanterZeitpunkt: Date,
    public entnahmeList: Blutprobe[],
    public patient: Patient
  ) {}
}
