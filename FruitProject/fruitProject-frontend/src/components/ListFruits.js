/**
 * make a list by getting all the fruit in the database
 * @param {Object} fruits 
 * @returns list of fruits to display
 */
 import { DisplayFruit } from "./DisplayFruit";
 import "./ListFruits.css"
 import { useNavigate } from "react-router-dom";
 
 function ListFruits({fruits}){
     const navigate = useNavigate();
     return(
         <div>
             <ul>
                 {fruits.map((fruited) => (                
                     
                     <div className="Image_Box">
                         <button onClick={() => {
                             navigate("/reviews/" + fruited.name)
                         }}>  <img src={fruited.image}/>  <p>{fruited.name}</p></button>   
                     </div>                                        
                 ))}
             </ul>
         </div>
     );
 }
 
 async function GotoReviewFruitPage() {
     const response = await fetch("http://localhost:1339/fruits", { method: "GET" });
     const result = await response.json();
 
   }
 
 export { ListFruits };
