import pokemonReducers from "./pokemon.reducer";
import userReducer from "./user.reducer";
import {combineReducers} from 'redux'
import profileReducer from "./profile.reducer";


export default combineReducers({
    pokemon: pokemonReducers,
    user: userReducer,
    profile: profileReducer
})