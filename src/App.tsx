import { useState, createContext, Dispatch, SetStateAction } from "react";
import RadioComponent from "./components/Radio";
import BottomPlayer from "./components/BottomPlayer";
import { Station } from "radio-browser-api";

type RadioWaveType = {
  stations: Station[] | undefined;
  setStations: Dispatch<SetStateAction<Station[]|undefined>> ;
  waveIndex: number;
  setWaveIndex: Dispatch<SetStateAction<number>>;
};

export const RadioWaveContext = createContext<RadioWaveType | null>(null);

function App() {
  const [stations, setStations] = useState<Station[]|undefined>(undefined);
  const [waveIndex, setWaveIndex] = useState<number>(0);
  return (
    <RadioWaveContext.Provider
      value={{
        stations,
        setStations,
        waveIndex,
        setWaveIndex,
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
