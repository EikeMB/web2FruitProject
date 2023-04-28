import { useParams } from "react-router-dom";

/**
 * Display information about co founder of website
 * @returns react element with cofoudner information
 */
function About() {
  const { employee } = useParams();

  return (
    <div>
      <h1>Yensan and Eike are the co founder of this website.</h1> 
      {employee === "Yensan" && <h2>Yensan is Coconut enjoyer</h2>}
      {employee === "Eike" && <h2>Eike is a avocado enjoyer</h2>}
    </div>
  );
}

export default About;