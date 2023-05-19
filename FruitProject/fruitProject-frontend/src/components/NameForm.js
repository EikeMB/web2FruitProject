import {useContext, useRef} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./NameForm.css"
import { LoggedInContext , usernameInContext} from "./App";
import { RegisterForm } from "./RegisterForm";

/**
 * create button and text box that allows user to get login
 * if the user has enter incorrect information and there's something wrong in the database, the send them to an error page
 * @returns react element of textbox for name;
 */
function NameForm(){
    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies (["name"]);
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext)

    const handleSubmit = async (event) =>{
        event.preventDefault();
        

        const response = await fetch("http://localhost:1339/session/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            username: nameRef.current.value,
            password: passwordRef.current.value,
        }),
        headers: {
            "Content-Type": "application/json"
        },
    });
        
        if(response.status === 200){
            // alert("thanks for login in");
            setIsLoggedIn(true);
            setCookie("name", nameRef.current.value);
            navigate("/");
        } else {
            setIsLoggedIn(false);
            alert("Invalid login. Please try again");
        } 

           
    };

    const handleRegister = () => {
        navigate("/register");
    }
    return(
        <div>
        <form onSubmit={handleSubmit}>
        <h1><br/>Connect Account</h1>
            <input className="form-group" type="text" placeholder="Name..." ref={nameRef} required/>
            <input  className="form-group" type="password" placeholder="Password..." ref={passwordRef} required/>
            
            <button className="login-btn" type="submit"><span>Login</span></button>
            <button className="Register-btn" onClick={handleRegister}><span>Register</span></button>
        </form>
        
        </div>
    );
}

export {NameForm};