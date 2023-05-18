import {useRef} from "react";
import { useNavigate } from "react-router-dom";

/**
 * create button and text box that allows user to add fruits
 * if the user has enter incorrect information and there's something wrong in the database, the send them to an error page
 * @param {Object} props the data that will represent fruit to set it
 * @returns react element of textbox for name, vitamin, calories, details and image, and a button;
 */
function AddFruitForm(props){
    const navigate = useNavigate();

    const nameRef = useRef(null);
    const vitaminRef = useRef(null);
    const caloriesRef = useRef(null);
    const detailsRef = useRef(null);
    const imageRef = useRef(null);

    const handleSubmit = async (event) =>{
        event.preventDefault();

        const requestOptions ={
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                fruitName: nameRef.current.value,
                fruitVitamin: vitaminRef.current.value,
                fruitCalories: caloriesRef.current.value,
                fruitDetails: detailsRef.current.value,
                fruitImage: imageRef.current.value
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
            props.setAdded(result);
        } 
    };

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" placeholer="Name.." ref={nameRef} required />
            <label htmlFor="vitamin">Vitamin</label>
            <input type="text" placeholer="Vitamin.." ref={vitaminRef} required />
            <label htmlFor="calories">Calories</label>
            <input type="text" placeholer="Calories.." ref={caloriesRef} required />
            <label htmlFor="details">Details</label>
            <input type="text" placeholer="Details.." ref={detailsRef} required />
            <label htmlFor="image">Image</label>
            <input type="text" placeholer="Image.." ref={imageRef} required />
            <button type= "submit">Add Fruit </button>
        </form>
    );      
}

export {AddFruitForm};
