import React from "react";
import {Outlet} from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import "../components/App.css";

/**
 * organize section of page with components
 * @returns react elemets of component sections of the page
 */
function MainLayout() {
    return <div className="homediv">
            
             <Banner />
             <Header />       
             <Outlet />
             <Footer />	
     
           </div>
 }   

 export default MainLayout;
 