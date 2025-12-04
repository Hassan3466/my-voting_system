import React from 'react'
import {IoMdTrash} from 'react-icons/io'
import axios from 'axios'
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"; 




const ElectionCandidate = ({fullName, image, motto, _id: id}) => {
  const navigate = useNavigate()
  const [error, setError] = useState("");
  

  const token = useSelector((state) => state?.vote?.currentVoter?.token);


   const deleteCandidate =  async () =>{
    try {
      const res = await axios.delete("/candidates/${id}",{withCredentials: true,
        headers: { Authorization: `Bearer ${token}`},
      });
      navigate(0)
    } catch (error) {
      const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
      // Display error message on screen
      setError(message);    
    }

  }


  return (
    <li className="electionCandidate">
        <div className="electionCandidate__image">
            <img src={image} alt={fullName} />
        </div>
        <div>{fullName}</div>
        <small>{motto?.length > 70 ? motto.substring(0, 70) + "..." : motto}</small>
        <button className="electionCandidate__btn" onClick={deleteCandidate}><IoMdTrash /></button>
    </li>
  )
}

export default ElectionCandidate
