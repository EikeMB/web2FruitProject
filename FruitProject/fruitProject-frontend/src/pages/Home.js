import Main from "../components/Main";
import { NameForm } from "../components/NameForm";
import { useCookies } from "react-cookie";
import { useLocation, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert"

  /**
 * show all tool to interact with fruit database
 * @returns react element that display all tool to interact with fruit database
 */
function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [cookies, setCookie] = useCookies (["name"]); const {state } = useLocation();

  return (
    <>
    {state && state.errorMessage && <Alert variant="danger">{state.errorMessage}</Alert>}
    <h1>Hi {searchParams.get("name")}!</h1>
    {cookies.name ? <Main /> : <NameForm />}
    </>
      
  );
}

export default Home;