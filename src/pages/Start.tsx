import { useState } from "react";
import { Button } from "../components/Button";
import { useGameState } from "../hooks/useGameState";
import { usePlayers } from "../hooks/usePlayers";

export const StartPage = () => {
  const { enabled, startGame } = useGameState();
  const { addPlayer, removePlayer, players } = usePlayers();
  const [playerName, setPlayerName] = useState("");
  const [shuffle, setShuffle] = useState<boolean>(true);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addPlayer(playerName);
    setPlayerName("");
  };

  return (
    <>
      <button
        title={enabled ? "Start game" : "Add at least 2 players"}
        className={`mt-10 h-24 p-6 rounded ${
          enabled
            ? "bg-green-900 hover:bg-green-800"
            : "bg-slate-500 cursor-not-allowed"
        }`}
        onClick={() => startGame(shuffle)}
      >
        {enabled ? "Aloita" : "Lisää vähintään 2 pelaajaa"}
      </button>
      <div className="p-4">
        <input
          type="checkbox"
          checked={shuffle}
          className="mr-2"
          onChange={() => setShuffle(!shuffle)}
          id="shuffle"
        />
        <label htmlFor="shuffle">Satunnainen pelijärjestys</label>
      </div>
      <h2 className="text-xl font-bold">Lisää pelaaja</h2>
      <form onSubmit={onSubmit}>
        <input
          className="text-black h-9 p-2 mr-2 rounded-sm"
          type="text"
          autoFocus
          placeholder="Nimi"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <Button type="submit" disabled={playerName.length === 0}>
          Lisää
        </Button>
      </form>
      <h2 className="text-xl font-bold mt-4">Lisätyt pelaajat</h2>
      <table className="border-separate border-spacing-1">
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="border border-slate-600 px-4 py-2 text-center">
                {player.name}
              </td>
              <td className="border border-slate-600 p-2 bg-red-700">
                <button
                  className="px-1"
                  onClick={() => removePlayer(player.id)}
                >
                  Poista
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
