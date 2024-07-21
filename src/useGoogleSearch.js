import { useState, useEffect } from "react";
import API_KEY from "./keys";
const CONTEXT_KEY = "b5625aa49cb8244e3";
const useGoogleSearch = (term) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}`
      ).then((response) => response.json()).then(result=>{
        setData(result)
      });
    };
    fetchData(); 
  }, [term]);
  return { data };
};

export default useGoogleSearch;
