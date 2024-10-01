import { Station } from "radio-browser-api";
import { Dispatch, SetStateAction } from "react";

export type RadioWaveType = {
    stations: Station[] | undefined;
    setStations: Dispatch<SetStateAction<Station[] | undefined>>;
    waveIndex: number | undefined;
    setWaveIndex: Dispatch<SetStateAction<number | undefined>>;
    playState: boolean;
    setPlayState: Dispatch<SetStateAction<boolean>>;
    audioRef: HTMLAudioElement | null;
    setAudioRef: Dispatch<SetStateAction<HTMLAudioElement | null>>;
  };