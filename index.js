// Importing redux
const redux = require("redux");

// Out action type
const BUY_CAKE = "BUY_CAKE";

// Action creator
function buy_cake(quantity = 1) {
    // An action is an object with a 'type' property that describes the action
    // actions only describes what happened, but not describe how the applications state would change
    return {
        type: BUY_CAKE,
        payload: quantity
    };
}

// Our initial state
const initialState = {
    numberOfCakes: 10
};

// Reducers (they define how the state of the store would actually change depending upon the action specified)
const reducer = (currentState = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...currentState,
                numberOfCakes: currentState.numberOfCakes - action.payload
            };
        default:
            return currentState;
    }
}

const store = redux.createStore(reducer);
console.log("Initial State = ", store.getState());

const unsubscribe = store.subscribe(() => {
    console.log("Updated State = ", store.getState());
});

store.dispatch(buy_cake(1));
store.dispatch(buy_cake(2));
store.dispatch(buy_cake(3));
unsubscribe();
console.log("Finally the state looks like this", store.getState())