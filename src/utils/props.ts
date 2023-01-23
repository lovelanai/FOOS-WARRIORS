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
  id: string;
  players: [UserProps];
}

export interface TeamProps {
  player1: UserProps;
  player2: UserProps;
  color: string;
}

export interface ResultProps {
  winners: TeamProps;
  losers: TeamProps;
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
