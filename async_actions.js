const redux = require("redux");
const thunk = require("redux-thunk").default;
const axios = require("axios");

const initialState = {
    loading: false,
    users: [],
    error: ""
}

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
};

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
};

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
};


const reducer = (currentState = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...currentState,
                loading: true
            }

        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ""
            }

        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    }
};

const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest());

        axios.get("https://jsonplaceholder.typicode.com/todos")
            .then((value) => {
                const users = value.data.map(user => user.userId);
                dispatch(fetchUsersSuccess(users));
            })
            .catch((error) => {
                dispatch(fetchUsersFailure(error));
            });
    }
}

const store = redux.createStore(reducer, redux.applyMiddleware(thunk));
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());