import { useState } from "react"
import { SingleFruitForm } from "./SingleFruitForm.js";
import { DisplayFruit } from "./DisplayFruit";
/**
 * Combining components to get fruit and displaying it
 * @returns react element with compoents to get and display fruits
 */
function SingleFruit(){
    const [find, setFind] = useState({});

    return(
        <>
        <DisplayFruit fruit={find} heading="Find Fruit"/>
        <SingleFruitForm setFind =  {setFind}/>
        
        </>
    );
}

export { SingleFruit };

//----------------------------------------------------------------review documentation