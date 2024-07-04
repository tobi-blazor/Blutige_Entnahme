import Auftrag from "../../models/Auftrag";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  MainScreen: undefined;
  Transporte: undefined;
  Entnahme: undefined;
  EntnahmeDetails: undefined;
  Profil: undefined;
  VerifyPatient: {probeNr: number, auftrag: Auftrag|null};
  VerifyRohr: {probeNr: number, patientID: string, auftrag: Auftrag|null};
  FinishEntnahme: {probeNr: number, patientID: string, rohrID: string,};
};
