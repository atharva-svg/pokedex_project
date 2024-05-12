import axios from "axios";
import { useState } from "react";
import usePokemonlist from "./usePokemonlist";
import { useEffect } from "react";

function usePokemonDetails(id){
    const [pokemon, setPokemon] = useState({})
    async function downloadPokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonOfSameTypes = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name: ''}`)
        //console.log("s", pokemonOfSameTypes)
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
            similarPokemons: pokemonOfSameTypes.data.pokemon

        });

        setPokemonliststate({...PokemonListstate, type: response.data.types ? response.data.types[0].type.name: ''} )
       
    }
    const [PokemonListstate, setPokemonliststate]= usePokemonlist()

    useEffect(()=>{
        downloadPokemon();
        console.log("list", pokemon.types, PokemonListstate)
    },[]);

    return [pokemon]
}

export default usePokemonDetails