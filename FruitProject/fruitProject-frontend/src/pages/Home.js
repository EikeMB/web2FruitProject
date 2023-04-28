import Main from "../components/Main";
import { useSearchParams } from "react-router-dom";

  /**
 * show all tool to interact with fruit database
 * @returns react element that display all tool to interact with fruit database
 */
function Home() {
    const [searchParams, setSearchParams] = useSearchParams();

  return (
      <>
      <h1>Hi {searchParams.get("name")}!</h1>
      <Main />
      </>
      
  );
}

export default Home;