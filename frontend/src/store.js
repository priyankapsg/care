import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import roomReducers from './reducers/roomReducers';
 


const rootReducer = combineReducers({
    roomReducers: roomReducers,
    
});

const initialState = {};
const middleware = [thunk];
const composeEnhancers = composeWithDevTools({});

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

export default store;
