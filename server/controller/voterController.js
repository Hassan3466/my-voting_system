// const bcrypt = require('bcryptjs') 
// const jwt = require('jsonwebtoken')

// const VoterModel = require('../models/voterModel')
// const HttpError = require('../models/ErrorModel');
// const voterModel = require('../models/voterModel');



// //***********Register NEW VOTER */
// //POST : api/voters/register
// //UNPROTECTED
// const registerVoter = async (req, res, next) => {
//     try {
//         const {fullName, email, password, password2} = req.body;
//         if(!fullName || !email || !password || !password2) {
//             return next(new HttpError("Fill in all fields.", 422))
//         }
//         //make all emails lowercased
//         const newEmail = email.toLowerCase()
//         // check if the email already exist in db
//         const emailExists = await VoterModel.findOne({email: newEmail})
//         if(emailExists) {
//             return next(new HttpError("Email already exist", 422))
//         }
//         //make sure password 6+ character
//         if((password.trim().length) < 6) {
//             return next (new HttpError("Password should be at least 6 characters", 422))
//         }
//         //make sure password match
//         if(password != password2) {
//             return next(new HttpError("passwords do not match", 422))
//         }
//         // hash a password
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword =  await bcrypt.hash(password, salt);

//         //no user/ voter should be admin except for one with email "olaniyihassan94@gmail.com"

//         let isAdmin =  false;
//         if(newEmail == "olaniyihassan94@gmail.com") {
//             isAdmin = true
//         }
//         // save new voter to db
//         const newVoter = await VoterModel.create({fullName, email: newEmail, password: hashPassword, isAdmin})
//         res.status(201).json(`new voter ${fullName} created.`)

//     } catch (error) {
//         return next(new HttpError("Voter registration failed.", 422))
//     }
//     // res.json("Register Voter")
// }

// // function generate token 

// const generateToken = (payload) =>{
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"})
//     return token;
// }

// //***********LoginVOTER */
// //POST : api/voters/login
// //UNPROTECTED
// const loginVoter = async (req, res, next) => {
//     res.json("Voter Successfully Login")
// }

// //***********GET VOTER */
// //GET : api/voters/:id
// //PROTECTED
// const getVoter = async (req, res, next) => {
//     try {
//         const {email, password} = req.body;
//         if(!email || !password) {
//             return next(new HttpError("Fill in all Fields.", 422))
//         }
//         const newEmail =  email.toLowerCase()
//         const voter =  await VoterModel.findOne({email: newEmail})
//         if(!voter){
//             return next(new HttpError("Invalid credentails.", 422))
//         }
//         // compare passwords
//         const comparePass = await bcrypt.compare(password, voter.password)
//         if(!comparePass){
//             return next(new HttpError("invalid credentials.", 422))
//         }
//         const {_id: id, isAdmin, votedElection} = voter;
//         const token = generateToken({id, isAdmin})


//         res.json({token, id, votedElection, isAdmin})


//     } catch (error) {
//         return next(new HttpError("Login failed. Please check your credentials or try again later.", 422))

//     }
// }


// module.exports = {registerVoter, loginVoter, getVoter}


// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const VoterModel = require('../models/voterModel.js');
// const HttpError = require('../models/ErrorModel.js');

// //***********Register NEW VOTER */
// //POST : api/voters/register
// //UNPROTECTED
// const registerVoter = async (req, res, next) => {
//   try {
//     const { fullName, email, password, password2 } = req.body;

//     if (!fullName || !email || !password || !password2) {
//       return next(new HttpError("Fill in all fields.", 422));
//     }

//     const newEmail = email.toLowerCase();

//     // check if the email already exists
//     const emailExists = await VoterModel.findOne({ email: newEmail });
//     if (emailExists) {
//       return next(new HttpError("Email already exists.", 422));
//     }

//     // ensure password length
//     if (password.trim().length < 6) {
//       return next(new HttpError("Password should be at least 6 characters.", 422));
//     }

//     // ensure passwords match
//     if (password !== password2) {
//       return next(new HttpError("Passwords do not match.", 422));
//     }

//     // hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     // assign admin role
//     let isAdmin = false;
//     if (newEmail === "olaniyihassan94@gmail.com") {
//       isAdmin = true;
//     }

//     // save new voter
//     const newVoter = await VoterModel.create({
//       fullName,
//       email: newEmail,
//       password: hashPassword,
//       isAdmin,
//       votedElections: []
//     });

//     await newVoter.save();

//     res.status(201).json(`New voter ${fullName} created.`);
//   } catch (error) {
//     console.error(error);
//     return next(new HttpError("Voter registration failed.", 422));
//   }
// };

// //*********** Helper: Generate JWT ***********
// const generateToken = (payload) => {
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
// };

