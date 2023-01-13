import ICON from "@/assets/icons/icons"
import { Header } from "@/components/header/Header"
import { GamesImInCard, MyGameCard } from "@/components/my-games/MyGameCard"
import "./MyGames.sass"
import { mockedUser, mockedUsers } from "@/mockedUsers/mockedUsers";
import { useState } from "react";
import { PrimaryButton } from "@/components/primary-button/PrimaryButton";

export const MyGames = () => {

    const [newGameMode, setNewGameMode] = useState(false)

    return (
        <div className="my-games">
            {!newGameMode ? (
                <>
            <Header 
            element={<ICON.Arrow/>}
            title="My Games"/>

        <div className="icon" onClick={() => setNewGameMode(true)}><ICON.Add/></div>

        <div className="games-menu">
            <h3>Games I host</h3>
            <div className="links">
                <p>Pending</p>
                <p>Active</p>
                <p>Finished</p>
            </div>  
        </div>
        <div className="my-games-container">
                <MyGameCard 
                playerOne={mockedUsers[1]}
                playerTwo={mockedUsers[2]}
                playerThree={mockedUsers[3]}
                playerFour={mockedUsers[4]}/>
            </div>
        
            <div className="games-menu">
            <h3>Games I'm in</h3>
            <div className="links">
                <p>Pending</p>
                <p>Active</p>
                <p>Finished</p>
            </div>  
        </div>
        <div className="my-games-container">
                <GamesImInCard />
            </div>
            </>

            ) : (
                <>
                <Header 
                title="New game"/>
    
            <div className="new-name-view">
                <h3>Create a new game </h3>
                <input placeholder="Type game name.."></input>
                 <div className="btn-group">
                     <button className="continue">Continue</button>
                 <button className="exit">Exit</button>
                 </div>
            </div>
                </>
    
            )}




        </div>
    )
}