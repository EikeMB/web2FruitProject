import{ SingleFruit } from "./SingleFruit";
import { AllFruits } from "./AllFruits";
import "./Main.css"
/**
 * show the components of get/getall fruit
 * @returns react element contraint compoent of get/getall fruit
 */
function Main(){
    return(
        <div>            
            <AllFruits/>
            <div class="scroll-container">
            <a class="scroll-container2" href="#top"><span>to Top </span></a>
            </div>
        </div>
    );
}

  
export default Main;