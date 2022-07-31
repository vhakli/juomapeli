import { useState } from "react";
import { useParams } from "react-router-dom";
import { GameState } from "../context/GameState";

export const useGameStateContext = () => {
  const { data } = useParams();
  const [initialState] = useState<GameState>(() => {
    try {
      const gameData: GameState = data && JSON.parse(atob(data));
      return {
        players: gameData.players || [],
        started: gameData.started || false,
        round: {
          number: gameData.round.number || 1,
        },
        turn: {
          loading: true,
          number: gameData.turn.number || 1,
          player: gameData.turn.player || undefined,
        },
      };
    } catch (e) {
      return {
        players: [],
        started: false,
        round: {
          number: 1,
        },
        turn: {
          loading: false,
          number: 1,
          player: undefined,
        },
      };
    }
  });

  return initialState;
};
