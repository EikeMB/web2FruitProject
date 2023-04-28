import {useState} from "react";
import { useNavigate } from "react-router-dom";
/**
 * create button and text box that allows user to update fruits
 * if the user has enter incorrect information and there's something wrong in the database, the send them to an error page
 * @param {Object} props the data that will represent fruit to set it
 * @returns react element of textbox for name, vitamin, calories, details and image, and a button;
 */
function UpdateFruitForm(props){
    const navigate = useNavigate();
    
    const [oldName, setOldName] = useState(null);
    const [newName, setnewName] = useState(null);
    const [newVitamin, setnewVitamin] = useState(null);
    const [newCalories, setnewCalories] = useState(null);
    const [newDetails, setnewDetails] = useState(null);
    const [newImage, setnewImage] = useState(null);
    

    const handleSubmit = async (event, setUpdated) =>{
        event.preventDefault();

        const requestOptions ={
            method: "PUT",
            body: JSON.stringify({
                oldFruitName: oldName,
                newFruitName: newName,
                fruitVitamin: newVitamin,
                fruitCalories: newCalories,
                fruitDetails: newDetails,
                fruitImage: newImage 
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        };

        const response = await fetch("http://localhost:1339/fruits", requestOptions);
        const result = await response.json();
        if(response.status === 400){
            navigate("/Usererror", {state: {errorMessage: result.errorMessage}});
        } else if (response.status === 500){
            navigate("/SystemError",{state: {errorMessage: result.errorMessage}})
        }else{
            props.setUpdated(result);
        } 
    };

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="oldName">Current Name</label>
            <input type="text" placeholer="Current Name" onChange={(e) => setOldName(e.target.value)}/>
            <label htmlFor="newName">New Name</label>
            <input type="text" placeholer="New Name" onChange={(e) => setnewName(e.target.value)}/>
            <label htmlFor="newVitamin">New Vitamin</label>
            <input type="text" placeholer="New Type" onChange={(e) => setnewVitamin(e.target.value)}/>
            <label htmlFor="newCalories">New Calories</label>
            <input type="text" placeholer="New Calories" onChange={(e) => setnewCalories(e.target.value)}/>
            <label htmlFor="newDetails">New Details</label>
            <input type="text" placeholer="New Details" onChange={(e) => setnewDetails(e.target.value)}/>
            <label htmlFor="newImage">New Image</label>
            <input type="text" placeholer="New Image" onChange={(e) => setnewImage(e.target.value)}/>
            {oldName && newName && <button type="submit">Update Fruit</button>}
        </form>

    );      
}

export {UpdateFruitForm};