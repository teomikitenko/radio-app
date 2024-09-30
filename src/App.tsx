import { useState, createContext, Dispatch, SetStateAction } from "react";
import RadioComponent from "./components/Radio";
import BottomPlayer from "./components/BottomPlayer";
import { Station } from "radio-browser-api";

type RadioWaveType = {
  stations: Station[] | undefined;
  setStations: Dispatch<SetStateAction<Station[] | undefined>>;
  waveIndex: number;
  setWaveIndex: Dispatch<SetStateAction<number>>;
  playState: boolean;
  setPlayState: Dispatch<SetStateAction<boolean>>;
  audioRef: HTMLAudioElement | null;
  setAudioRef: Dispatch<SetStateAction<HTMLAudioElement | null>>;
};

export const RadioWaveContext = createContext<RadioWaveType | null>(null);

function App() {
  const [stations, setStations] = useState<Station[] | undefined>(undefined);
  const [waveIndex, setWaveIndex] = useState<number>(0);
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
      <div className="relative">
        <div className="flex gap-2 flex-col">
          <RadioComponent />
        </div>
        <BottomPlayer />
      </div>
    </RadioWaveContext.Provider>
  );
}

export default App;
