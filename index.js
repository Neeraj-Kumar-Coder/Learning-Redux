// Importing redux
const redux = require("redux");
const reduxLogger = require("redux-logger");

// Out action type
const BUY_CAKE = "BUY_CAKE";
const BUY_ICE_CREAM = "BUY_ICE_CREAM";

// Action creator for cake
function buy_cake(quantity = 1) {
    // An action is an object with a 'type' property that describes the action
    // actions only describes what happened, but not describe how the applications state would change
    return {
        type: BUY_CAKE,
        payload: quantity
    };
};

// Action creator for ice cream
function buy_ice_cream(quantity = 1) {
    // An action is an object with a 'type' property that describes the action
    // actions only describes what happened, but not describe how the applications state would change
    return {
        type: BUY_ICE_CREAM,
        payload: quantity
    };
};

// Our initial cake state
const initialCakeState = {
    numberOfCakes: 10
};

// Our initial ice cream state
const initialIceCreamState = {
    numberOfIceCreams: 20
};

// Reducers (they define how the state of the store would actually change depending upon the action specified)
const cakeReducer = (currentState = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...currentState,
                numberOfCakes: currentState.numberOfCakes - action.payload
            };
        default:
            return currentState;
    }
};

const iceCreamReducer = (currentState = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICE_CREAM:
            return {
                ...currentState,
                numberOfIceCreams: currentState.numberOfIceCreams - action.payload
            };
        default:
            return currentState;
    }
};

// Combining multiple reducers
const rootReducer = redux.combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
});

// Creating a logger
const logger = reduxLogger.createLogger();

// Redux store
const store = redux.createStore(rootReducer, redux.applyMiddleware(logger));
console.log("Initial State = ", store.getState());

const unsubscribe = store.subscribe(() => { });

store.dispatch(buy_cake(1));
store.dispatch(buy_cake(2));
store.dispatch(buy_cake(3));
store.dispatch(buy_ice_cream(3));
store.dispatch(buy_ice_cream(1));
unsubscribe();
console.log("Finally the state looks like this", store.getState());