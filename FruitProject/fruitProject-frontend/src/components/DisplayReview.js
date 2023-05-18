import ReviewCard from "./ReviewCard.js"

/**
 * component that displays a review using the Card component
 * @param {*} props holds all the contents needed to display a review
 * @returns a Card component with the child body in it
 */
function DisplayReview(props){
    return (
        <ReviewCard>
            <h3>{props.heading}</h3>
            <h1>Review Title: {props.review.title}</h1>
            <br/>
            <h3>
            Review content: {props.review.content}
            </h3>
            <br/>
            <h2>Rating: {props.review.rating}</h2>
            
        </ReviewCard>

    )
}

export { DisplayReview };