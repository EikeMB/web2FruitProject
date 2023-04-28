import { useState } from "react"
import { AddFruitForm } from "./AddFruitForm.js";
import { DisplayFruit } from "./DisplayFruit";

/**
 * Combining components to add fruit and displaying it
 * @returns react element with compoents to add and display fruits
 */
function AddFruit(){
    const [added, setAdded] = useState({});

    return(
        <>
        
        <DisplayFruit fruit={added} heading="Add Fruit"/>
        <AddFruitForm setAdded =  {setAdded}/>
        </>
    );
}

export { AddFruit };