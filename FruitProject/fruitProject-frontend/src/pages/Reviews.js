import { DisplayFruit } from "../components/DisplayFruit"
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom"
import ListReviews from "../components/ListReviews";
import "./Reviews.css"

function Reviews(){
    const {fruitname} = useParams();
    const [reviews, setReviews] = useState([])
    const [fruit, setFruit] = useState([]);
    const navigate = useNavigate();

    async function getReviews(){
        const response = await fetch("http://localhost:1339/reviews/fruits/" + fruitname ,{method: "GET"})
        
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

        const response2 = await fetch("http://localhost:1339/fruits/" + fruitname, {method: "GET"}) ;

        const result2 = await response2.json();

        if(response2.status === 400){
            navigate("/", {state:{errorMessage: result.errorMessage}})
        }
        else if(response2.status === 500){
            navigate("/", {state:{errorMessage: result.errorMessage}})
        }
        else{
            setFruit(result2);
        }
    }

    
    useEffect(() =>{
        getReviews();
    }, []);

    return (
        <div className="flex-container"> 
            <div className="fruitCard">
                <DisplayFruit fruit={fruit} heading="Fruit"/>
            </div>
            <div className="reviewsList">
                <ListReviews reviews={reviews} />
            </div>
        </div>
    )
}

export default Reviews;