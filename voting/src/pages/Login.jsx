// Import required libraries
import axios from "axios"; // for HTTP requests
import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; // for navigation after login
import { useDispatch } from "react-redux";      // for Redux state updates
import { voteActions } from "../store/vote-slice"; // Redux actions for vote slice
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";


const Login = () => {
  // State to store user input
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State to store error messages

  const navigate = useNavigate(); // Hook for redirecting user
  const dispatch = useDispatch(); // Hook to dispatch Redux actions

  //*********** LOGIN HANDLER **********
  const loginVoter = async (e) => {
    e.preventDefault(); // prevent page reload on form submit

    try {
      // Send login request to backend
      const res = await axios.post("/voters/login", 
        userData,
        { headers: { "Content-Type": "application/json" } } // JSON headers
      );

      const newVoter = res.data; // Get returned voter info

      // Extract only what you need and flatten structure
      const flattenedUser = {
        token: newVoter.token,
        id: newVoter.voter.id,
        fullName: newVoter.voter.fullName,
        email: newVoter.voter.email,
        isAdmin: newVoter.voter.isAdmin,
      };
      // Save to localStorage
      localStorage.setItem("currentUser", JSON.stringify(flattenedUser));
      // Update Redux store
      dispatch(voteActions.changeCurrentVoter(flattenedUser));






      // // Save voter info in localStorage
      // localStorage.setItem("currentUser", JSON.stringify(newVoter));

      // // Update Redux state with the logged-in voter
      // dispatch(voteActions.changeCurrentVoter(newVoter));

      toast.success("Login successful!");
      // Redirect user to results page
      navigate("/results");
    } catch (err) {
      // Handle error: either backend message or generic
      const message = err.response?.data?.message || err.message || "Login failed.";
      toast.error(message)
    }
  };

  return (
  <section className="login">
    <div className="login__container">
      <h2>Login</h2>
      <form onSubmit={loginVoter}>
        {error && <p className="form__error-message">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
        <p>
          Don’t have an account? <Link to="/register">Sign up</Link> </p>

         
        <button className="btn primary full" type="submit">
          Login
        </button>
      </form>
    </div>
  </section>
);


  // return (
  //   <form onSubmit={loginVoter}>
  //     {/* Email input */}
  //     <input
  //       type="email"
  //       placeholder="Email"
  //       value={userData.email}
  //       onChange={(e) => setUserData({ ...userData, email: e.target.value })}
  //       autoComplete="username"
  //     />
  //     {/* Password input */}
  //     <input
  //       type="password"
  //       placeholder="Password"
  //       value={userData.password}
  //       onChange={(e) => setUserData({ ...userData, password: e.target.value })}
  //       autoComplete="current-password" // recommended by browser
  //     />
  //     {/* Submit button */}
  //     <button type="submit">Login</button>
  //     {/* Display error message if login fails */}
  //     {error && <p style={{ color: "red" }}>{error}</p>}
  //   </form>
  // );
};

export default Login;




//  import React, { useState } from 'react'
//  import {Link, useNavigate} from 'react-router-dom'
//  import axios from "axios";
//  import{useDispatch} from "react-redux";
// import { voteActions } from '../store/vote-slice';
  


 
//  const Login = () => {
//   const[userData, setUserData] = useState({email: "", password:""})
//   const [error, setError] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();




//   //function to change controlled inputs
//   const changeInputHandler = (e) => {
//     setUserData(prevState => {
//       return {...prevState, [e.target.name]: e.target.value}
//     })
//   }

//   const loginVoter =  async (e) => {
//     e.preventDefault()
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/voters/login`,
//           userData
//           );
//           // Extract voter data from the backend response
//           const newVoter = res.data;          
//           //save new voter in local storage and update in redux store
//           localStorage.setItem("currentUser", JSON.stringify(newVoter))
//           dispatch(voteActions.changeCurrentVoter(newVoter))
//           navigate("/results");
      
//     } catch (error) {
//       // Handle errors (wrong credentials, network issues, etc.)
//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         "Something went wrong";

//       // Display error message on screen
//       setError(message);
      
//     }
//   }
    
//    return (
//     <section className='register'>
//       <div className="container register__container">
//         <h2>Sign in</h2>
//         <form onSubmit={loginVoter}>
//           {error && <p className="form__error-message">{error}</p>}
//           <input type="email" name='email' placeholder='Email' onChange={changeInputHandler} autoComplete='true' autoFocus/>
//           <input type="password" name='password' placeholder='Password' onChange={changeInputHandler} autoComplete='true'/>
//           <p>Don't have an account? <Link to ='/register'>Sign up</Link></p>
//           <button type='submit'className="btn primary">Login</button> 
//         </form>

//       </div>  

//     </section>
//    )
//  }
 
//  export default Login
// import axios from "axios"; // for HTTP requests
// import { useState } from "react"; 
// import { useNavigate } from "react-router-dom"; // for navigation
// import { useDispatch } from "react-redux"; // for Redux
// import { voteActions } from "../store/vote-slice";

// const Login = () => {
//   // State for email/password input
//   const [userData, setUserData] = useState({ email: "", password: "" });
//   const [error, setError] = useState(""); // state for error messages
//   const navigate = useNavigate(); 
//   const dispatch = useDispatch();

//   //*********** Login Handler **********
//   const loginVoter = async (e) => {
//     e.preventDefault(); // prevent default form submit

//     try {
//       // POST request to backend login endpoint
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/voters/login`, // backend URL from env
//         userData, // payload
//         { headers: { "Content-Type": "application/json" } }
//       );

//       const newVoter = res.data;

//       // Save voter info in localStorage
//       localStorage.setItem("currentUser", JSON.stringify(newVoter));

//       // Update Redux state
//       dispatch(voteActions.changeCurrentVoter(newVoter));

//       // Navigate to results page
//       navigate("/results");
//     } catch (err) {
//       // Set error message
//       const message =
//         err.response?.data?.message || err.message || "Login failed.";
//       setError(message);
//     }
//   };

//   return (
//     <form onSubmit={loginVoter}>
//       {/* Email input */}
//       <input
//         type="email"
//         placeholder="Email"
//         value={userData.email}
//         onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//       />
//       {/* Password input */}
//       <input
//         type="password"
//         placeholder="Password"
//         value={userData.password}
//         onChange={(e) =>
//           setUserData({ ...userData, password: e.target.value })
//         }
//       />
//       <button type="submit">Login</button>
//       {/* Display error message */}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </form>
//   );
// };

// export default Login;

 