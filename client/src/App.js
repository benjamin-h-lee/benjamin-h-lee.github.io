import React from "react";
import './App.scss';
import { useEffect, useState } from "react";
import Home from "./Home.js";
import Interests from "./Interests";
import handleScroll from "./handleScroll";
import FadeTransition from "./FadeTransition";

function App() {
  const PAGE_TRANSITION_TIME = 1000;


  const [page, setPage] = useState("Home");
  const [shownPage, setShownPage] = useState(<></>);

  useEffect( () => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  useEffect( () => {
    FadeTransition( () => {
      window.scrollTo({ top: 0, behavior: "instant"});
      switch(page) {
        case "Interests":
          setShownPage(<Interests setPage={setPage} />);
          break;
        default:
          setShownPage(<Home setPage={setPage} />);
      }
    }, PAGE_TRANSITION_TIME);
  }, [page])

  return (
    <div className="App">
      {shownPage}
    </div>
  );
}

export default App;















  /*
  //inside App(){
  const [msg, setMsg] = useState("");

  useEffect( () => {
    fetch("http://localhost:8000/test")
      .then( (res) => res.json() )
      .then( (data) => setMsg(data.message));
  }, []);
  */
