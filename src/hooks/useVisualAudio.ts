import { useContext, useEffect, useState } from "react";
import { RadioWaveContext } from "../components/ProviderRadio";
import { searchTopStations } from "../utils/findFunctions";
import { Station } from "radio-browser-api";

const useVisualAudio = (obj: {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  setRadioStations: React.Dispatch<React.SetStateAction<Station[] | undefined>>;
}) => {
  const [audioContext, setAudioContext] = useState<AudioContext | undefined>();
  const waveCtx = useContext(RadioWaveContext);
  const { canvasRef, setRadioStations } = obj;
  useEffect(() => {
    if (canvasRef.current && waveCtx?.audioRef) {
      const audioCtx = new window.AudioContext();
      setAudioContext(audioCtx);

      const ctx = canvasRef.current!.getContext("2d");

      let audioSource = null;
      let analyser: any = null;

      audioSource = audioCtx.createMediaElementSource(waveCtx.audioRef);
      analyser = audioCtx.createAnalyser();
      audioSource.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const barWidth = canvasRef.current!.width / bufferLength + 0.2;
      let barHeight;

      let x = 0;
      function animate() {
        x = 0;
        ctx!.clearRect(
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height
        );
        if (analyser) {
          analyser.getByteFrequencyData(dataArray);
          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 0.5;
            ctx!.fillStyle = "#fef9c3";
            ctx!.fillRect(
              x,
              canvasRef.current!.height - barHeight,
              barWidth,
              barHeight
            );
            x += barWidth;
          }
        }
        requestAnimationFrame(animate);
      }
      animate();
    }
    searchTopStations().then((res) => {
      setRadioStations(res);
      waveCtx?.setStations(res);
    });
  }, [waveCtx?.audioRef]);
  return {
    audioContext,
  };
};
export default useVisualAudio;
