import axios from "axios";
import { useEffect, useState } from "react";
import PokemonList from "../Components/PokemonList/PokemonList";

function usePokemonlist(){
        const [PokemonListstate, setPokemonliststate]= useState({
        PokemonList : [],
        isLoading : true,
        pokedexUrl : "https://pokeapi.co/api/v2/pokemon",
        prevUrl : '',
        nextUrl : '',
    });

    async function downloadPokemons(){
        //setIsLoading(true)
       
           
        // SetPrevurl(response.data.previous);
        // SetNexturl(response.data.next);
    
        //Iterating over array of pokemons, and using thier URL to create an array of promises 
        //that will download those 20 pokemons
   

            setPokemonliststate((state)=>({...state, isLoading : true}))   
            const response= await axios.get(PokemonListstate.pokedexUrl); //this downloads list of 20 pokemons
           
            const Pokemonresult = response.data.results;// We get the array of pokemons from result
        
            console.log(response.data.pokemon);
            console.log(PokemonListstate)
    
            setPokemonliststate((state)=> ({
                ...state,
                prevUrl : response.data.previous,
                nextUrl : response.data.next, 
            }));

        const pokemonResultPromise= Pokemonresult.map((pokemon)=>axios.get(pokemon.url));
       
        //passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise) //array of 20 pokemons detailed data
        console.log(pokemonData);
    
        //now iterating on each data of pokemon and extract id, name, image, types
        const PokeListResult = pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data;
            return {
                    id:     pokemon.id,
                    name:   pokemon.name,
                    image:  (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,   
                    types:  pokemon.types
            }
        })
        //console.log(res);
        console.log(PokeListResult);
        setPokemonliststate((state)=>({
                    ...state,
                    PokemonList: PokeListResult, 
                    isLoading: false }  ))
        
        //setIsLoading(false);
        
    }

    useEffect(()=>{
        downloadPokemons();
    },[PokemonListstate.pokedexUrl]);

    return [ PokemonListstate, setPokemonliststate  ]
}


export default usePokemonlist