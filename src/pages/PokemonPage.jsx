import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";

function PokemonPage() {

  const params = useParams()
  const navigate = useNavigate()

  // 1. crear estado que alamacena la data externa

  const [pokemonDetails, setPokemonDetails] = useState(null);

  // 2. componentDidMount para llamar a la API

  useEffect(() => {
    getData();
  }, [params.pokeName]);

  const getData = async () => {
    setPokemonDetails(null)

    try {
      // 3. llamada con fetch a la API
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokeName}`);
      const data = await response.json()
      console.log(data)
      //4. almacenar la data dentro del estado
      setPokemonDetails(data)



    } catch (error) {
      console.log(error);
      navigate("/error")
    }
  };

  // 5. gestion de loading/carga
  if(pokemonDetails === null) {
    return <div><FadeLoader size={25} margin={5} color={"red"}/></div>
  }

  return <div>

 {/* 6. Renderizar la data */}
  <h4>Detalles del pokemon</h4>
  <div>
    <h3>{pokemonDetails.name}</h3>
    <img src={pokemonDetails.sprites.front_default} alt="foto" />
  </div>

  </div>;
}

export default PokemonPage;