// //***********Login VOTER***********
// //POST : api/voters/login
// //UNPROTECTED
// // const loginVoter = async (req, res, next) => {
// //   try {
// //     const { email, password } = req.body;

// //     if (!email || !password) {
// //       return next(new HttpError("Fill in all fields.", 422));
// //     }

// //     const newEmail = email.toLowerCase();
// //     const voter = await VoterModel.findOne({ email: newEmail });
// //     if (!voter) {
// //       return next(new HttpError("Invalid credentials (email).", 422));
// //     }

// //     // compare passwords
// //     const isMatch = await bcrypt.compare(password, voter.password);
// //     if (!isMatch) {
// //       return next(new HttpError("Invalid credentials (password).", 422));
// //     }

// //     const { _id: id, isAdmin, votedElections } = voter;
// //     const token = generateToken({ id, isAdmin });

// //     res.json({
// //       message: "Login successful!",
// //       token,
// //       votedElections,
// //       voter: {
// //         id,
// //         fullName: voter.fullName,
// //         email: voter.email,
// //         isAdmin,
// //       },
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     return next(new HttpError("Login failed. Please try again later.", 500));
// //   }
// // };
// // const loginVoter = async (req, res, next) => {
// //   try {
// //     const { email, password } = req.body;

// //     if (!email || !password) {
// //       return next(new HttpError("Fill in all fields.", 422));
// //     }

// //     const newEmail = email.toLowerCase();
// //     const voter = await VoterModel.findOne({ email: newEmail });

// //     if (!voter) {
// //       return next(new HttpError("Invalid credentials (email).", 422));
// //     }

// //     // compare passwords
// //     const isMatch = await bcrypt.compare(password, voter.password);
// //     if (!isMatch) {
// //       return next(new HttpError("Invalid credentials (password).", 422));
// //     }

// //     const { _id: id, isAdmin, votedElections } = voter;
// //     const token = generateToken({id, isAdmin });

// //     res.status(200).json({
// //       message: "Login successful!",
// //       token,
// //       voter: {
// //         id,
// //         fullName: voter.fullName,
// //         email: voter.email,
// //         isAdmin,
// //         votedElections,
// //       },
// //     });
// //   } catch (error) {
// //     console.error("❌ Login Error:", error);
// //     return next(new HttpError(error.message, 500));
// //   }
// // };
// const loginVoter = async (e) => {
//   e.preventDefault();
//   console.log("Login payload:", userData); // check payload
//   try {
//     const res = await axios.post(
//       `${import.meta.env.VITE_API_URL}/voters/login`,
//       userData,
//       { headers: { "Content-Type": "application/json" } }
//     );
//     const newVoter = res.data;
//     localStorage.setItem("currentUser", JSON.stringify(newVoter));
//     dispatch(voteActions.changeCurrentVoter(newVoter));
//     navigate("/results");
//   } catch (error) {
//     const message =
//       error.response?.data?.message || error.message || "Login failed.";
//     setError(message);
//   }
// };



// //***********GET VOTER***********
// //GET : api/voters/:id
// //PROTECTED
// const getVoter = async (req, res, next) => {
//   try {
//     const voterId = req.params.id;
//     const voter = await VoterModel.findById(voterId).select("-password");

//     if (!voter) {
//       return next(new HttpError("Voter not found.", 404));
//     }

//     res.status(200).json(voter);
//   } catch (error) {
//     console.error(error);
//     return next(new HttpError("Could not fetch voter details.", 500));
//   }
// };

// export { registerVoter, loginVoter, getVoter };



// Import necessary modules using ESM syntax
// import bcrypt from "bcryptjs"; // for hashing passwords
// import jwt from "jsonwebtoken"; // for generating JWT tokens
// import VoterModel from "../models/voterModel.js"; // Mongoose Voter model
// import HttpError from "../models/ErrorModel.js"; // Custom error class

// //*********** Register NEW VOTER **********
// // POST : /api/voters/register
// // PUBLIC route (no auth required)
// const registerVoter = async (req, res, next) => {
//   try {
//     // Destructure request body
//     const { fullName, email, password, password2 } = req.body;

//     // Validate required fields
//     if (!fullName || !email || !password || !password2) {
//       return next(new HttpError("Fill in all fields.", 422));
//     }

//     const newEmail = email.toLowerCase(); // normalize email

//     // Check if email already exists in DB
//     const emailExists = await VoterModel.findOne({ email: newEmail });
//     if (emailExists) return next(new HttpError("Email already exists.", 422));

//     // Ensure password length >= 6
//     if (password.trim().length < 6)
//       return next(new HttpError("Password should be at least 6 characters.", 422));

//     // Check if passwords match
//     if (password !== password2)
//       return next(new HttpError("Passwords do not match.", 422));

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(password, salt);

