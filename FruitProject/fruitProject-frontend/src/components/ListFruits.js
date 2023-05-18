/**
 * make a list by getting all the fruit in the database
 * @param {Object} fruits 
 * @returns list of fruits to display
 */
 import { DisplayFruit } from "./DisplayFruit";
 import "./ListFruits.css"
 import { useNavigate } from "react-router-dom";
 import {DeletePokemon2} from "./DeleteFruit2";
 import {useCookies} from "react-cookie";
import { useEffect, useState } from "react"

 

 
 function ListFruits({fruits}){
     const navigate = useNavigate();
     const [user, setUser] = useState({});
     const [cookies, setCookie] = useCookies(["role"]);

     useEffect(() =>{
        callGetUser(setUser, cookies)
    },[])
     
     return(
         <div className="Image_Box_Parent">
             <ul className="list_yes">
                 {fruits.map((fruited) => (                
                     
                     <div className="Image_Box">
                         <button onClick={() => {
                             navigate("/reviews/" + fruited.name)
                         }}class="button-style">  <img src={fruited.image } class="card-img" alt="card-img"/>  <p className="button-text">{fruited.name}</p></button>   
                         {user.role === "admin" && <DeletePokemon2 name={fruited.name}/>}
                     </div>                                        
                 ))}
             </ul>
         </div>
     );
 }
 
 async function callGetUser(setUser,cookies) {
    const response = await fetch("http://localhost:1339/users/" + cookies.name, { method: "GET", credentials: "include" });
    const result = await response.json();
    setUser(result);
  }

 
 export { ListFruits };
