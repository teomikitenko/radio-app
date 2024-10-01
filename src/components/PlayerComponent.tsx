import { useContext, useState, useEffect, useRef } from "react";
import { RadioWaveContext } from "../components/ProviderRadio";


const PlayerComponent = () => {
  const [volume, setVolume] = useState("50");
  const waveContext = useContext(RadioWaveContext);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const setVolumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setVolume(e.currentTarget.value);
      const audio = audioRef.current;
      audio.volume = Number(volume) / 100;
    }
  };
  useEffect(() => {
    waveContext?.setAudioRef(audioRef.current);
  }, []);

  useEffect(()=>{
    if(typeof waveContext?.waveIndex === 'number'){
      audioRef!.current!.src =  waveContext.stations![waveContext!.waveIndex].urlResolved
    }
  },[waveContext?.waveIndex])
  return (
    <>
      <div className="flex gap-10">
        <p className="text-slate-200 text-lg font-semibold">
          {typeof waveContext?.waveIndex === 'number' &&
            waveContext!.stations?.length! > 0 &&
            waveContext?.stations![waveContext?.waveIndex].name}
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
        src={
          waveContext?.waveIndex && waveContext?.stations!
            ? waveContext.stations![waveContext!.waveIndex].urlResolved
            : undefined
        }
        crossOrigin="anonymous"
      ></audio>
    </>
  );
};

export default PlayerComponent;
