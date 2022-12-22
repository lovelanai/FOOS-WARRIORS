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
}

export const mockedUsers: mockedUser[] = [
  {
    name: "Johnny Depp",
    desc: "big baller high roller NPC",
    img: johnny,
  },
  {
    name: "Ellen DeGeneres",
    desc: "I like boys",
    img: ellen,
  },
  {
    name: "Dr.House",
    desc: "vicadin pls",
    img: house,
  },
  {
    name: "Stiflers Mom",
    desc: "i love finch",
    img: stiflersmom,
  },
  {
    name: "Lionel Messi",
    desc: "who is this Ronaldo",
    img: messi,
  },
  {
    name: "Kurt Cobain",
    desc: "smells like teen stäke",
    img: cobain,
  },
];
