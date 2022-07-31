import { useState } from "react";
import { Button } from "../components/Button";
import { useGameState } from "../hooks/useGameState";
import _ from "lodash";

export const StartPage = () => {
  const {
    enabled,
    started,
    startGame,
    players,
    addPlayer,
    removePlayer,
    continueGame,
  } = useGameState();
  const [playerName, setPlayerName] = useState("");
  const [shuffle, setShuffle] = useState<boolean>(true);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addPlayer(playerName);
    setPlayerName("");
  };

  const buttonTitle = enabled ? "Aloita peli" : "Lisää vähintään 2 pelaajaa";

  return (
    <div className="mt-10 px-4 text-center">
      <div className="flex justify-center space-x-4">
        <button
          title={buttonTitle}
          disabled={!enabled}
          className="h-24 p-6 rounded disabled:bg-slate-500 disabled:cursor-not-allowed bg-green-900 hover:bg-green-800"
          onClick={() => startGame(shuffle)}
        >
          {buttonTitle}
        </button>
        {started && (
          <button
            className="bg-cyan-700 hover:bg-cyan-600 p-6 rounded"
            onClick={() => continueGame()}
          >
            Jatka peliä
          </button>
        )}
      </div>
      <div className="p-2">
        <input
          type="checkbox"
          checked={shuffle}
          className="mr-2"
          onChange={() => setShuffle(!shuffle)}
          id="shuffle"
        />
        <label htmlFor="shuffle">Satunnainen pelijärjestys</label>
      </div>
      <h2 className="text-xl font-bold mt-6">Lisää pelaaja</h2>
      <form onSubmit={onSubmit}>
        <input
          className="text-black h-9 p-2 mr-2 mt-4 rounded-sm"
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
      <h2 className="text-xl font-bold mt-12">Lisätyt pelaajat</h2>
      <table className="border-separate border-spacing-1 m-auto">
        <tbody>
          {_.reverse(
            players.map((player) => (
              <tr key={player.id}>
                <td className="border border-slate-600 px-4 py-2 text-center break-all">
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
