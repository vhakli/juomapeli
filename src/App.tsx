import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Player } from "./@types";
import { GamePage } from "./pages/Game";
import { StartPage } from "./pages/Start";

const App = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  return (
    <div className="bg-slate-800 w-full h-full p-5">
      <h1 className="text-3xl font-bold text-center">
        <Link to="/">Ei Muutaku Huomiseen</Link>
      </h1>
      <div className="flex flex-col text-center mt-4">
        <Routes>
          <Route
            path="/"
            element={<StartPage players={players} setPlayers={setPlayers} />}
          />
          <Route path=":data" element={<GamePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
