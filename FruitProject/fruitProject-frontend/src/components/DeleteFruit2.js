import { useState } from "react"

function DeletePokemon2(props){
    const [fruit, deleteFruit] = useState({});

    return(
        <>
        <button onClick={() => callDeletePokemon(deleteFruit,props.name)}> delete</button>
        </>
    );
}

async function callDeletePokemon(deleteFruit, fruitName) {
    const response = await fetch("http://localhost:1339/fruits/" + fruitName, { method: "DELETE"});

    const result = await response.json();
    deleteFruit(result);
  }

  export {DeletePokemon2}