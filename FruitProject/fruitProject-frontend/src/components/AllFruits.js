import { useEffect, useState } from "react"
import { ListFruits } from "./ListFruits"
import { useNavigate } from "react-router-dom";

/**
 * create a button that displays a list of all fruit from the database
 *  if the user has enter incorrect information and there's something wrong in the database, the send them to an error page
 * @returns a button and a list of fruits to display
 */
function AllFruits(){
    const navigate = useNavigate();
    const [fruits, setFruit] = useState([]);

    useEffect(() =>{
        callGetFruit(setFruit, navigate)
    }, [fruits])

    return(
        <> 
        <ListFruits fruits={fruits} />
        </>
    );
}

async function callGetFruit(setFruit, nav) {
    const response = await fetch("http://localhost:1339/fruits", { method: "GET" });
    const result = await response.json();

    if(response.status === 400){
        nav("/Usererror", {state: {errorMessage: result.errorMessage}});
    } else if (response.status === 500){
        nav("/SystemError",{state: {errorMessage: result.errorMessage}})
    }else{
        setFruit(result);
    }
  }

  export { AllFruits };