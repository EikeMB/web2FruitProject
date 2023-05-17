import { useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import UpdateFormReview from "../components/UpdateFormReview";

async function UpdateReview(){
    const navigate = useNavigate();
    const {reviewTitle} = useParams()
    const [review, setReview] = useState([]);

    const reviewResponse = await fetch("http://localhost:1339/reviews/"+reviewTitle, {method: "GET"})

    const result = await reviewResponse.json();

    if(reviewResponse.status === 400){
        navigate("/Usererror", {state: {errorMessage: result.errorMessage}});
    } else if (reviewResponse.status === 500){
        navigate("/SystemError",{state: {errorMessage: result.errorMessage}})
    }else{
        setReview(result);
    } 

    <UpdateFormReview review={review}/>

}

export default UpdateReview;