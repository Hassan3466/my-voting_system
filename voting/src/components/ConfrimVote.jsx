import React, { useState, useEffect } from "react";
import { UiActions } from "../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { voteActions } from "../store/vote-slice";
import { useNavigate } from "react-router-dom";

const ConfrimVote = ({ selectedElection }) => {
  const [modalCandidate, setModalCandidate] = useState({});
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // close and confirm vote modal
  const closeCandidateModal = () => {
    dispatch(UiActions.closeVoteCandidateModal());
  };

  // get selected candidate id from redux store

  const selectedVoteCandidate = useSelector(
    (state) => state.vote.selectedVoteCandidate
  );
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const currentVoter = useSelector((state) => state?.vote?.currentVoter);

  // Admin cannot reach this modal
  useEffect(() => {
    if (currentVoter?.isAdmin) {
      navigate("/");
    }
  }, []);

  //get the candidate selected to be voted for
  const fetchCandidate = async () => {
    try {
      const res = await axios.get("/candidates/${selectedVoteCandidate}",
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setModalCandidate(await res.data);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      // Display error message on screen
      setError(message);
    }

    // candidates.find(candidate => {
    //     if(candidate.id === selectedVoteCandidate ){
    //         setModalCandidate(candidate)
    //     }
    // })
  };

  // confirm vote for selected candidate
  const confirmVote = async () => {
    try {
      const res = await axios.patch("/candidates/${selectedVoteCandidate}",
        { selectedElection },
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const voteResult = await res.data;
      dispatch(
        voteActions.changeCurrentVoter({
          ...currentVoter,
          votedElection: voteResult,
        })
      );
      navigate("/congrats");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      // Display error message on screen
      setError(message);
    }
    closeCandidateModal();
  };
  useEffect(() => {
    fetchCandidate();
  }, []);
  return (
    <section className="modal">
      <div className="modal__content confirm__vote-content">
        <h5>Please confirm your vote</h5>
        <div className="confirm__vote-image">
          <img src={modalCandidate.image} alt={modalCandidate.fullName} />
        </div>
        <h2>
          {modalCandidate?.fullName?.length > 17
            ? modalCandidate.fullName?.substring(0, 17) + "..."
            : modalCandidate?.fullName}
        </h2>
        <p>
          {modalCandidate?.motto?.length > 45
            ? modalCandidate.motto?.substring(0, 45) + "..."
            : modalCandidate?.motto}
        </p>
        <div className="confirm__vote-cta">
          <button className="btn" onClick={closeCandidateModal}>
            {" "}
            Cancel{" "}
          </button>
          <button className="btn primary" onClick={confirmVote}>
            {" "}
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfrimVote;
