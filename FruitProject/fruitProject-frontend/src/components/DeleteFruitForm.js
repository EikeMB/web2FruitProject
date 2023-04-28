import {useRef} from "react";
import { useNavigate } from "react-router-dom";

/**
 * create button and text box that allows user to delete fruits
 * if the user has enter incorrect information and there's something wrong in the database, the send them to an error page
 * @param {Object} props the data that will represent fruit to set it
 * @returns react element of textbox for name;
 */
function DeleteFruitForm(props){
    const navigate = useNavigate();
    const nameRef = useRef(null);

    const handleSubmit = async (event) =>{
        event.preventDefault();

        const response = await fetch("http://localhost:1339/fruits/" + nameRef.current.value, { method: "DELETE" });
        const result = await response.json();
        if(response.status === 400){
            navigate("/Usererror", {state: {errorMessage: result.errorMessage}});
        } else if (response.status === 500){
            navigate("/SystemError",{state: {errorMessage: result.errorMessage}})
        }else{
            props.setDeleted(result);
        } 
    };

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" placeholer="Name.." ref={nameRef} required />
            <button type= "submit">Delete Fruit </button>
        </form>
    );      
}

export {DeleteFruitForm};

//----------------------------------------------------------------------Finished Form