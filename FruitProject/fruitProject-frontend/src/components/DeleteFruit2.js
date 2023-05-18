import { useState } from "react"
import "./ListFruits.css"

/**
 * create button that allows user to delete fruits
 * @param {Object} props the data that will represent fruit to set it
 * @returns react element of button to delete;
 */
function DeletePokemon2(props){
    const [fruit, deleteFruit] = useState({});

    return(
        <>
        <button onClick={() => callDeletePokemon(deleteFruit,props.name)} class="delete_btn"> delete</button>
        </>
    );
}

async function callDeletePokemon(deleteFruit, fruitName) {
    const response = await fetch("http://localhost:1339/fruits/" + fruitName, { method: "DELETE"});

    const result = await response.json();
    deleteFruit(result);
  }

  export {DeletePokemon2}