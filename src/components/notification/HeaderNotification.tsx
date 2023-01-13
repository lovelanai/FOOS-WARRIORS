import { useNavigate} from "react-router-dom";
import "./HeaderNotification.sass";

export const HeaderNotification = () => {
    const navigate = useNavigate()
return (
    <div className="circle" onClick={ () => navigate("/notifications")}>4</div>
)
}