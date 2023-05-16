import {useContext, useRef} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LoggedInContext , usernameInContext} from "./App";

function NameForm(){
    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies (["name"]);
    const [ isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
    const [username, setUsername] = useContext(usernameInContext);

    const handleSubmit = async (event) =>{
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                username: nameRef,
                password: passwordRef
            }),
            headers: {
                "Content-type": "application/json; charset-UTF-8",
            },
        };
        const response = await fetch("http://localhost:1339/session/login", requestOptions);
        
        if(response.status === 200){
            alert("thanks for login in");
            setIsLoggedIn(true);
            setUsername(nameRef);
            navigate("/");
        } else {
            setIsLoggedIn(false);
            alert("Invalid login. Please try again");
        } 

           
    };
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name..." ref={nameRef} required/>
            <input type="password" placeholder="Password..." ref={passwordRef} required/>
            
            <button type="submit">Submit</button>
        </form>
    );
}

export {NameForm};