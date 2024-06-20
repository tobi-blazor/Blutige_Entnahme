import Auftrag from "./Auftrag";
export default class Patient {
  constructor(
    public personID: string,
    public vorname: string,
    public nachname: string,
    public geburtsdatum: Date,
    public hinweise: string | null,
    public auftragList: Auftrag[]
  ) {}
}
