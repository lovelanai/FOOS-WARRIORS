export interface UserProps {
  name: string;
  description: string;
  img: string;
  id: string;
  email: string;
  currentToken: string;
}

export interface GameProps {

  gameName: string,
  id: string
  players: {
    id: string,
    name: string,
    img: string
  }
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
