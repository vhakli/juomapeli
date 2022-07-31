import { Button } from "../components/Button";
import { useGameState } from "../hooks/useGameState";
import { useRandomTask } from "../hooks/useRandomTask";

export const GamePage = () => {
  const { turn, round, endTurn } = useGameState();
  const randomTask = useRandomTask();

  return (
    <div className="w-full md:w-2/3 text-center h-full flex flex-col p-2 mt-12">
      <p className="font-bold">Kierros {round.number}</p>
      <div className="border-solid border-white/50 border-2 rounded-lg p-4 mt-2">
        <h2 className="text-2xl font-bold mb-8">
          Vuorossa: {turn.player?.name}
        </h2>
        <div className="mb-8">
          {turn.loading ? (
            "loading..."
          ) : (
            <>
              <p className="font-bold text-lg mb-1">{randomTask.title}</p>
              <p>{randomTask?.description}</p>
            </>
          )}
        </div>
        <Button disabled={turn.loading} onClick={endTurn}>
          Tehtävä suoritettu
        </Button>
      </div>
    </div>
  );
};
