import { Station } from "radio-browser-api";
import radio_api from "../lib/radioApi";


 const filtered = (stations:Station[])=>{
  return stations.filter(s=>s.country !== 'The Russian Federation' )
} 

const searchTopStations = async()=>{
  const stations = await radio_api.searchStations({
    order: 'clickCount',
    tag:'house',
    limit: 10,
    hideBroken: true,
    removeDuplicates: true,
  });
  return filtered(stations);
}
const searchByCountry = async (country:string) => {
  const stations = await radio_api.searchStations({
    countryCode:country,
    order: 'lastCheckOK',
    limit: 10,
    hideBroken: true,
    removeDuplicates: true,
  });
  return filtered(stations);
};


const searchByName = async (name: string) => {
  const stations = await radio_api.searchStations({
    order: 'name',
    name: name,
    limit: 10,
    hideBroken: true,
    removeDuplicates: true,
  });
  return filtered(stations);
};

const searchByGenre = async (t: string) => {
  const stations = await radio_api.searchStations({
    language: "english",
    order: "clickTrend",
    tag: t,
    limit: 10,
    hideBroken: true,
    removeDuplicates: true,
  });
  return filtered(stations);
};

export { searchByName, searchByGenre,searchTopStations,searchByCountry };
