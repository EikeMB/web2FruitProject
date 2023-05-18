
import { AddFruit } from "./AddFruit";
import { UpdateFruit } from "./UpdateFruit";
import { DeleteFruit } from "./DeleteFruit";
import { SingleFruit } from "./SingleFruit";

/**
 * show the components of add/delete/update fruit
 * @returns react element contraint compoent of add/delete/update fruit
 */
function FruitModify(){
    return(
        <div>
            <h1>Admin's Fruit Control</h1>
            <SingleFruit/>
            <AddFruit/>
            <UpdateFruit/>
            <DeleteFruit/>
        </div>
    );
}

  
export default FruitModify;