import ICON from "@/assets/icons/icons";
import "./InviteCard.sass";
import  Dropdown from 'react-dropdown'
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";

interface InviteCard {
    invitedName: string;
  } 

export  const InviteCard = ( {invitedName}: InviteCard) => {
    return (
        <div className="container">
            <div className="icon"><ICON.Invite/></div>
            <h2>Invite {invitedName} </h2>
            <p>Create a new game name</p>
            <input placeholder="Enter game name.."></input>
            <p>Or..</p>
            <p>Add to existing</p>
            <select></select> 

            <button>Send invite</button>
            
        </div>
    )

}