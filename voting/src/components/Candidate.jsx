import React from "react";
import { UiActions } from "../store/ui-slice";
import { useDispatch } from "react-redux";
import { voteActions } from "../store/vote-slice";
import { useSelector } from "react-redux";


const Candidate = ({ image, _id: id, fullName, motto }) => {
  const dispatch = useDispatch();
  const currentVoter = useSelector((state) => state.vote.currentVoter);

  // open and confirm vote modal
  const openCandidateModal = () => {
    dispatch(UiActions.openVoteCandidateModal());
    dispatch(voteActions.changeSelectedVoteCandidate(id));
  };
  return (
    <article className="candidate">
      <div className="candidate__image">
        <img src={image} alt="" />
      </div>
      <h5>
        {fullName?.length > 20 ? fullName.substring(0, 20) + "..." : fullName}
      </h5>
      <small>
        {motto?.length > 25 ? motto.substring(0, 25) + "..." : motto}
      </small>

      {/* <button className="btn primary" onClick={openCandidateModal}>
        Vote
      </button> */}
       {/* HIDE BUTTON FOR ADMIN */}
      {!currentVoter?.isAdmin && (
        <button className="btn primary" onClick={openCandidateModal}>
          Vote
        </button>
      )}
    </article>
  );
};

export default Candidate;
