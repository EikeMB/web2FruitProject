import React from "react";
import './Banner.css';

/**
 * Create a banner to display to ui
 * @returns react element of the banner
 */
function Banner(){
    return(  
    <div className="banner-image">
        <div className="banner-text">
            <h1>The Objectively Best Fruit Tier List</h1>
        </div>
    </div>
    );
}

export default Banner;