//     // Assign admin role if email matches
//     const isAdmin = newEmail === "olaniyihassan94@gmail.com";

//     // Create new voter in DB
//     const newVoter = await VoterModel.create({
//       fullName,
//       email: newEmail,
//       password: hashPassword,
//       isAdmin,
//       votedElections: [],
//     });

//     await newVoter.save();

//     // Respond with success
//     res.status(201).json({ message: `New voter ${fullName} created.` });
//   } catch (error) {
//     console.error(error);
//     return next(new HttpError("Voter registration failed.", 500));
//   }
// };

// //*********** Helper: Generate JWT Token **********
// const generateToken = (payload) =>
//   jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

// //*********** Login VOTER **********
// // POST : /api/voters/login
// // PUBLIC route
// const loginVoter = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // Validate required fields
//     if (!email || !password)
//       return next(new HttpError("Fill in all fields.", 422));

//     const newEmail = email.toLowerCase();

//     // Check if voter exists
//     const voter = await VoterModel.findOne({ email: newEmail });
//     if (!voter) return next(new HttpError("Invalid credentials.", 422));

//     // Compare hashed password
//     const isMatch = await bcrypt.compare(password, voter.password);
//     if (!isMatch) return next(new HttpError("Invalid credentials.", 422));

//     // Destructure needed voter info
//     const { _id: id, isAdmin, votedElections } = voter;

//     // Generate JWT token
//     const token = generateToken({ id, isAdmin });

//     // Respond with voter info and token
//     res.status(200).json({
//       message: "Login successful!",
//       token,
//       voter: {
//         id,
//         fullName: voter.fullName,
//         email: voter.email,
//         isAdmin,
//         votedElections,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return next(new HttpError("Login failed. Please try again later.", 500));
//   }
// };

// //*********** Get Voter by ID **********
// // GET : /api/voters/:id
// // PROTECTED route
// const getVoter = async (req, res, next) => {
//   try {
//     const voterId = req.params.id;

//     // Fetch voter without password
//     const voter = await VoterModel.findById(voterId).select("-password");

//     if (!voter) return next(new HttpError("Voter not found.", 404));

//     res.status(200).json(voter);
//   } catch (error) {
//     console.error(error);
//     return next(new HttpError("Could not fetch voter details.", 500));
//   }
// };

// // Export all functions for route use
// export { registerVoter, loginVoter, getVoter };




import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import VoterModel from "../models/voterModel.js";
import HttpError from "../models/ErrorModel.js";

//*********** Register NEW VOTER **********
export const registerVoter = async (req, res, next) => {
  try {
    const { fullName, email, password, password2 } = req.body;

    if (!fullName || !email || !password || !password2) {
      return next(new HttpError("Fill in all fields.", 422));
    }

    const newEmail = email.toLowerCase();
    const emailExists = await VoterModel.findOne({ email: newEmail });
    if (emailExists) return next(new HttpError("Email already exists.", 422));

    if (password.trim().length < 6)
      return next(new HttpError("Password must be at least 6 characters.", 422));

    if (password !== password2)
      return next(new HttpError("Passwords do not match.", 422));

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const isAdmin = newEmail === "olaniyihassan94@gmail.com";

    const newVoter = await VoterModel.create({
      fullName,
      email: newEmail,
      password: hashPassword,
      isAdmin,
      votedElections: []
    });

    res.status(201).json({ message: `New voter ${fullName} created.` });
  } catch (error) {
    return next(new HttpError("Voter registration failed.", 500));
  }
};

//*********** Helper: Generate JWT ***********
const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

//*********** Login VOTER **********
export const loginVoter = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new HttpError("Fill in all fields.", 422));

    const newEmail = email.toLowerCase();
    const voter = await VoterModel.findOne({ email: newEmail });
    if (!voter) return next(new HttpError("Invalid credentials.", 422));

    const isMatch = await bcrypt.compare(password, voter.password);
    if (!isMatch) return next(new HttpError("Invalid credentials.", 422));

    const { _id: id, isAdmin, votedElections } = voter;

    const token = generateToken({ id, isAdmin });

    res.status(200).json({
      message: "Login successful!",
      token,
      voter: {
        id,
        fullName: voter.fullName,
        email: voter.email,
        isAdmin,
        votedElections,
      },
    });
  } catch (error) {
    return next(new HttpError("Login failed. Try again later.", 500));
  }
};

//*********** Get Voter **********
export const getVoter = async (req, res, next) => {
  try {
    const voter = await VoterModel.findById(req.params.id).select("-password");
    if (!voter) return next(new HttpError("Voter not found.", 404));
    res.json(voter);
  } catch (error) {
    return next(new HttpError("Could not fetch voter details.", 500));
  }
};

