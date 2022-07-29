import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameData, PlayersProps } from "../@types";
import { Players } from "../components/Players";

export const StartPage = ({ players, setPlayers }: PlayersProps) => {
  const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEnabled(players.length > 1);
  }, [players]);

  const startGame = () => {
    const gameData: GameData = {
      players,
      turn: {
        number: 1,
        player: players[0],
      },
    };
    const data = btoa(JSON.stringify(gameData));
    navigate(`/${data}`);
  };

  return (
    <div>
      <Players players={players} setPlayers={setPlayers} />
      <button
        title={enabled ? "Start game" : "Add at least 2 players"}
        className={`mt-10 h-24 p-6 ${
          enabled
            ? "bg-green-900 hover:bg-green-800"
            : "bg-slate-500 cursor-not-allowed"
        }`}
        onClick={startGame}
      >
        START
      </button>
    </div>
  );
};
