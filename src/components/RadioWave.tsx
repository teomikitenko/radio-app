import { useContext } from "react";
import { RadioWaveContext } from "../components/ProviderRadio";
import type { Station } from "radio-browser-api";
import { Play, Pause } from "lucide-react";

const RadioWave = ({ s }: { s: Station }) => {
  const waveCtx = useContext(RadioWaveContext);
  const playProps =
    typeof waveCtx?.waveIndex === "number" &&
    waveCtx?.stations![waveCtx.waveIndex].id === s.id
      ? {
          fill: "red",
          color: "red",
        }
      : {
          color: "#9ca3af",
          fill: "none",
        };
  const handleClick = () => {
    const currentIndexStation = waveCtx?.stations?.indexOf(s);
    waveCtx?.setWaveIndex(currentIndexStation!);
    waveCtx?.setPlayState(true);
  };

  return (
    <div className="flex gap-3">
      <div className="flex flex-col">
        <div className="flex">
          <h2 className="text-lg font-semibold">{s.name}</h2>
        </div>
        <div className="flex gap-2">
          <p>{s.country}</p>
          {s.tags.map((t, index) => index < 3 && <p key={t}>{t}</p>)}
        </div>
      </div>

      <Play
        key={`${s.id} - play`}
        width={30}
        {...playProps}
        absoluteStrokeWidth
        strokeWidth={1}
        onClick={handleClick}
      />
      <Pause
        key={`${s.id} - pause`}
        width={30}
        color="#9ca3af"
        strokeWidth={1}
        onClick={() => waveCtx?.setPlayState(false)}
      />
    </div>
  );
};

export default RadioWave;
