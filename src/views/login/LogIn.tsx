import "./LogIn.sass";
import Logo from "@/assets/logos/logos";

export const LogIn = () => {
    return (
        <div className="container">
            <h1 className="title">
                Connect
                <br></br> 
                with 
                <br></br>
                Teams
                </h1>
            <Logo.Teams className="logo"/>
            <p className="description"> To be able to play, you have to connect your microsoft teams account.
            <br></br>
            <br></br>
            Your WARRIOR profile will be setup with your teams-profile information.
            <br></br>
            <br></br>
            You will recieve push-notifications and updates via teams.
            </p>
            <button className="button">Connect with Teams</button>
        </div>
    )
}