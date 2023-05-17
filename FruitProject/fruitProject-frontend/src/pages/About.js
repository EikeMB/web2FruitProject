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
            Goal</h1>
          <p>
          At the Objectively Best Fruit Tier List, 
          we believe that fruits deserve the spotlight they often miss in the culinary world.
           With so many varieties and flavors to choose from, we aim to be your go-to resource 
           for all things fruity. Whether you're a seasoned fruit connoisseur or just starting your 
           fruit exploration journey, we have something for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;