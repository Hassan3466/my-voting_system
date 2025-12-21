import React, { useEffect, useState } from 'react'
import CandidateRating from './CandidateRating'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from "axios";
import Loader from './Loader';



const ResultElection = ({ _id, thumbnail, title}) => {
    const [totalVotes, setTotalVotes] = useState(521)

    const token = useSelector((state) => state?.vote?.currentVoter?.token);
    const [electionCandidates, setElectionCandidates] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()


    //get candidate that belong to this election iteration
    // const electionCandidates = candidates.filter(candidate => {
    //     return candidate.election === id
    // })
    

    // to get candidate for election  
    const getCandidate = async () =>{

      setIsLoading(true)
      try {
        const res = await axios.get("/elections/${_id}/candidates",
        {
          withCredentials: true, // include cookies if needed
          headers: {
            Authorization: `Bearer ${token}`, // attach JWT token
          },
        }
      );
      const candidates =  await res.data;
      setElectionCandidates(candidates)
      //calculate the total vote
      let total = 0;
      for (let i = 0; i < candidates.length; i++) {
      total += candidates[i].voteCount || 0; // add safely even if undefined
      }
      setTotalVotes(total);

      } catch (error) {
        const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load candidates.";
      setError(message);
      }
      setIsLoading(false)
    }

    useEffect(()=>{
      getCandidate();
    }, [])
  return (
    <>
      {isLoading && <Loader /> }
      <article className="result">
        <header className="result__header">
          <h4>{title}</h4>
          <div className="result__header-image">
            <img src={thumbnail} alt={title} />
          </div>
        </header>
        <ul className="result__list">
          {electionCandidates.map((candidate) => (
            <CandidateRating
              key={candidate._id}
              {...candidate}
              totalVotes={totalVotes}
            />
          ))}
        </ul>
        <Link to={`/elections/${_id}/candidates`} className='btn primary full'>Enter Election</Link>
      </article>
    </>
  );
}

export default ResultElection
