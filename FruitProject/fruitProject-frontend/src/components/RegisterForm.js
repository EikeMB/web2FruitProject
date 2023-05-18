import {useRef} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function RegisterForm(){
    const nameRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies (["name"]);

    const handleSubmit = async (event) =>{
        event.preventDefault();

        const requestOptions ={
            method: "POST",
            body: JSON.stringify({
                username: nameRef.current.value,
                password: passwordRef.current.value,
                role: "user",
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };

        if(passwordRef == passwordConfirmRef){
        const response = await fetch("http://localhost:1339/users/", requestOptions);
        const result = await response.json();
        if(response.status === 400){
            navigate("/Usererror", {state: {errorMessage: result.errorMessage}});
        } else if (response.status === 500){
            navigate("/SystemError",{state: {errorMessage: result.errorMessage}})
        }else{
            navigate("/");
        } 
    }
    else{
        // navigate("/Usererror", {state: {errorMessage: result.errorMessage}}); // error
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