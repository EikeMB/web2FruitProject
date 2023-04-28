/**
 * make a list by getting all the fruit in the database
 * @param {Object} fruits 
 * @returns list of fruits to display
 */
import { DisplayFruit } from "./DisplayFruit";

function ListFruits({fruits}){
    return(
        <div>
            <ul>
                {fruits.map((fruited) => (
                    <li key = {fruited._id}>
                         <DisplayFruit fruit={fruited} heading="The deleted Fruit:"/>                   
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { ListFruits };

//----------------------------------------------------------------Done