import React, { useEffect, useState } from "react";
import ResultElection from "../components/ResultElection";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const [elections, setElections] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = useSelector((state) => state?.vote?.currentVoter?.token);

  // ✅ Access control using useEffect at the top level
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // ✅ Normal async function — no hooks inside
  const getElections = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/elections`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      setElections(res.data);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      setError(message);
    }
  };

  // ✅ Call it when component mounts
  useEffect(() => {
    getElections();
  }, []); // runs once when page loads

  return (
    <section className="results">
      <div className="container results__container">
        {error && <p className="form__error-message">{error}</p>}
        {elections.length > 0 ? (
          elections.map((election) => (
            <ResultElection key={election._id} {...election} />
          ))
        ) : (
          <p>No elections found.</p>
        )}
      </div>
    </section>
  );
};

export default Results;



// import React, { useEffect, useState } from 'react';
// // import {elections as dummyElections} from '../data'
// import ResultElection from '../components/ResultElection';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';


// const Results = () => {
//   const [elections, setElections] = useState([]);
//   const [error, setError] = useState("");



//   const token = useSelector(state => state?.vote?.currentVoter?.token);

//   const getElections = async (e) => {
//     const navigate = useNavigate()
//     const token = useSelector((state) => state?.vote?.currentVoter?.token);

//    // ACCESS CONTROL
//     useEffect(()=>{
//       if(!token) {
//         navigate('/')
  
//       }
//     }, [])
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/elections`, 
//         {withCredentials: true,
//           headers: { Authorization: `Bearer ${token}` },
//         });

//       const elections = await res.data;
//       setElections(elections)
      
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         "Something went wrong";

//       // Display error message on screen
//       setError(message);
      
//     }
//   }
//   useEffect(()=>{
//     getElections()

//   }, []);
//   return (
//     <section className="results">
//       <div className="container results__container">
//         {
//           elections.map(election => <ResultElection key={election._id} {...election} />)
//         }

//       </div> 
//     </section>
//   )
// }

// export default Results

// import React, { useEffect, useState } from "react";
// import ResultElection from "../components/ResultElection";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const Results = () => {
//   const [elections, setElections] = useState([]);
//   const [error, setError] = useState("");

//   const token = useSelector((state) => state?.vote?.currentVoter?.token);

//   const getElections = async (e) => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/elections`, {
//         withCredentials: true,
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setElections(res.data);
//     } catch (error) {
//       const message =
//         error.response?.data?.message || error.message || "Something went wrong";
//       setError(message);
//     }
//   };

//   useEffect(() => {
//     getElections();
//   }, []);

//   return (
//     <section className="results">
//       <div className="container results__container">
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         {elections.length > 0 ? (
//           elections.map((election) => (
//             <ResultElection key={election._id} {...election} />
//           ))
//         ) : (
//           <p>No elections found.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Results;




















// import React, { useEffect, useState } from "react";
// import ResultElection from "../components/ResultElection";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const Results = () => {
//   // State to store all elections fetched from backend
//   const [elections, setElections] = useState([]);
//   // State to display any error message
//   const [error, setError] = useState("");

//   // Get token from Redux (already set in vote-slice from localStorage)
//   const token = useSelector((state) => state?.vote?.currentVoter?.token);

//   // Function to fetch all elections from backend
//   const getElections = async () => {
//     try {
//       // Make a GET request instead of POST (unless your backend requires POST)
//       const res = await axios.get(
//         `${import.meta.env.VITE_API_URL}/elections`,
//         {
//           withCredentials: true, // include cookies if needed
//           headers: {
//             Authorization: `Bearer ${token}`, // attach JWT token
//           },
//         }
//       );

//       // Save the fetched elections in state
//       setElections(res.data);
//     } catch (error) {
//       // Handle possible errors
//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         "Something went wrong";
//       setError(message);
//       console.error("Error fetching elections:", message);
//     }
//   };

//   // Run getElections once when the component loads
//   useEffect(() => {
//     getElections();
//   }, []);

//   return (
//     <section className="results">
//       <div className="container results__container">
//         <h2>Election Results</h2>

//         {/* Show error message if any */}
//         {error && <p className="form__error-message">{error}</p>}

//         {/* Show all elections */}
//         {elections.map((election) => (
//           <ResultElection key={election._id} {...election} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Results;

