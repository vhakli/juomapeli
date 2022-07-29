import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameData } from "../@types";
import { Button } from "../components/Button";

export const GamePage = () => {
  const [gameData, setGameData] = useState<GameData>();
  const { data } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      try {
        setGameData(JSON.parse(atob(data)) as GameData);
      } catch (e) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [data]);

  useEffect(() => {
    if (gameData) {
      navigate(`/${btoa(JSON.stringify(gameData))}`);
    }
  }, [gameData]);

  if (!gameData) {
    return null;
  }

  const endTurn = () => {
    const newGameData = {
      ...gameData,
      turn: {
        number: gameData.turn.number + 1,
        player:
          gameData.players[gameData.turn.number % gameData.players.length],
      },
    };
    setGameData(newGameData);
  };

  return (
    <div>
      <p>
        Vuorossa: {gameData.turn.player.name}. Kierros {gameData.turn.number}
      </p>
      <div className="py-24 border-solid border-white border-2">
        tähän juttuja
      </div>
      <Button onClick={endTurn}>Seuraava vuoro</Button>
    </div>
  );
};
