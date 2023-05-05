import { DisplayReview } from "./DisplayReview";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * component that goes through all reviews and displays them
 * using the DisplayReview component
 * @param {*} reviews array of all reviews
 * @returns div with all reviews in it
 */
function ListReviews({reviews}){
    const [cookies, setCookie] = useCookies(["name"]);
    const [review, setReview] = useState([]);
    const navigate = useNavigate();
    const handleDelete = async (review) => {
        
        const response = await fetch("http://localhost:1339/reviews/" + review.title, {method: "DELETE"})
        const result = await response.json();
        if(response.status === 400){
            navigate("/Usererror", {state: {errorMessage: result.errorMessage}});
        } else if (response.status === 500){
            navigate("/SystemError",{state: {errorMessage: result.errorMessage}})
        }
    }

    return (
        <div>
            <h1>All Reviews</h1>
            <ul>
                {reviews.map((review) => (
                    
                        <>
                            
                            <div>
                                <div>
                                    <DisplayReview review={review}/>
                                </div>
                                {cookies.name === review.user && <div>
                                    <button onClick={() => handleDelete(review)}>Delete</button>
                                    <button>Update</button>
                                </div>}
                            </div>
                            <p/>
                        </>
                ))}
            </ul>
        </div>
    )
}

export default ListReviews;