import { DisplayReview } from "./DisplayReview";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function UpdateFormReview(props){

    const review = props.review;
    const [ntitle, setNtitle] = useState(null);
    const [ncontent, setNcontent] = useState(null);
    const [nrating, setNrating] = useState(null);


    const navigate = useNavigate();

    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        const requestOptions = {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({
                oldTitle: review.title,
                oldContent: review.content,
                oldRating: review.rating,
                newTitle: ntitle,
                newContent: ncontent,
                newRating: nrating
            }),
            headers: {
                
                "Content-Type": "application/json; charset=utf-8",
            },
        };
        const response = await fetch("http://localhost:1339/reviews", requestOptions);
        
        const result = await response.json();

        if(response.status === 400){
            navigate("/", {state: {errorMessage: result.errorMessage}})
        }
        else if(response.status === 500){
            navigate("/", {state: {errorMessage: result.errorMessage}})
        }
        else{
            navigate("/reviews/"+review.fruit);
        }
    }

    return (
    <>
        <DisplayReview review={review}/>
        <form onSubmit={handleSubmit} className="text-center">
            
            <label htmlFor="newtitle">New Title</label>
            <input type="text" placeholder="New Title..." onChange={(e) => setNtitle(e.target.value)} required/>
            <p/>
            <label htmlFor="newcontent">New Content</label>
            <input type="text" placeholder="New Content..." onChange={(e) => setNcontent(e.target.value)} required/>
            <br></br>
            <p/>
            <label htmlFor="newrating">New Rating</label>
            <input type="number" max="5" min="1" placeholder="New Rating..." onChange={(e) => setNrating(e.target.value)} />
            
            <br></br>
            <p/>
            <button type="submit" >Update Review</button>
        </form>
    </>
    )
}

export default UpdateFormReview;