import { useState } from "react"
import "./ListFruits.css"

/**
 * button that deletes fruit in a single click
 * @returns compoents to to delete and display fruits
 */
function DeleteFruit2(props){
    const [fruit, deleteFruit] = useState({});

    return(
        <>
        <button onClick={() => callDeletePokemon(deleteFruit,props.name)} class="delete_btn"> delete</button>
        </>
    );
}

async function callDeletePokemon(deleteFruit, fruitName) {
    const response = await fetch("http://localhost:1339/fruits/" + fruitName, { method: "DELETE", credentials: "include"});

    const result = await response.json();
    deleteFruit(result);
  }

  export {DeleteFruit2}