import { useContext } from "react";
import { LoggedInContext } from "./App";
import {useNavigate} from "react-router-dom";

function LogoutButton(){
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
    const navigate = useNavigate();

    const logout = async () => {
        const requestOptions = {
            method: "GET",
            credentials: "include",

        };
        const response = await fetch("http://localhost:1339/session/logout", requestOptions);
        if(response.status === 200){
            alert("Goodbye, see you later!");
            setIsLoggedIn(false);
            navigate("/");
        }
        else if(response.status === 401){
            alert("Already logged out");
            setIsLoggedIn(false);
            navigate("/");
        }
        else{
            alert("something has gone wrong please try again later")
            setIsLoggedIn(false);
        }
    }

    return(
        <button onClick={logout}>
            Logout
        </button>
    )
}

export default LogoutButton;