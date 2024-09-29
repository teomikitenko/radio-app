/* import React, { useEffect, useContext } from "react";
import { RadioWaveContext } from "../App"; */
import type { Station } from "radio-browser-api";
import { Play } from "lucide-react";

const RadioWave = ({ s }: { s: Station }) => {
  //const waveCtx = useContext(RadioWaveContext);
  const handleClick = () => {
   /*  setUrl(s.urlResolved); */
  };
  return (
    <div className="flex gap-3">
      <div className="flex flex-col">
        <div className="flex">
          <h2 className="text-lg font-semibold">{s.name}</h2>
        </div>
        <div className="flex gap-2">
          <p>{s.country}</p>
          {s.tags.map((t, index) => index < 3 && <p>{t}</p>)}
        </div>
      </div>
      <Play
        width={30}
        color="#9ca3af"
        absoluteStrokeWidth
        strokeWidth={1}
        onClick={handleClick}
      />
    </div>
  );
};

export default RadioWave;
