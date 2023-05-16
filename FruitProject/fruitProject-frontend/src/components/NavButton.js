import {NavLink, useResolvedPath, useMatch } from "react-router-dom";

function NavButton(props){
    let resolved = useResolvedPath(props.to);
    let match = useMatch({ path: resolved.pathname, end:true });

    const buttonStyle = {
        backgroundColor: "grey",
        border: "none",
        color: "white",
        padding: "15px 32px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",  
        
        
        
    };

    const activeButtonStyle = {
        backgroundColor: "orange",
        border: "none",
        color: "black",
        padding: "15px 32px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",     
    };

    return(
        <NavLink to={props.to}>
        <button style={match ? activeButtonStyle : buttonStyle}>
          <p>{props.label}</p>
        </button>
     </NavLink>
    );
}

export default NavButton;