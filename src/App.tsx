import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  GameState,
  GameStateProvider,
  initialState,
} from "./context/GameState";
import { tasks } from "./data/tasks";
import { GamePage } from "./pages/Game";
import { StartPage } from "./pages/Start";

const App = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  return (
    <div className="bg-slate-800 w-full h-full p-5">
      <div className="flex flex-col items-center mt-4 h-full">
        <h1 className="text-3xl font-bold text-center">
          <Link to="/">Höpinää Tötteröön</Link>
        </h1>
        <p>Huimat {tasks.length} eri tehtävää!</p>
        <GameStateProvider value={{ gameState, setGameState }}>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path=":data" element={<GamePage />} />
          </Routes>
        </GameStateProvider>
      </div>
    </div>
  );
};

export default App;
