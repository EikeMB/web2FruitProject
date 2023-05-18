import {useRef, useContext} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "./App";

function RegisterForm(){
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies (["name"]);
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext)

    const handleSubmit = async (event) =>{
        event.preventDefault();

        const requestOptions ={
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                username: nameRef.current.value,
                password: passwordRef.current.value,
                role: "user",
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };

        if(passwordRef.current.value == passwordConfirmRef.current.value){
        const response = await fetch("http://localhost:1339/session/register", requestOptions);
        if(response.status === 400){
            setIsLoggedIn(false);
            alert("invalid register")
        } else if (response.status === 500){
            setIsLoggedIn(false);
            alert("Error with server please try again later");
        }else{
            setCookie("name", nameRef.current.value)
            setIsLoggedIn(true);
            alert("successfully registered")
            navigate("/");
        } 
        }
        else{
            navigate("/Usererror", {state: {errorMessage: "Passwords do not match"}}); // error
        }

           
    };
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name..." ref={nameRef} required/>
            <input type="password" placeholder="Password..." ref={passwordRef} required/>
            <input type="password" placeholder="PasswordConfirm..." ref={passwordConfirmRef} required/>
            
            <button type="submit">Submit</button>
        </form>
    );
}

export {RegisterForm};