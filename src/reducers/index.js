import pokemonReducers from "./pokemon.reducer";
import userReducer from "./user.reducer";
import { combineReducers } from 'redux'
import profileReducer from "./profile.reducer";
import reviewSearchReducer from "./reviewSearch.reducer";
import gigReportReducer from "./gigReport.reducer";


export default combineReducers({
    pokemon: pokemonReducers,
    user: userReducer,
    profile: profileReducer,
    search: reviewSearchReducer,
    gigReport: gigReportReducer
})