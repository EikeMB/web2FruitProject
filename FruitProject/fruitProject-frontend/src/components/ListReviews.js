import { DisplayReview } from "./DisplayReview";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  UpdateFormReview  from "./UpdateFormReview";
import AddReviewForm from "./AddReviewForm";

/**
 * component that goes through all reviews and displays them
 * using the DisplayReview component
 * @param {*} reviews array of all reviews
 * @returns div with all reviews in it
 */
function ListReviews(props){
    const [cookies, setCookie] = useCookies(["name"]);
    const [review, setReview] = useState([]);
    const navigate = useNavigate();
    const handleDelete = async (review) => {
        
        const response = await fetch("http://localhost:1339/reviews/" + review.title, {method: "DELETE", credentials: "same-origin"})
        const result = await response.json();
        if(response.status === 400){
            navigate("/Usererror", {state: {errorMessage: result.errorMessage}});
        } else if (response.status === 500){
            navigate("/SystemError",{state: {errorMessage: result.errorMessage}})
        }
    }

    const handleUpdate = async (review) => {
        navigate("/UpdateReview/"+review.title)
    }

    return (
        <div>
            <h1>All Reviews</h1>
            <ul>
                {props.reviews.map((review) => (
                    
                        <>
                            
                            <div>
                                <div>
                                    <DisplayReview review={review}/>
                                </div>
                                {cookies.name === review.user && <div>
                                    <button onClick={() => handleDelete(review)}>Delete</button>
                                    <button onClick={() => handleUpdate(review)}>Update</button>
                                </div>}
                            </div>
                            <p/>
                        </>
                ))}
            </ul>
            <AddReviewForm fruit={props.fruit} user={cookies.name}/>
        </div>
    )
}

export default ListReviews;