import { DisplayFruit } from "./DisplayFruit"
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import ListReviews from "./ListReviews";
import "./Reviews.css"

function Reviews(props){
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate();

    async function getReviews(){
        const response = await fetch("http://localhost:1339/reviews/fruits/" + props.fruit.name ,{method: "GET"})
        
        const result = await response.json();

        if(response.status === 400){
            navigate("/", {state:{errorMessage: result.errorMessage}})
        }
        else if(response.status === 500){
            navigate("/", {state:{errorMessage: result.errorMessage}})
        }
        else{
            setReviews(result)
        }
    }
    
    useEffect(() =>{
        getReviews();
    },[])

    return (
        <div className="flex-container"> 
            <div className="fruitCard">
                <DisplayFruit fruit={props.fruit} heading="Fruit"/>
            </div>
            <div className="reviewsList">
                <ListReviews reviews={reviews} />
            </div>
        </div>
    )
}

export default Reviews;