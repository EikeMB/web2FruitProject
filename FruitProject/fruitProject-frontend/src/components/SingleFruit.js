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
        <SingleFruitForm setFind =  {setFind}/>
        <DisplayFruit fruit={find} heading="Find Fruit"/>
        </>
    );
}

export { SingleFruit };

//----------------------------------------------------------------review documentation