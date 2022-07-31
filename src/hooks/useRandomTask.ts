import { useEffect, useState } from "react";
import { Task, tasks } from "../data/tasks";
import { useGameState } from "./useGameState";
import _ from "lodash";
import { Player } from "../context/GameState";

export const useRandomTask = () => {
  const { turn, players, setLoadingState } = useGameState();
  const [randomTask, setRandomTask] = useState<Task>({ title: "" });

  const getRandomPlayerForTask = (includeSelf: boolean) => {
    const playerList = includeSelf
      ? players
      : players.filter((player) => player.id !== turn.player?.id);
    return _.sample(playerList) as Player;
  };

  const getRandomTask = _.debounce(() => {
    const randomIndex = _.random(0, tasks.length - 1);
    const task = tasks[randomIndex];
    if (task.title.includes("*random-any*")) {
      const randomPlayer = getRandomPlayerForTask(true);
      task.title = task.title.replace("*random-any*", randomPlayer.name);
    }
    if (task.title.includes("*random-other*")) {
      const randomPlayer = getRandomPlayerForTask(false);
      task.title = task.title.replace("*random-other*", randomPlayer.name);
    }
    setRandomTask(task);
    setLoadingState(false);
  }, 400);

  useEffect(() => {
    getRandomTask();
  }, [turn.number]);

  return randomTask;
};
