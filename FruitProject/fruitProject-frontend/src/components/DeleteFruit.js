import { useState } from "react"
import { DeleteFruitForm } from "./DeleteFruitForm.js";
import { DisplayFruit } from "./DisplayFruit";

/**
 * Combining components to delete fruit and displaying it
 * @returns compoents to to delete and display fruits
 */
function DeleteFruit(){
    const [deleted, setDeleted] = useState({});

    return(
        <>  
        <DisplayFruit fruit={deleted} heading="Delete Fruit"/>
        <DeleteFruitForm setDeleted =  {setDeleted}/>
        </>
    );
}

export { DeleteFruit };

//----------------------------------------------------------------review documentation