import { Button } from "../components/Button";
import { useGameState } from "../hooks/useGameState";
import { useRandomTask } from "../hooks/useRandomTask";

export const GamePage = () => {
  const { turn, round, endTurn } = useGameState();
  const randomTask = useRandomTask();

  return (
    <div className="w-1/3 text-center h-full flex flex-col">
      <p>Kierros {round.number}</p>
      <div className="border-solid border-white border-2 p-4 mt-6">
        <h2 className="text-xl font-bold mb-4">{turn.player?.name}</h2>
        <p className="mb-4">{turn.loading ? "loading..." : randomTask}</p>
        <Button onClick={endTurn}>Tehtävä suoritettu</Button>
      </div>
    </div>
  );
};
