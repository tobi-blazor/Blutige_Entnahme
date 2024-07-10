// createContext.tsx
import React, { createContext, useState, ReactNode, FC } from "react";

interface GlobalState {
  personalID: string;
  // Weitere Zustandsvariablen hinzufügen
}

interface GlobalContextProps {
  globalState: GlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    personalID: "",
  });

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalContext.Provider>
  );
};
