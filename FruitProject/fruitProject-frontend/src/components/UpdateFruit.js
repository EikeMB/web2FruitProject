import { useState } from "react"
import { UpdateFruitForm } from "./UpdateFruitForm";
import { DisplayFruit } from "./DisplayFruit";

/**
 * Combining components to update fruit and displaying it
 * @returns react element with compoents to update and display fruits
 */
function UpdateFruit(){
    const[updated,setUpdated] = useState({});

    return(
        <>
        <DisplayFruit fruit ={updated} heading ="Update fruit:"/>
        <UpdateFruitForm setUpdated={setUpdated}/>
        </>
    );
}

export {UpdateFruit};