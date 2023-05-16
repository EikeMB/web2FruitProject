import './App.css';
import "./styles.css";
import { Route, Routes} from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import SystemError from "../pages/SystemError";
import UserError from "../pages/UserError";
import MainLayout from "../layouts/MainLayout";
import Fruit from "../pages/Fruit";
import Reviews from '../pages/Reviews';
import {createContext, useContext, useEffect, useState } from 'react';

const LoggedInContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const usernameInContext = createContext({
  username: "",
  setUsername: () => {},
});

/**
 * create routes that allows to go to differents pages depending on the url passed
 * @returns routes to many differents pages
 */
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("");
  const UsernameInValueAndSetter = [username, setUsername];
  const LoggedInValueAndSetter = [isLoggedIn, setIsLoggedIn];
useEffect(() => {
  async function checkForLoggedIn(){
    try {
      const response = await fetch("http://localhost/1339/session/auth", {method: "GET", credentials: "include"})
      if(response.status === 200){
        setIsLoggedIn(true);  
      }
      else{
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  }
  checkForLoggedIn();
}, [])

  return (
    <div className="App">
      <LoggedInContext.Provider value={LoggedInValueAndSetter}>
      <Routes>
        <Route path="/" element={<MainLayout />} >
        <Route index element={<Home/>}/>
        <Route path="fruit" element={<Fruit/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="about/:employee" element={<About/>}/>
        <Route path="SystemError" element={<SystemError/>}/>
        <Route path="Usererror" element={<UserError/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="reviews/:fruitname" element={<Reviews/>}/>
       
        </Route>
        <Route path="*" element={<p>Invalid URL</p>} />
      </Routes>
      </LoggedInContext.Provider>
    </div>
  );
}

export default App;
export {LoggedInContext, usernameInContext};