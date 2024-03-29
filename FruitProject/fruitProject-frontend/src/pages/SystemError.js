import {Link} from "react-router-dom";
import { useEffect } from "react";
  /**
 * show the user the system error and give them the choice between returning to the home or fruit page
 * @returns react element that display user error
 */
function SystemError({ errorMessage }){
    
    return(
        <div>
            <h1>Oops! There was a system error</h1>
            <p>{errorMessage}</p>
            <Link to="/">Home</Link>

        </div>
    );
}

export default SystemError