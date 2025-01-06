import axios from "axios";
import React, { useEffect, useState } from "react";
import PokemonList from "./pokemonList";
import Pagination from "./pagination";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextpageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let cancel;

    //axios allows us to pass the second argument which is the options which we pass to get. that is an obj
    axios
      .get(currentPage, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((response) => {
        setLoading(false);
        setNextpageUrl(response.data.next);
        setPrevPageUrl(response.data.previous);
        setPokemon(response.data.results.map((pookie) => pookie.name));
      });
    // .catch((error) => console.error("Errors", error));

    //we have mentioned more setfunctions above, it may override sometime when multiple funcitons are getting called, to close the previous
    //function when we are calling the next function, we are doing the below mentioned method

    //useEffect will allow us to return a function and that function will call the useEffect every time when this function is called
    // return () => cancel();
    //This will cancel the previous function before the new function is called
  }, [currentPage]);

  function gotoNextpage() {
    setCurrentPage(nextPageUrl);
  }

  function gotoPrevpage() {
    setCurrentPage(prevPageUrl);
  }

  if (loading) return "Loading";

  return (
    <>
      <PokemonList pokemon={pokemon}></PokemonList>
      <Pagination
        gotoNextpage={nextPageUrl ? gotoNextpage : null}
        prevPageUrl={prevPageUrl ? gotoPrevpage : null}
      />
    </>
  );
};

export default Pokemon;
