import React, {useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Navigate, useParams} from 'react-router-dom';
import { useSelector } from "react-redux";






const Congrats = () => {

  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const navigate = useNavigate()


  // ACCESS CONTROL
  useEffect(()=>{
    if(!token) {
      navigate('/')

    }
  }, [])
  return (
    <section className="congrats">
      <div className="container congrats__container">
        <h2>Thanks for your Vote!</h2>
        <p>Your vote is now added to your candidate's vote count. You will be redirected shortly to see the new results.</p>
        <Link to='/results' className='btn sm primary'>See Results</Link>
      </div>
    </section>
  )
}

export default Congrats
