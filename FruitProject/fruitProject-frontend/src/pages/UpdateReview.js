import { useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import UpdateFormReview from "../components/UpdateFormReview";
import { useEffect } from "react";

function UpdateReview(){
    
    const {reviewTitle} = useParams()
    const [review, setReview] = useState([]);
    const navigate = useNavigate();

    async function handleUpdate(){
        const reviewResponse = await fetch("http://localhost:1339/reviews/"+reviewTitle, {method: "GET"})

        const result = await reviewResponse.json();

    if(reviewResponse.status === 400){
        navigate("/Usererror", {state: {errorMessage: result.errorMessage}});
    } else if (reviewResponse.status === 500){
        navigate("/SystemError",{state: {errorMessage: result.errorMessage}})
    }else{
        setReview(result);
    } 
    }
    useEffect( () =>{
        handleUpdate();
    }, [reviewTitle]);

    return(
        <UpdateFormReview review={review}/>
    )

}

export default UpdateReview;