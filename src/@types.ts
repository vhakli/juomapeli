export interface GameData {
  players: Player[];
  turn: {
    number: number;
    player: Player;
  };
}

export interface Player {
  id: string;
  name: string;
}

export interface PlayersProps {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}
