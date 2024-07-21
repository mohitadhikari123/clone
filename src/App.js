// import  Search  from "./Pages/Search";
import "./App.css";
import Home from "./Pages/Home";
import Images from "./Pages/Images";
import Result from "./Pages/Result";
import {  Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Result />}></Route>
        <Route path="/images" element={<Images/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
