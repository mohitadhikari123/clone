import React, { useState } from "react";
import "./Search.css";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider/StateProvider";
import { actionTypes } from "../StateProvider/reducer";
function Search({ hideButtons=false }) {
  const [{},dispatch]=useStateValue();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const search = (e) => {
    e.preventDefault();
   
    dispatch({
      type:actionTypes.SET_SEARCH_TERM,
      term :input
    })
window.localStorage.setItem("Input", String(input));
    navigate("/search");
  };

   const inputValue = window.localStorage.getItem("Input");
    
  return (
    <form className="search">
      <div className="search_input">
        <SearchIcon className="search_inputIcon" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputValue}
        />
        {console.log(input)}

        <MicIcon />
      </div>

      {!hideButtons ? (
        <div className="search_buttons">
          <Button type="submit" onClick={search} variant="outlined">
            Google Search
          </Button>
          <Button variant="outlined">I'm Feeling Lucky</Button>
        </div>
      ) : (
        <div className="search_buttons">
          <Button
            type="submit"
            onClick={search}
            variant="outlined"
            className="search_buttons_hidden"
          >
            Google Search
          </Button>
          <Button variant="outlined" className="search_buttons_hidden">
            I'm Feeling Lucky
          </Button>
        </div>
      )}
    </form>
  );
}
export const {search} = Search;
export default Search;
