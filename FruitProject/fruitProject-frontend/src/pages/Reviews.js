import { DisplayFruit } from "../components/DisplayFruit"
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom"
import ListReviews from "../components/ListReviews";
import "./Reviews.css"
import { Cookies, useCookies } from "react-cookie";

function Reviews(){
    const [cookies, setCookie] = useCookies("name");
    const {fruitname} = useParams();
    const [reviews, setReviews] = useState([])
    const [fruit, setFruit] = useState([]);
    const navigate = useNavigate();


    useEffect(() =>{
        getReviews();
    },[]);

    async function getReviews(){
        const response = await fetch("http://localhost:1339/reviews/fruits/" + fruitname.toLocaleLowerCase() ,{method: "GET", credentials: "include"})
        
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

        const response2 = await fetch("http://localhost:1339/fruits/" + fruitname, {method: "GET", credentials: "include"}) ;

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

    
    return (
        <div className="flex-container"> 
            <div className="fruitCard">
                <DisplayFruit fruit={fruit} heading="Fruit"/>
            </div>
            <div className="reviewsList">
                <ListReviews reviews={reviews} fruit={fruitname} />
            </div>
        </div>
    )
}

export default Reviews;