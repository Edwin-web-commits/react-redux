const redux = require("redux"); //if the app was react, we would use import statements instead
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers; //combine multiple reducers into one
const applyMiddleware = redux.applyMiddleware; //apply middleware
const logger = reduxLogger.createLogger();

//Action
const BUY_CAKE = "BUY_CAKE";
const BUY_ICE_CREAM = "BUY_ICE_CREAM";

//Action creator
function buyCake() {
  return {
    type: BUY_CAKE, //Action type
    info: "First redux action", //Action info
  };
}
function buyIceCream() {
  return {
    type: BUY_ICE_CREAM, //Action type
    info: "Second redux action", //Action info
  };
}

const initialCakeState = {
  numOfCakes: 10,
};
const initialIceCreamState = {
  numOfIceCreams: 20,
};

//Reducer
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state, //make a copy of the state first
        numOfCakes: state.numOfCakes - 1, //and only update the numOfCakes property of the state
      };
    default:
      return state;
  }
};
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICE_CREAM:
      return {
        ...state, //make a copy of the state first
        numOfIceCreams: state.numOfIceCreams - 1, //and only update the numOfCakes property of the state
      };
    default:
      return state;
  }
};

//combine the reducers into a single root reducer
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger)); //Reducer Store

const unsubscribe = store.subscribe(() => {});

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();
