import johnny from "./images/johnny.webp";
import ellen from "./images/ellen.jpeg";
import house from "./images/house.webp";
import stiflersmom from "./images/stiflersmom.webp";
import messi from "./images/messi.webp";
import cobain from "./images/cobain.webp";
export interface mockedUser {
  name: string;
  desc: string;
  img: string;
  score: number;
}

export const mockedUsers: mockedUser[] = [
  {
    name: "Johnny Depp",
    desc: "big baller high roller NPC",
    img: johnny,
    score: 3,
  },
  {
    name: "Ellen DeGeneres",
    desc: "I like boys",
    img: ellen,
    score: 1,
  },
  {
    name: "Dr.House",
    desc: "vicadin pls",
    img: house,
    score: 2,
  },
  {
    name: "Stiflers Mom",
    desc: "i love finch",
    img: stiflersmom,
    score: 4,
  },
  {
    name: "Lionel Messi",
    desc: "who is this Ronaldo",
    img: messi,
    score: 5,
  },
  {
    name: "Kurt Cobain",
    desc: "smells like teen stäke",
    img: cobain,
    score: 7,
  },
  {
    name: "Kurt Cobddain",
    desc: "smells like teen stäke",
    img: cobain,
    score: 7.1,
  },
  {
    name: "Kurt Cossbain",
    desc: "smells like teen stäke",
    img: cobain,
    score: 7.2,
  },
];
