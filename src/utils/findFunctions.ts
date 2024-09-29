import radio_api from "../lib/radioApi";

const searchTopStations = async()=>{
  const stations = await radio_api.searchStations({
    order: 'clickCount',
    tag:'house',
    limit: 10,
    hideBroken: true,
    removeDuplicates: true,
  });
  return stations;
}
const searchByCountry = async (country:string) => {
  const stations = await radio_api.searchStations({
    countryCode:country,
    order: 'lastCheckOK',
    limit: 10,
    hideBroken: true,
    removeDuplicates: true,
  });
  return stations;
};


const searchByName = async (name: string) => {
  const stations = await radio_api.searchStations({
    country:'UA',
    order: 'name',
    name: name,
    limit: 10,
    hideBroken: true,
    removeDuplicates: true,
  });
  return stations;
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
  return stations;
};

export { searchByName, searchByGenre,searchTopStations,searchByCountry };
