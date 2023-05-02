import { DisplayReview } from "./DisplayReview";

/**
 * component that goes through all reviews and displays them
 * using the DisplayReview component
 * @param {*} reviews array of all reviews
 * @returns div with all reviews in it
 */
function ListReviews({reviews}){
    return (
        <div>
            <h1>All Reviews</h1>
            <ul>
                {reviews.map((review) => (
                    
                        <>
                            <DisplayReview review={review}/>
                            <p/>
                        </>
                ))}
            </ul>
        </div>
    )
}

export default ListReviews;