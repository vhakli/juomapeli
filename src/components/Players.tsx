import { useState } from "react";
import { Player, PlayersProps } from "../@types";
import { Button } from "./Button";
import { v4 as uuidv4 } from "uuid";

export const Players = ({ players, setPlayers }: PlayersProps) => {
  const [playerName, setPlayerName] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    const newPlayer: Player = {
      id: uuidv4(),
      name: playerName,
    };
    setPlayers([...players, newPlayer]);
    setPlayerName("");
  };

  return (
    <>
      <h2 className="text-xl font-bold">Enter players</h2>
      <form onSubmit={onSubmit}>
        <input
          className="text-black h-9 p-2 mr-2 rounded-sm"
          type="text"
          placeholder="Player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </form>
      <h2 className="text-xl font-bold mt-4">Entered players</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name}
            <button
              className="bg-red-700 px-1"
              onClick={() =>
                setPlayers(players.filter((p) => p.id !== player.id))
              }
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
