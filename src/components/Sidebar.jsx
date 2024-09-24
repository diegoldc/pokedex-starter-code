import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

//en este componenete haremos una llamada externa para buscar la data

//1. de donde viene la data? API
//2. como nos anclamos a esa data? fetch
//3. en qué momento hacemos la operación? componentDidMount (useEffect)
//4. una vez que recibimos la data que hacemos con ella? Tenemos que almacernarla en un estado

function Sidebar() {
  const [allPokemon, setAllPokemon] = useState();

  useEffect(() => {
    console.log("patata");
    fetch("https://pokeapi.co/api/v2/pokemon?limit=451")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setAllPokemon(data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (allPokemon === undefined) {
    return <h3>... buscando pokemon</h3>
  }

  return (
    <nav className="sidebar">
      <h5>Elige un pokemon</h5>

      {allPokemon.map((eachPokemon) => {
        return (
          <Link to={`/pokemon-details/${eachPokemon.name}`} key={eachPokemon.name}>
            {eachPokemon.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default Sidebar;
