import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { GameState, GameStateProvider } from "../context/GameState";
import { tasks } from "../data/tasks";
import { useGameStateContext } from "../hooks/useGameStateContext";

import { author, repository } from "../../package.json";
import { Button } from "./Button";

export const Layout = () => {
  const initialState = useGameStateContext();
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [modalVisible, setModalVisible] = useState<boolean>();
  const [newIdea, setNewIdea] = useState<string>("");

  return (
    <div className="w-full h-full flex flex-col items-center pt-6 md:pt-36">
      <h1 className="text-3xl font-bold text-center">
        <Link to="/">Höpinää Tötteröön</Link>
      </h1>
      <p>Huimat {tasks.length} eri tehtävää!</p>
      <GameStateProvider value={{ gameState, setGameState }}>
        <Outlet />
      </GameStateProvider>
      <div className="mt-auto mb-4 flex flex-col md:flex-row md:space-x-8 text-gray-500 text-center">
        <button
          className="cursor-pointer hover:text-gray-300"
          onClick={() => setModalVisible(true)}
        >
          Ehdota tehtävää
        </button>
        <span>
          <a
            href={repository.url}
            rel="noopener noreferrer"
            target="_blank"
            className="hover:text-gray-300"
          >
            Lähdekoodi
          </a>
        </span>
        <span>
          <a
            href={author.url}
            rel="noopener noreferrer"
            target="_blank"
            className="hover:text-gray-300"
          >
            &copy; {author.name} {new Date().getFullYear()}
          </a>
        </span>
      </div>
      {modalVisible && (
        <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center">
          <div
            className="w-full h-full absolute left-0 top-0 bg-slate-800 opacity-90"
            onClick={() => setModalVisible(false)}
          />
          <div className="absolute w-full md:w-2/3 px-4">
            <div className="flex flex-col items-center bg-slate-500/90 px-12 pb-12 pt-5 w-full">
              <span
                className="absolute right-8 top-2 font-bold cursor-pointer"
                onClick={() => setModalVisible(false)}
              >
                X
              </span>
              <h2 className="font-bold text-xl mb-6">Ehdota tehtävää</h2>
              <form
                className="flex flex-col w-full md:w-6/12"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newIdea.length > 0) {
                    fetch(import.meta.env.VITE_FORM_FUNCTION_URL, {
                      method: "POST",
                      body: JSON.stringify({ content: newIdea }),
                    });
                    setNewIdea("");
                  }
                }}
              >
                <textarea
                  value={newIdea}
                  onChange={(e) => setNewIdea(e.target.value)}
                  className="mb-4 h-24 text-black p-1 rounded-sm"
                />
                <Button type="submit" disabled={newIdea.length === 0}>
                  Lähetä
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
