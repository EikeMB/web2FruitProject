import{ SingleFruit } from "./SingleFruit";
import { AllFruits } from "./AllFruits";

/**
 * show the components of get/getall fruit
 * @returns react element contraint compoent of get/getall fruit
 */
function Main(){
    return(
        <div>
            <p>Welcome to our Fruit App</p>
            
            <AllFruits/>
        </div>
    );
}

  
export default Main;