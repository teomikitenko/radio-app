import React, { createContext, useState } from "react";
import type { RadioWaveType } from "../types/types";
import { Station } from "radio-browser-api";

export const RadioWaveContext = createContext<RadioWaveType | null>(null);

const ProviderRadio = ({ children }: { children: React.ReactNode }) => {
  const [stations, setStations] = useState<Station[] | undefined>(undefined);
  const [waveIndex, setWaveIndex] = useState<number | undefined>(undefined);
  const [playState, setPlayState] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  return (
    <RadioWaveContext.Provider
      value={{
        stations,
        setStations,
        waveIndex,
        setWaveIndex,
        playState,
        setPlayState,
        audioRef,
        setAudioRef,
      }}
    >
      {children}
    </RadioWaveContext.Provider>
  );
};

export default ProviderRadio;
