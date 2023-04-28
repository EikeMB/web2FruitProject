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

/**
 * create routes that allows to go to differents pages depending on the url passed
 * @returns routes to many differents pages
 */
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />} >
        <Route index element={<Home/>}/>
        <Route path="fruit" element={<Fruit/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="about/:employee" element={<About/>}/>
        <Route path="SystemError" element={<SystemError/>}/>
        <Route path="Usererror" element={<UserError/>}/>
        <Route path="contact" element={<Contact/>}/>
       
      </Route>
      <Route path="*" element={<p>Invalid URL</p>} />
      </Routes>

    </div>
  );
}

export default App;
