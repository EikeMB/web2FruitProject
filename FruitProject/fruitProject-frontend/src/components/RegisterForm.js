import {useRef, useContext} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "./App";
import "./Register.css";

/**
 * create button and text box that allows user to register
 * if the user has enter incorrect information and there's something wrong in the database, there will be a warning of why the error occurred.
 * @returns react element of textbox and button to register;
 */
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
    const handleRegister = () => {
        navigate("/");
    }
    return(
        <form onSubmit={handleSubmit}>
            <h1><br/>Create Account</h1>
            <input className="form-group" type="text" placeholder="Name..." ref={nameRef} required/>
            <input  className="form-group" type="password" placeholder="Password..." ref={passwordRef} required/>
            <input  className="form-group" type="password" placeholder="PasswordConfirm..." ref={passwordConfirmRef} required/>
            
            <button className="Register-btn_r" type="submit">Register</button>
            <button className="login-btn_r" onClick={handleRegister}><span>login</span></button>
        </form>
    );
}

export {RegisterForm};