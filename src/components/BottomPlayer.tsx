import { useContext, useState, useEffect, useRef } from "react";
import { RadioWaveContext } from "../App";
import { Play, StepBack, StepForward, Pause } from "lucide-react";

const BottomPlayer = () => {
  const [volume, setVolume] = useState("50");
  const waveContext = useContext(RadioWaveContext);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    waveContext?.setAudioRef(audioRef.current);
  }, []);

  const setVolumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setVolume(e.currentTarget.value);
      const audio = audioRef.current;
      audio.volume = Number(volume) / 100;
    }
  };

  const incrIndex = () => {
    waveContext!.setWaveIndex((index: number) => index + 1);
  };
  const decrIndex = () => {
    const length = (waveContext?.stations?.length as number) - 1;
    const currrentIndex = waveContext?.waveIndex;
    if (currrentIndex === 0) {
      waveContext!.setWaveIndex(length);
    } else waveContext!.setWaveIndex((index: number) => index - 1);
  };
  const changePlayState = () => {
    if (waveContext?.playState) {
      waveContext?.setPlayState(false);
    } else waveContext?.setPlayState(true);
  };

  return (
    <div className="fixed bottom-0 right-0 w-full h-20 border-t border-red-950 p-5">
      <div className="w-max mx-auto flex gap-4">
        <StepBack onClick={decrIndex} />
        {waveContext?.playState ? (
          <Pause onClick={changePlayState} />
        ) : (
          <Play onClick={changePlayState} />
        )}

        <StepForward onClick={incrIndex} />
        <div className="flex gap-10">
          <p>
            {waveContext!.stations?.length! > 0 &&
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
            waveContext?.stations!
              ? waveContext.stations![waveContext!.waveIndex].urlResolved
              : undefined
          }
          crossOrigin="anonymous"
        ></audio>
      </div>
    </div>
  );
};

export default BottomPlayer;
