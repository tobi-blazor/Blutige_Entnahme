import Blutprobe from "./Blutprobe";

export default class Auftrag {
  constructor(
    public auftragsID: string,
    public geplanterZeitpunkt: Date,
    public entnahmeList: Blutprobe[]
  ) {}
}
