import { useEffect, useState } from "react";
import { tasks } from "../data/tasks";
import { useGameState } from "./useGameState";
import _ from "lodash";

export const useRandomTask = () => {
  const { turn, setLoadingState } = useGameState();
  const [randomTask, setRandomTask] = useState<string>();

  useEffect(() => {
    setTimeout(() => {
      const randomIndex = _.random(0, tasks.length - 1);
      const task = tasks[randomIndex];
      setRandomTask(task);
      setLoadingState(false);
    }, 500);
  }, [turn.number]);

  return randomTask;
};
