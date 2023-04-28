import "./Card.css";

/**
 * Style the compoent
 * @param {Object} childen the fruit component information
  * @param {Object} image the fruit component to image 
 * @returns react element of the card styled
 */
function Card({ children, image }) {
    return (    
       <div className="card">   
         {image && <img className="card-img" src={image} alt=""></img>} 
          {children}   
       </div>  
    );
  }
  
  export default Card;