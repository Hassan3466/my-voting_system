// Import configureStore from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Import reducers from slices
import uiReducer from "./ui-slice";   // UI slice reducer
import voteReducer from "./vote-slice"; // Vote slice reducer

// Configure the Redux store
const store = configureStore({
  reducer: {
    ui: uiReducer,     // UI-related state
    vote: voteReducer  // Voting-related state
  }
});

// Export the store for use in <Provider> in main.jsx
export default store;




// import {configureStore} from '@reduxjs/toolkit';

// import uiSlice from "./ui-slice";
// import voteSlice from './vote-slice';




// const store = configureStore ({
//     reducer: {ui: uiSlice.reducer, vote: voteSlice.reducer}
// })



// export default store;

// // Import configureStore from Redux Toolkit
// import { configureStore } from "@reduxjs/toolkit";

// // Import the reducers directly (not the slice objects)
// import uiReducer from "./ui-slice";   // make sure ui-slice.js exports the reducer
// import voteReducer from "./vote-slice"; // make sure vote-slice.js exports the reducer

// // Configure the Redux store
// const store = configureStore({
//   reducer: {
//     ui: uiReducer,   // use the imported reducer
//     vote: voteReducer // use the imported reducer
//   }
// });

// // Export the store
// export default store;
