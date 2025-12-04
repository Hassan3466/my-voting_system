import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    password2: "",
  });

  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerVoter = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting:", userData);

      const res = await axios.post("/voters/register", userData);

      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(message);
    }
  };

  return (
    <section className="register">
      <div className="container register__container">
        <h2>Sign Up</h2>
        <form onSubmit={registerVoter}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={changeInputHandler}
            autoComplete="true"
            autoFocus
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={changeInputHandler}
            autoComplete="true"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={changeInputHandler}
            autoComplete="true"
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            onChange={changeInputHandler}
            autoComplete="true"
          />

          <p>
            Already have an account? <Link to="/">Sign in</Link>
          </p>

          <button type="submit" className="btn primary">
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Register = () => {
//   const [userData, setUserData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     password2: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const changeInputHandler = (e) => {
//     setUserData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const registerVoter = async (e) => {
//     e.preventDefault();
//     try {
//       console.log("Submitting:", userData);
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/voters/register`,
//         userData
//       );
//       toast.success("Registration successful!");
//       navigate("/");
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         "Something went wrong";
//       toast.error(message)
//     }
//   };

//   return (
//     <section className="register">
//       <div className="container register__container">
//         <h2>Sign Up</h2>
//         <form onSubmit={registerVoter}>
//           {error && <p className="form__error-message">{error}</p>}

//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             onChange={changeInputHandler}
//             autoComplete="true"
//             autoFocus
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={changeInputHandler}
//             autoComplete="true"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={changeInputHandler}
//             autoComplete="true"
//           />
//           <input
//             type="password"
//             name="password2"
//             placeholder="Confirm Password"
//             onChange={changeInputHandler}
//             autoComplete="true"
//           />

//           <p>
//             Already have an account? <Link to="/">Sign in</Link>
//           </p>

//           <button type="submit" className="btn primary">
//             Register
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Register;

//  import React, { useState } from 'react'
//  import {Link, useNavigate} from 'react-router-dom'
//  import axios from 'axios'

 
//  const Register = () => {
//   const[userData, setUserData] = useState({fullName:"", email: "", password:"", password2: ""})
//   const [error, setError] = useState("")
//   const navigate = useNavigate();




//   //function to change controlled inputs
//   const changeInputHandler = (e) => {
//     setUserData(prevState => {
//       return {...prevState, [e.target.name]: e.target.value}
//     })
//   }


//   // const registerVoter = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     await axios.post(`${process.env.REACT_APP_API_URL}/voters/register`, {userData})
//   //     navigate("/")
      
//   //   } catch (error) {
//   //     setError(error.response.data.message)
//   //   }
//   // }
//   const registerVoter = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await axios.post(
//       `${import.meta.env.VITE_API_URL}/voters/register`,
//       userData
//     );
//     navigate("/");
//   } catch (error) {
//     const message =
//       error.response?.data?.message ||
//       error.message ||
//       "Something went wrong";
//     setError(message);
//   }
// };

//    return (
//     <section className='register'>
//       <div className="container register__container">
//         <h2>Sign Up</h2>
//         <form onSubmit={registerVoter}>
//           {error && <p className="form__error-message">{error}</p>}
//           <input type="text" name='fullname' placeholder='Full Name' onChange={changeInputHandler}     autoComplete='true' autoFocus/>
//           <input type="email" name='email' placeholder='Email' onChange={changeInputHandler} autoComplete='true'/>
//           <input type="password" name='password' placeholder='Password' onChange={changeInputHandler} autoComplete='true'/>
//           <input type="password" name='password2' placeholder='Confirm Password' onChange={changeInputHandler} autoComplete='true'/>
//           <p>Already have and account? <Link to ='/'>Sign in</Link></p>
//           <button type='submit'className="btn primary">Register</button> 
//         </form>

//       </div>

//     </section>
//    )
//  }
 
//  export default Register











