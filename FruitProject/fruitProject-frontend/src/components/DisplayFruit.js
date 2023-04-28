import Card from "./Card.js";

/**
 * Takes the name, vitamin, calories and details of pokemons and display them 
 * Takes the heading given to display what is being displayed
 * @param {Object} props fruit information
 * @returns react element og the information of fruit
 */
function DisplayFruit(props){
    return(
        <>
        <Card>

        <h1>{props.heading}</h1>
        
        <img src={props.fruit.image} class="card-img" alt="card-img"></img>
        <h1>Name: {props.fruit.name}</h1>
        <h2>Vitamin: {props.fruit.vitamin}</h2>
        <h2>Calories: {props.fruit.calories}</h2>
        <h2>Details: {props.fruit.details}</h2>
        
        </Card>
        </>
    );
}

export { DisplayFruit };

//--------------------------------------------------------------------Finished