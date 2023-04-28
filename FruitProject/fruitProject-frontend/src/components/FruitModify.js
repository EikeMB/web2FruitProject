
import { AddFruit } from "./AddFruit";
import { UpdateFruit } from "./UpdateFruit";
import {DeleteFruit} from "./DeleteFruit";

/**
 * show the components of add/delete/update fruit
 * @returns react element contraint compoent of add/delete/update fruit
 */
function FruitModify(){
    return(
        <div>
            <h1>Add/Update/Delete Fruit</h1>
            <AddFruit/>
            <UpdateFruit/>
            <DeleteFruit/>
        </div>
    );
}

  
export default FruitModify;