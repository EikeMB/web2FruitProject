import NavButton from "./NavButton";
import './Header.css';

/**
 * organize the navigation buttons
 * @returns react components of nav buttons
 */
function Header(){
    return(
        <div>
            <div className="test">
                <NavButton to="/" label="Home"/>
                <NavButton to="/Fruit" label="Fruit"/>
                <NavButton to="/about" label="About Us"/>
                <NavButton to="/contact" label="Contact Us"/>
            </div>
        </div>
    );
}

export default Header;