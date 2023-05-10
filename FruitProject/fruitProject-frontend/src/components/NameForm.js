import {useRef} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function NameForm(){
    const nameRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies (["name"]);

    const handleSubmit = async (event) =>{
        event.preventDefault();

        const response = await fetch("http://localhost:1339/users/" + nameRef.current.value + "/" + passwordRef.current.value, { method: "Get" });
        const result = await response.json();
        if(response.status === 400){
            navigate("/Usererror", {state: {errorMessage: result.errorMessage}});
        } else if (response.status === 500){
            navigate("/SystemError",{state: {errorMessage: result.errorMessage}})
        }else{
            setCookie("name", nameRef.current.value);
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