export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  MainScreen: undefined;
  Transporte: undefined;
  Entnahme: undefined;
  EntnahmeDetails: undefined;
  Profil: undefined;
  VerifyPatient: {probeNr: number};
  VerifyRohr: {probeNr: number, patientID: string};
  FinishEntnahme: {probeNr: number, patientID: string, rohrID: string,};
};
