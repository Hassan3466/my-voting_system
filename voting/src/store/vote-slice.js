// Import createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Get the current voter from localStorage if available
const currentVoter = JSON.parse(localStorage.getItem("currentUser"));

// Define the initial state for the vote slice
const initialState = {
  selectedVoteCandidate: "",       // candidate currently selected
  currentVoter,                    // logged-in voter info
  selectedElection: "",            // election currently selected
  idOfElectionToUpdate: "",        // election ID being updated
  addCandidateElectionId: ""       // election ID for adding a candidate
};

// Create the slice
const voteSlice = createSlice({
  name: "vote",                    // name of the slice
  initialState,                    // initial state defined above
  reducers: {
    // Set selected candidate
    changeSelectedVoteCandidate(state, action) {
      state.selectedVoteCandidate = action.payload;
    },
    // Update the current voter in state
    changeCurrentVoter(state, action) {
      state.currentVoter = action.payload;
    },
    // Update selected election
    changeSelectedElection(state, action) {
      state.selectedElection = action.payload;
    },
    // Update election ID for editing
    changeIdOfElectionToUpdate(state, action) {
      state.idOfElectionToUpdate = action.payload;
    },
    // Update election ID for adding candidate
    changeAddCandidateElectionId(state, action) {
      state.addCandidateElectionId = action.payload;
    }
  }
});

// Export actions for use in React components
export const voteActions = voteSlice.actions;

// Export the reducer for store configuration
export default voteSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// // const currentVoter = {id:"", token:"", isAdmin: false  }
// const currentVoter = JSON.parse(localStorage.getItem("currentUser"))
// const initialState = {selectedVoteCandidate:"", currentVoter, selectedElection:"", idOfElectionToUpdate: "",addCandidateElectionId: "" }

// const voteSlice = createSlice({
//     name: "vote",
//     initialState,
//     reducers: {
//         changeSelectedVoteCandidate(state, action){
//             state.selectedVoteCandidate = action.payload
//         },
//         changeCurrentVoter(state, action){
//             state.currentVoter = action.payload;
//         }, 
//         changeSelectedElection(state, action) {
//             state.selectedElection = action.payload;
//         },
//         changeIdOfCandidateElectionId(state, action) {
//             state.addCandidateElectionId = action.payload;
//         },
//         changeAddCandidateElectionId(state, action) {
//             state.addCandidateElectionId = action.payload
//         }
//     }
// })


// export const voteActions = voteSlice.actions

// export default  voteSlice

// // Import createSlice from Redux Toolkit
// import { createSlice } from "@reduxjs/toolkit";

// // Get the current voter from localStorage if available
// const currentVoter = JSON.parse(localStorage.getItem("currentUser"));

// // Initial state of the vote slice
// const initialState = {
//   selectedVoteCandidate: "",
//   currentVoter,
//   selectedElection: "",
//   idOfElectionToUpdate: "",
//   addCandidateElectionId: ""
// };

// // Create the slice
// const voteSlice = createSlice({
//   name: "vote",
//   initialState,
//   reducers: {
//     // Set selected candidate
//     changeSelectedVoteCandidate(state, action){
//       state.selectedVoteCandidate = action.payload;
//     },
//     // Set current voter
//     changeCurrentVoter(state, action){
//       state.currentVoter = action.payload;
//     },
//     // Set selected election
//     changeSelectedElection(state, action){
//       state.selectedElection = action.payload;
//     },
//     // Set ID of election to update
//     changeIdOfCandidateElectionId(state, action){
//       state.idOfElectionToUpdate = action.payload;
//     },
//     // Set election ID for adding candidate
//     changeAddCandidateElectionId(state, action){
//       state.addCandidateElectionId = action.payload;
//     }
//   }
// });

// // Export actions for use in components
// export const voteActions = voteSlice.actions;

// // Export reducer for store configuration
// export default voteSlice.reducer;
