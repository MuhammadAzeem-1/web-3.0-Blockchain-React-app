import React, { useState } from "react";
import { useEffect } from "react";

const APIKEY = "aX6H8m7VFcO39aeZN7tpF5FKRu6MNk57";

const useFetch = ({ keyword }) => {
  const [gifs, setGifs] = useState();

  const GifyFetch = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=aX6H8m7VFcO39aeZN7tpF5FKRu6MNk57&q=${keyword
          .split(" ")
          .join("")}&limit=1`
      );
      const { result } = await response.json();
      console.log(result[0]?.images?.downsized_medium.url);
      setGifs(result);
    } catch (error) {
      setGifs(
        "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284"
      );
    }
  };

  useEffect(() => {
    GifyFetch();
  }, [keyword]);

  return gifs;
};

export default useFetch;
