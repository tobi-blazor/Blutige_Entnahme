import Blutprobe from "./Blutprobe";
export default class Personal {
  constructor(
    public personID: string,
    public vorname: string,
    public nachname: string,
    public geburtsdatum: Date,
    public blutprobeList: Blutprobe[]
  ) {}
}
