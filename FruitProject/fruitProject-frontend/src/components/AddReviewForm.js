import {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./forms.css"

function AddReviewForm(props){
    const user = props.user;
    const fruit = props.fruit.toLowerCase();
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [rating, setRating] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        const requestOptions = {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                user: user,
                fruit: fruit,
                title: title,
                content: content,
                rating: rating
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
            navigate("/reviews/"+result.fruit)
        }
        
    }

    return (
        <form onSubmit={handleSubmit} className="text-center">
            <label htmlFor="title">Title</label>
            <input type="text" placeholder="Title..." onChange={(e) => setTitle(e.target.value)} required/>
            <p/>
            <label htmlFor="content">Content</label>
            <input type="text" placeholder="Content..." onChange={(e) => setContent(e.target.value)} required/>
            <br></br>
            <p/>
            <label htmlFor="rating">Rating</label>
            <input type="number" max="5" min="1" placeholder="Rating..." onChange={(e) => setRating(e.target.value)} />
            
            <br></br>
            <p/>
            <button type="submit">Add Review</button>
        </form>
    )
}

export default AddReviewForm;