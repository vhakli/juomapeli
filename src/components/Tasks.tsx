import { Task, tasks } from "../data/tasks";
import { Button } from "./Button";
import { useCallback, useState } from "react";
import { Player } from "../@types";

export interface TasksProps {
  players: Player[];
}

export const Tasks = ({ players }: TasksProps) => {
  // so random, much wow
  const [randomTask, setRandomTask] = useState<Task>();
  const getRandomTask = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * tasks.length);
    const task = tasks[randomIndex];
    if (task.description.includes("*random*")) {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      task.description = task.description.replace(
        "*random*",
        randomPlayer.name,
      );
    }
    setRandomTask(task);
  }, [players]);

  return (
    <>
      <Button onClick={() => getRandomTask()}>Get random task</Button>
      {randomTask && <p className="mt-5">{randomTask.description}</p>}
    </>
  );
};
