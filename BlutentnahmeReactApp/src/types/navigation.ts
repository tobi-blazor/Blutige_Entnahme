import Auftrag from "../../models/Auftrag";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  MainScreen: undefined;
  Transporte: undefined;
  Aufträge: undefined;
  AuftragDetails: undefined;
  Profil: undefined;
  VerifyPatient: { probeNr: number; auftrag: Auftrag | null };
  AddRohr: { probeNr: number; patientID: string; auftrag: Auftrag | null };
  FinishEntnahme: { probeNr: number; patientID: string; rohrID: string };
};
