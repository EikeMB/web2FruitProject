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
         <div>
             <ul>
                 {fruits.map((fruited) => (                
                     
                     <div className="Image_Box">
                         <button onClick={() => {
                             navigate("/reviews/" + fruited.name)
                         }}>  <img src={fruited.image}/>  <p>{fruited.name}</p></button>   
                         {user.role === "admin" && <DeletePokemon2 name={fruited.name}/>}
                     </div>                                        
                 ))}
             </ul>
         </div>
     );
 }
 
 async function callGetUser(setUser,cookies) {
    const response = await fetch("http://localhost:1339/users/" + cookies.name, { method: "GET" });
    const result = await response.json();
    setUser(result);
  }

 async function GotoReviewFruitPage() {
     const response = await fetch("http://localhost:1339/fruits", { method: "GET" });
     const result = await response.json();
 
   }
 
 export { ListFruits };
