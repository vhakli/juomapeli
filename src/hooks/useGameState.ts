import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameState, GameStateContext, Player } from "../context/GameState";
import { v4 as uuidv4 } from "uuid";
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
        if (gameData.started) {
          setGameState(gameData);
        }
      } catch (e) {
        navigate("/");
      }
    }
  }, [data]);

  const startGame = (shuffle: boolean) => {
    if (enabled) {
      const players = shuffle
        ? _.shuffle(gameState.players)
        : gameState.players;
      const newGameState: GameState = {
        ...gameState,
        players,
        started: true,
        round: {
          number: 1,
        },
        turn: {
          number: 1,
          loading: true,
          player: players[0],
        },
      };
      updateState(newGameState);
    }
  };

  const continueGame = () => {
    if (enabled) {
      updateState(gameState);
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

  // Helper function to add new player to the game
  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      id: uuidv4(),
      name,
    };
    setGameState({
      ...gameState,
      players: [...gameState.players, newPlayer],
    });
  };

  // Helper function to remove player from the game
  const removePlayer = (id: string) => {
    setGameState({
      ...gameState,
      players: gameState.players.filter((player) => player.id !== id),
    });
  };

  return {
    startGame,
    continueGame,
    endTurn,
    setLoadingState,
    addPlayer,
    removePlayer,
    enabled,
    started: gameState.started,
    players: gameState.players,
    turn: gameState.turn,
    round: gameState.round,
  };
};
