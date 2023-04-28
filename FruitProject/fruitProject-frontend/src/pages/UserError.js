import { Link, useLocation } from "react-router-dom";

  /**
 * show the user the input error and give them the choice between returning to the home or fruit page
 * @returns react element that display user error
 */
function UserError(){
    const {state} = useLocation();

    return(
        <div>
            <h1>There was an input error</h1>
            <p>{state.errorMessage}</p>
            <Link to="/">Home</Link>
            <br/>
            <Link to="/Fruit">Fruit</Link>
        </div>
    );
}
export default UserError;