import Main from "../components/Main";
import { NameForm } from "../components/NameForm";
import { useCookies } from "react-cookie";
import { useLocation, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert"
import { LoggedInContext } from "../components/App";
import { useContext, useEffect } from "react";

  /**
 * show all tool to interact with fruit database
 * @returns react element that display all tool to interact with fruit database
 */
function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [cookies, setCookie] = useCookies (["name", "sessionId"]); const {state } = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useContext(LoggedInContext);
    
    useEffect(() => {
      async function checkForLoggedIn(){
        try { 
          const response = await fetch("http://localhost:1339/session/auth", {method: "GET", credentials: "include"})
          if(response.status === 200){
            setIsLoggedIn(true);  
            
          }
          else{
            const cookie = cookies.sessionId;
            if(!cookie){
              setIsLoggedIn(false);
            }
          }
        } catch (error) {
          setIsLoggedIn(false);
        }
      }
      checkForLoggedIn();
    },[])
  return (
    <>
    {state && state.errorMessage && <Alert variant="danger">{state.errorMessage}</Alert>}

    <br/>
    {isLoggedIn ? <Main /> : <NameForm />}
    </>
      
  );
}

export default Home;