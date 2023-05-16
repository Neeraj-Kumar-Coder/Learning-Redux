/**
 * Steps to create redux store:
 * 1. Create actions
 * 2. Define action creators
 * 3. Define reducer
 * 4. Create the redux store (with the middleware of redux-logger to log the changes in the state)
 * 5. Subscribe to the store
 * 6. Dispatch changes
 * 7. Unsubscribe from the store
 */


// Importing redux
const redux = require("redux");
const reduxLogger = require("redux-logger").default;

// State
const initialState = {
    salary: 1_00_000,
    attribute: "SDE"
};

// Creating actions
const INCREMENT_SALARY = "INCREMENT_SALARY";
const DECREMENT_SALARY = "DECREMENT_SALARY";

// Action creators
const incrementSalary = (amount = 10) => {
    return {
        type: INCREMENT_SALARY,
        payload: amount
    }
};

const decrementSalary = (amount = 5) => {
    return {
        type: DECREMENT_SALARY,
        payload: amount
    }
};

// Reducers
const reducer = (currentState = initialState, action) => {
    switch (action.type) {
        case INCREMENT_SALARY:
            return {
                ...currentState,
                salary: currentState.salary + action.payload
            }
        case DECREMENT_SALARY:
            return {
                ...currentState,
                salary: currentState.salary - action.payload
            }
        default:
            return currentState
    }
}

const store = redux.createStore(reducer, redux.applyMiddleware(reduxLogger));
const unsubscribe = store.subscribe(() => { });

console.log("The initial value of the state is = ", store.getState());

store.dispatch(incrementSalary());
store.dispatch(decrementSalary());

unsubscribe();