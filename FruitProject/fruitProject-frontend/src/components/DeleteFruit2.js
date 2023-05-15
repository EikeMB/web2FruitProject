import { useState } from "react"
import "./ListFruits.css"

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