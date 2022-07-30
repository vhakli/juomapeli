import { useContext } from "react";
import { GameStateContext, Player } from "../context/GameState";
import { v4 as uuidv4 } from "uuid";

/**
 * Hook for managing player state.
 */
export const usePlayers = () => {
  const { gameState, setGameState } = useContext(GameStateContext);

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

  return { players: gameState.players, addPlayer, removePlayer };
};
