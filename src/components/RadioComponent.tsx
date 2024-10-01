import { useEffect, useState, useRef, useContext } from "react";
import COMMON_GENRE_LIST from "../constants/genre";
import COMMON_COUNTRY_LIST from "../constants/country";
import { Station } from "radio-browser-api";
import RadioWave from "./RadioWave";
import {
  searchByName,
  searchByGenre,
  searchByCountry,
} from "../utils/findFunctions";
import { RadioWaveContext } from "./ProviderRadio";
import useVisualAudio from "../hooks/useVisualAudio";

const RadioComponent = () => {
  const [radioStations, setRadioStations] = useState<Station[] | undefined>();

  const [value, setValue] = useState<string>(" ");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveCtx = useContext(RadioWaveContext);
  const { audioContext } = useVisualAudio({
    canvasRef,
    setRadioStations,
  });

  const searchByGenreHandler = async (genre: string) => {
    waveCtx?.setWaveIndex(undefined);
    const stations = await searchByGenre(genre);
    setRadioStations(stations);
    waveCtx!.setStations(stations);
  };

  const searchByNameHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    waveCtx?.setWaveIndex(undefined);
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const stations = await searchByName(name);
    setRadioStations(stations);
    waveCtx!.setStations(stations);
  };
  const searchByCountryHandler = async (country: string) => {
    waveCtx?.setWaveIndex(undefined);
    const stations = await searchByCountry(country);
    setRadioStations(stations);
    waveCtx!.setStations(stations);
  };

  useEffect(() => {
    const audio = waveCtx?.audioRef;
    const playHandler = () => {
      audio?.play();
      audioContext!.resume();
    };

    if (audio && waveCtx?.playState && radioStations?.length! > 0) {
      document.body.addEventListener("click", playHandler);
    }

    return () => {
      audio?.pause();
      document.body.removeEventListener("click", playHandler);
    };
  }, [radioStations, waveCtx?.playState]);

  return (
    <div className="relative  mt-32 flex flex-col gap-2">
      <div className="mx-auto z-40 flex flex-col gap-2 px-5 py-3 ">
        <div className="flex gap-2">
          <form className="w-full" onSubmit={searchByNameHandler}>
            <div className="flex gap-2">
              <input
                className="border grow rounded-xl p-3"
                name="name"
                type="text"
                value={value}
                placeholder="Search"
                onChange={(e) => setValue(e.currentTarget.value)}
              />
              <button type="submit">Search</button>
            </div>
          </form>
        </div>

        <div className="mx-auto justify-center w-[75%] flex flex-wrap gap-3">
          {COMMON_GENRE_LIST.map((genre) => (
            <button
              key={genre}
              className="text-blue-700 border border-cyan-400 size-min py-1 px-2 rounded-2xl"
              onClick={() => searchByGenreHandler(genre)}
            >
              <p className="text-xs font-semibold text-nowrap">{genre}</p>
            </button>
          ))}
          {COMMON_COUNTRY_LIST.map((c) => (
            <button
              key={c}
              className="text-blue-700 border border-cyan-400 size-min py-1 px-2 rounded-2xl"
              onClick={() => searchByCountryHandler(c)}
            >
              <p className="text-xs font-semibold text-nowrap">{c}</p>
            </button>
          ))}
        </div>
      </div>

      <canvas
        className="fixed z-10 bottom-20 w-full h-[400px]"
        ref={canvasRef}
      ></canvas>
      <div
        id="thumb"
        className="w-[50%] mx-auto flex flex-col gap-3 z-20 scroll-smooth max-h-72  p-5 overflow-y-scroll "
      >
        {radioStations && canvasRef.current && waveCtx?.audioRef ? (
          radioStations!.map((s) => <RadioWave key={s.id} s={s} />)
        ) : (
          <p>Chose genre</p>
        )}
      </div>
    </div>
  );
};

export default RadioComponent;
