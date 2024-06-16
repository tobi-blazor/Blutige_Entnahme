export default class Personal {
  personID: number;
  vorname: string;
  nachname: string;
  geburtsdatum: Date;
  hinweise: string | null;

  constructor(
    personID: number,
    vorname: string,
    nachname: string,
    geburtsdatum: Date,
    hinweise: string | null
  ) {
    this.personID = personID;
    this.vorname = vorname;
    this.nachname = nachname;
    this.geburtsdatum = geburtsdatum;
    this.hinweise = hinweise;
  }
}
