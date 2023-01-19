export interface UserProps {
  name: string;
  description: string;
  img: string;
  id: string;
  email: string;
  wins: number;
  losses: number;
  ratio: number;
  currentToken: string;
}

export interface GameProps {
  gameName: string;
  id: string;
  players: [UserProps];
}

export interface NotificationProps {
  title: string;
  text: string;
  time: string;
  id: string;
}

export interface MessageProps {
  to: string;
  body: string;
  title: string;
  recieverId: string;
}
