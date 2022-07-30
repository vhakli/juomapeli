import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameState, GameStateContext } from "../context/GameState";
import _ from "lodash";

/**
 * Hook for managing game state.
 */
export const useGameState = () => {
  const navigate = useNavigate();
  const { data } = useParams();
  const { gameState, setGameState } = useContext(GameStateContext);
  const [enabled, setEnabled] = useState<boolean>(false);

  const updateState = (newState: GameState) => {
    setGameState(newState);
    navigate(`/${btoa(JSON.stringify(newState))}`);
  };

  useEffect(() => {
    setEnabled(gameState.players.length > 1);
  }, [gameState.players]);

  useEffect(() => {
    if (data) {
      try {
        const gameData = JSON.parse(atob(data));
        console.log("gameData", gameData);
        if (!gameState.turn.player) {
          setGameState(gameData);
        }
      } catch (e) {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [data]);

  const startGame = (shuffle: boolean) => {
    if (enabled) {
      const players = shuffle
        ? _.shuffle(gameState.players)
        : gameState.players;

      const startedGameState: GameState = {
        ...gameState,
        players,
        round: {
          number: 1,
        },
        turn: {
          number: 1,
          loading: true,
          player: players[0],
        },
      };
      updateState(startedGameState);
    }
  };

  const endTurn = () => {
    const nextTurnState: GameState = {
      ...gameState,
      round: {
        number:
          gameState.turn.number % gameState.players.length === 0
            ? gameState.round.number + 1
            : gameState.round.number,
      },
      turn: {
        number: gameState.turn.number + 1,
        loading: true,
        player:
          gameState.players[gameState.turn.number % gameState.players.length],
      },
    };
    updateState(nextTurnState);
  };

  const setLoadingState = (state: boolean) => {
    const loadingState: GameState = {
      ...gameState,
      turn: {
        ...gameState.turn,
        loading: state,
      },
    };
    updateState(loadingState);
  };

  return {
    enabled,
    startGame,
    endTurn,
    setLoadingState,
    turn: gameState.turn,
    round: gameState.round,
  };
};
