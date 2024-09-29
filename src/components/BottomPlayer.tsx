import { useContext } from "react";
import { RadioWaveContext } from "../App";
import { Play, StepBack, StepForward } from "lucide-react";

const BottomPlayer = () => {
  const waveContext = useContext(RadioWaveContext);

  const incrIndex = () => {
    waveContext!.setWaveIndex((index: number) => index + 1);
  };

  const decrIndex = () => {
    waveContext!.setWaveIndex((index: number) => index - 1);
  };

  return (
    <div className="fixed bottom-0 right-0 w-full h-20 border-t border-red-950 p-5">
      <div className="w-max mx-auto flex gap-4">
        <StepBack onClick={decrIndex} />
        <Play />
        <StepForward onClick={incrIndex} />
        <p>
          {waveContext!.stations?.length! > 0 &&
            waveContext?.stations![waveContext?.waveIndex].name}
        </p>
      </div>
    </div>
  );
};

export default BottomPlayer;
