import Card from "./Card"

/**
 * component that displays a review using the Card component
 * @param {*} props holds all the contents needed to display a review
 * @returns a Card component with the child body in it
 */
function DisplayReview(props){
    return (
        <Card>
            <h3>{props.heading}</h3>
            <p>Review Title: {props.review.title}
            <br/>
            Review content: {props.review.content}
            <br/>
            Rating: {props.review.rating}
            </p>
        </Card>

    )
}

export { DisplayReview };