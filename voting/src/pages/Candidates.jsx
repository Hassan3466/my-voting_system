import React, { useEffect, useState } from 'react'
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import Candidate from '../components/Candidate';
import ConfirmVote from '../components/ConfrimVote';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Candidates = () => {
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const navigate = useNavigate()


  // ACCESS CONTROL
  useEffect(()=>{
    if(!token) {
      navigate('/')

    }
  }, [])
  const {id: selectedElection} = useParams()
  const [candidates, setCandidates] = useState([])
  const [canVote, setCanVote] = useState(true)
  


  const voteCandidateModalShowing = useSelector( state => state.ui.voteCandidateModalShowing)

  




  const voterId = useSelector((state) => state?.vote?.currentVoter?.voter?.id);

  // const token = useSelector(state => state?.vote?.currentVoter?.token);
  // const voterId = useSelector(state => state?.vote?.currentVoter?._id)


  //get candidates that belong to this election
  const getCandidates = async () =>{
    try {
      const res = await axios.get("/elections/${selectedElection}/candidates", {withCredentials: true,
          headers: { Authorization: `Bearer ${token}`},
        });
        setCandidates(res.data)
      
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      // Display error message on screen
      setError(message);
      
    }
  }
  // check if user has already voted
  const getVoter = async () => {
  if (!voterId) return; // stop early if no voterId
  try {
    const res = await axios.get(
      "/voters/${voterId}",
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const votedElections = res.data.votedElections || [];
    if (votedElections.includes(selectedElection)) {
      setCanVote(false);
    }
  } catch (error) {
    console.error("Error fetching voter:", error);
  }
};
  // const getVoter =  async () =>{
  //   try {
  //     const res = await axios.get(`${import.meta.env.VITE_API_URL}/voters/${voterId}`,{withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
  //     const votedElections = await res.data.votedElections;
  //     if(votedElections.includes(selectedElection)){
  //       setCanVote(false)
  //     }
  //   } catch (error) {
      
  //   }
  // } 
   useEffect(()=>{
    getCandidates()
    getVoter()


    // if(votedElections.includes(selectedElection)) {
    //   setCanVote(false)
    // }
  }, [])

   

  // const candidates = dummyCandidates.filter(candidate => candidate.election === id);
  return (
    <>
      <section className="candidates">
       {!canVote ?  <header className="candidates__header">
          <h1>Already Voted</h1>
          <p>You can only vote once</p>
        </header>  : <>{candidates.length > 0 ?  <header className="candidates__header">
          <h1> Vote Your Candidiates</h1>
          <p>
            These are the candidates for the selected election. Please vote
            once and wisely, because you wont be allowed to vote in this
            election again
          </p>
        </header>:  <header className="candidates__header">
          <h1>Inactive Election</h1>
          <p>There are no candidates found for this election. Please check back later!!!</p>
        </header>}
        <div className="container candidates__container">
          {candidates.map((candidate) => (
            <Candidate key={candidate._id} {...candidate} />
          ))}
        </div>
        </>}
      </section>
      {voteCandidateModalShowing && <ConfirmVote selectedElection={selectedElection} />}
    </>
  );
}

export default Candidates
