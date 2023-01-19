import { useState } from "react";
import "./MyGameCard.sass";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import ICON from "@/assets/icons/icons";
import { useNavigate } from "react-router-dom";
export interface TeamProps {
  playerData: [{
    name: string,
    id: string,
    img: string
  }]
  gameName: string
  }

export const MyGameCard = ({
  gameName,
  playerData
}: TeamProps) => {
  const [teamUpMode, setTeamUpMode] = useState(false);
  const [pinkTeam, setPinkTeam] = useState([{}])
  const [redTeam, setRedTeam] = useState([{}])
  const [isTeamsSet, setIsTeamsSet] = useState(false)
  const {active, finished} = useContext(UserContext)
  const navigate = useNavigate()
 
 const randomTeams = () => {
   setTeamUpMode(true)
  setTimeout(() => {
  const randomArray = playerData.sort(() => Math.random() - Math.random()).slice(0,4)
 const splitArray = Math.ceil(randomArray.length/2)
 const pinkTeam = randomArray.splice(0, splitArray)
 const redTeam = randomArray.splice(-splitArray)
 setPinkTeam(pinkTeam)
 setRedTeam(redTeam)
 setIsTeamsSet(true)
 }, 3000)
}

  return (
    <>
    {active ? (
<>
{!teamUpMode ? (
  <div className="my-game-card">
    <div className="text">
      <h3>{gameName}</h3>
      <p className="title">
        Participants:
      </p>
    
      {playerData?.map((player, key: any) => { 
        return (
          //IKON: check eller klocka beroende på om personen hunnit accepterat eller ej
          // När alla accepterat kommer knappen med "team-up"
          <p key={key}>{player.name} IKON</p>
          )
        })}
        </div>
    <div className="button">
      <button onClick={randomTeams}>Team-up</button>
    </div>
  </div>
) : teamUpMode && !isTeamsSet ? ( <>
  <div className="my-game-card-players">
    {playerData.map((player, key: any) => {
return(
<div key={key} className="playerCard">
      <div className="img" style={{
    backgroundImage: `url(${player.img})`,
  }}/>
      <div className="aside">
        <h3 className="title">{player.name}</h3>
      </div>
    </div>
      )
    })}
    
  </div>
    </>
) : (
  <><div className="my-game-card-players-teamed">
  {pinkTeam.map((player: any, key: any) => {
return(
<div key={key} className="playerCard">
    <div className="img" style={{
  backgroundImage: `url(${player.img})`,
}}/>
    <div className="aside">
      <h3 className="title">{player.name}</h3>
    </div>
  </div>
    )
  })}
    {redTeam.map((player: any, key: any) => {
return(
<div key={key} className="playerCard">
    <div className="img" style={{
  backgroundImage: `url(${player.img})`,
}}/>
    <div className="aside">
      <h3 className="title">{player.name}</h3>
    </div>
  </div>
    )
  })}
</div>
  <div className="team-n-results">
    <h3>Pink Team</h3>
    <button onClick={() => navigate('/battlefield', {state: {pinkTeam: pinkTeam, redTeam: redTeam}})}>Add result</button>
    <h3>Red Team</h3>
    </div></>
)}
</>

    ) : finished? ( 
    <><div className="my-game-card-finished">
    {playerData.map((player: any, key: any) => {
return(
//pink-team inx 0, 1. red-team inx 2, 3. styr bakgrunden. 
<div key={key} className="playerCard">
      <div className="img" style={{
    backgroundImage: `url(${player.img})`,
  }}/>
      <div className="aside">
        <h3 className="title">{player.name}</h3>
      </div>
    </div>
      )
    })}
   
  </div>
  <div className="team-n-results">
      <h2><ICON.CrownBlack style={{width: '4rem'}}/> 10</h2>
      <h2>6</h2>
      </div>
  </>
    ) : <></>}
    </>
   
  );
};
