import './Pokemon.css'
import { Link } from 'react-router-dom';


function Pokemon({name , image, id}){
    return (
        <div className='pokemon'>
           <Link to= { `/pokemon/${id}` }>
            <div className='pokemon-name' > <h4> {name}</h4> </div>
            <div>
                <img className='pokemon-img' src={image} />
            </div>
            </Link>
        </div>
    )

}

export default Pokemon