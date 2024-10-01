import RadioComponent from "./components/RadioComponent";
import BottomPlayer from "./components/BottomPlayer";
import ProviderRadio from "./components/ProviderRadio";

function App() {
  return (
    <ProviderRadio>
      <div className="relative">
        <div className="flex gap-2 flex-col">
          <RadioComponent />
        </div>
        <BottomPlayer />
      </div>
    </ProviderRadio>
  );
}

export default App;
