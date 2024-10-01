import { useContext } from "react";
import { RadioWaveContext } from "../components/ProviderRadio";
import { Play, StepBack, StepForward, Pause } from "lucide-react";
import PlayerComponent from "./PlayerComponent";

const BottomPlayer = () => {
  const waveContext = useContext(RadioWaveContext);

  const incrIndex = () => {
    if(typeof waveContext?.waveIndex === 'number'){
      waveContext!.setWaveIndex((index) => index! + 1);
    }
  
  };
  const decrIndex = () => {
    const length = (waveContext?.stations?.length as number) - 1;
    const currrentIndex = waveContext?.waveIndex;
    if(typeof waveContext?.waveIndex === 'number'){
      if (currrentIndex === 0) {
        waveContext!.setWaveIndex(length);
      } else waveContext!.setWaveIndex((index) => index! - 1); 
    }

  };
  const changePlayState = () => {
    if (waveContext?.playState) {
      waveContext?.setPlayState(false);
    } else waveContext?.setPlayState(true);
  };

  return (
    <div className=" bg-slate-900 fixed bottom-0 right-0 w-full h-20  p-5">
      <div className="w-max mx-auto flex gap-4">
        <StepBack color="white" onClick={decrIndex} />
        {waveContext?.playState ? (
          <Pause color="white" onClick={changePlayState} />
        ) : (
          <Play color="white" onClick={changePlayState} />
        )}

        <StepForward color="white" onClick={incrIndex} />
        <PlayerComponent/>
      </div>
    </div>
  );
};

export default BottomPlayer;
