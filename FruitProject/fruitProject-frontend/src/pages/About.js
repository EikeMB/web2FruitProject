import { useParams } from "react-router-dom";
import "./About.css"

/**
 * Display information about co founder of website
 * @returns react element with cofoudner information
 */
function About() {
  const { employee } = useParams();

  return (
    <div className="about_body">
      <h1 className="Title"> About us </h1>

      <div className="about_container">
        <div className="about_firstSection">
          <h1>
          <br/>
            Who are we?</h1>
          <p>
          Welcome to the Objectively Best Fruit Tier List! We are a passionate team of fruit enthusiasts 
          dedicated to providing you with comprehensive reviews and rankings of various fruits. 
          Our mission is simple: to help you discover and appreciate the finest fruits available,
           while offering insightful information to enhance your fruit-eating experience. t
          </p>
        </div>  
        <div className="about_firstSection">
        <img src="https://d.ibtimes.co.uk/en/full/337219/eat-yourself-happier.jpg" alt="Girl in a jacket" width="500" height="600"/>

        </div>
      </div>

      <div className="about_container">
        <div className="about_firstSection">
        <img className="img2"width="500" height="600"/>
        </div>  
        <div className="about_firstSection">
        <h1>
          <br/>
           Our Goal</h1>
          <p>
          At the Objectively Best Fruit Tier List, 
          we believe that fruits deserve the spotlight they often miss in the culinary world.
           With so many varieties and flavors to choose from, we aim to be your go-to resource 
           for all things fruity. Whether you're a seasoned fruit connoisseur or just starting your 
           fruit exploration journey, we have something for everyone.
          </p>
        </div>
      </div>


      <div className="about_container">
        <div className="about_firstSection">
          <h1>
            The ultimate resource</h1>
          <p>

          We encourage our visitors to share their own experiences, insights, and recommendations. We believe in the power of collective wisdom, and by fostering a vibrant community, we can all benefit from each other's fruit-related knowledge.
          As you explore our website, you'll find comprehensive fruit profiles, detailed reviews, and visually appealing images that showcase the natural beauty of each fruit.
          So whether you're looking to discover new fruits to tantalize your taste buds, seeking recommendations for the perfect fruit gift basket, or simply want to dive deeper into the world of fruits,
          the Objectively Best Fruit Tier List is your ultimate resource.

          </p>
        </div>  
        <div className="about_firstSection">
        <img src="https://i.imgflip.com/1rpnxz.jpg" alt="Girl in a jacket" width="700" height="600"/>

        </div>
      </div>


    </div>
  );
}

export default About;