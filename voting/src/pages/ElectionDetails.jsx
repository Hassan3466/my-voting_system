import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ElectionCandidate from "../components/ElectionCandidate";
import { IoIosAddCircle } from "react-icons/io";
import AddCandidateModal from "../components/AddCandidateModal";
import { UiActions } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { voteActions } from "../store/vote-slice";




const ElectionDetails = () => {
  //  useEffect(()=>{
  //     dispatch(voteActions.changeCurrentVoter(null))
  //     localStorage.removeItem("currentUser")
  //     navigate('/')
  
  //   }, [])
  const [isLoading, setIsLoading] =  useState(false)
  const [election, setElections] =  useState({})
  const [candidates, setCandidates] =  useState([])
  const [voters, setVoters] =  useState([])
  const [error, setError] = useState("");


  const navigate = useNavigate()




 
 
 
  const { id } = useParams();
  const dispatch = useDispatch();
  const addCandidateModalShowing = useSelector(state => state.ui.addCandidateModalShowing)
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

  


  const getElection =  async () =>{
    setIsLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/elections/${id}`,{withCredentials: true,
        headers: { Authorization: `Bearer ${token}`},
      });
      setElections(res.data);
    } catch (error) {
      const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
      // Display error message on screen
      setError(message);    
      
    }

  }

  const getCandidates = async ()=>{
    try {
       const res = await axios.get(`${import.meta.env.VITE_API_URL}/elections/${id}/candidates`,{withCredentials: true,
        headers: { Authorization: `Bearer ${token}`},
      });
      setCandidates(res.data);
      
    } catch (error) {
      const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
      // Display error message on screen
      setError(message); 
      
    }
  }

  const getVoter =  async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/elections/${id}/voters`,{withCredentials: true,
        headers: { Authorization: `Bearer ${token}`},
      });
      setVoters(res.data)
      
    } catch (error) {
      const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
      // Display error message on screen
      setError(message);
      
    }
  }
  const deleElection = async ()=>{
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/elections/${id}`,{withCredentials: true,
        headers: { Authorization: `Bearer ${token}`},
      });
      navigate('/elections')
    } catch (error) {
       const message =
       error.response?.data?.message ||
       error.message ||
       "Something went wrong";
       // Display error message on screen
       setError(message); 
      
    }
  }

 useEffect(() => {
  if (token && id) {
    getElection();
    getCandidates();
    getVoter();
  }
}, [token, id]);



  // const currentElection = elections.find((election) => election.id == id);

  // const electionCandidates = candidates.filter(
  //   (candidate) => candidate.election === id
  // );


  // Open add Candidate modal
  const openModal = () => {
    dispatch(UiActions.openAddCandidateModal());
    dispatch(voteActions.changeAddCandidateElectionId(id))
  };
  return (
    <>
      <section className="electionDetails">
        <div className="container electionDetails__container">
          <h2>{election.title}</h2>
          <p>{election.description}</p>
          <div className="electionDetails__image">
            <img src={election.thumbnail} alt={election.title} />
          </div>

          <menu className="electionDetails__candidates">
            {candidates.map((candidate) => (
              <ElectionCandidate key={candidate._id} {...candidate} />
            ))}
            {isAdmin && <button className="add__candidate-btn" onClick={openModal}>
              <IoIosAddCircle />
            </button>}
          </menu>

          <menu className="voters">
            <h2>Voters</h2>
            <table className="voters__table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {voters.map((voter) => (
                  <tr key={voter._id}>
                    <td>
                      <h5>{voter.fullName}</h5>
                    </td>
                    <td>{voter.email}</td> 
                    <td>{voter.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </menu>
          {isAdmin && <button className="btn danger full" onClick={deleElection}> Delete Election </button>}
        </div>
      </section>

      {addCandidateModalShowing && <AddCandidateModal />}
    </>
  );
};

export default ElectionDetails;
