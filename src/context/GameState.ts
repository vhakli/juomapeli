import { createContext } from "react";

export interface GameState {
  players: Player[];
  started: boolean;
  round: {
    number: number;
  };
  turn: {
    number: number;
    loading: boolean;
    player?: Player;
  };
}

export interface Player {
  id: string;
  name: string;
}

export interface IGameStateContext {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

// eslint-disable-next-line
export const GameStateContext = createContext<IGameStateContext>(null as any);
export const GameStateProvider = GameStateContext.Provider;
