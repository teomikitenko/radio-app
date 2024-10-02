import { useContext, useState, useEffect, useRef } from "react";
import { RadioWaveContext } from "../components/ProviderRadio";
import { Station } from "radio-browser-api";
import useVisualAudio from "../hooks/useVisualAudio";
import { searchTopStations } from "../utils/findFunctions";

const PlayerComponent = () => {
  const [volume, setVolume] = useState("50");
  const [currentWave, setCurrentWave] = useState<Station | undefined>();
  const waveCtx = useContext(RadioWaveContext);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { audioContext } = useVisualAudio(waveCtx?.canvasRef!);

  const setVolumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setVolume(e.currentTarget.value);
      const audio = audioRef.current;
      audio.volume = Number(volume) / 100;
    }
  };
  useEffect(() => {
    waveCtx?.setAudioRef(audioRef.current);
    searchTopStations().then((res) => {
      waveCtx?.setStations(res);
    });
  }, []);
  useEffect(() => {
    if (typeof waveCtx?.waveIndex === "number") {
      const currentStationUrl =
        waveCtx.stations![waveCtx!.waveIndex].urlResolved;
      audioRef!.current!.src = currentStationUrl;
      setCurrentWave(waveCtx.stations![waveCtx.waveIndex]);
    }
  }, [waveCtx?.waveIndex]);

  useEffect(() => {
    const audio = waveCtx?.audioRef;
    if (audio && waveCtx?.playState && currentWave) {
      audio?.play();
      audioContext!.resume();
    }

    return () => {
      audio?.pause();
    };
  }, [currentWave, waveCtx?.playState]);

  return (
    <>
      <div className="flex gap-10">
        <p className="text-slate-200 text-lg font-semibold">
          {typeof waveCtx?.waveIndex === "number" &&
            waveCtx!.stations?.length! > 0 &&
            waveCtx?.stations![waveCtx?.waveIndex].name}
        </p>

        <input
          className="appearance-none"
          type="range"
          value={volume}
          onChange={setVolumeHandler}
          name="volumecontrol"
          max={100}
          min={0}
          step={0.01}
        />
      </div>

      <audio
        ref={audioRef}
        src={currentWave ? currentWave.urlResolved : undefined}
        crossOrigin="anonymous"
      ></audio>
    </>
  );
};

export default PlayerComponent;
