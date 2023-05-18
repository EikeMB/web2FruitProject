import "./ReviewCard.css";

/**
 * Style the compoent
 * @param {Object} childen the fruit review component information
  * @param {Object} image the fruit review component to image 
 * @returns react element of the card styled
 */
function ReviewCard({ children, image }) {
    return (    
       <div className="reviewCard">   
         {image && <img className="reviewCard-img" src={image} alt=""></img>} 
          {children}   
       </div>  
    );
  }
  
  export default ReviewCard;