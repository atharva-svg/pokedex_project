import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
import usePokemonlist from "../../Hooks/usePokemonlist";
function PokemonList(){

    const [ PokemonListstate, setPokemonliststate ]= usePokemonlist(false);

    // const [PokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // const [pokedexUrl, setPokedexurl] = useState("https://pokeapi.co/api/v2/pokemon");

    // const [prevUrl, SetPrevurl] = useState('');
    // const [nextUrl, SetNexturl] = useState('');

   

    return(
        
       <div className="pokemon-list-wrapper">
           <div className="pokemon-wrapper">
                {(PokemonListstate.isLoading) ? 'Loading' :
                PokemonListstate.PokemonList.map((p)=> 
                <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} /> )
                }
            </div>
            <div className="controls">
                <button disabled={PokemonListstate.prevUrl == null} onClick={()=>
                     setPokemonliststate({...PokemonListstate, pokedexUrl : PokemonListstate.prevUrl })} >Prev</button>
                <button disabled={PokemonListstate.nextUrl == null} onClick={()=>
                     setPokemonliststate({...PokemonListstate, pokedexUrl : PokemonListstate.nextUrl})} >Next</button>
            </div>
           
        </div>
    )
   
}
export default PokemonList