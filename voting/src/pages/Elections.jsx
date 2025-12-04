import React, { useEffect, useState } from 'react'
import Election from '../components/Election'
import AddElectionModal from '../components/AddElectionModal'
import { useDispatch, useSelector } from 'react-redux';
import { UiActions } from '../store/ui-slice';
import UpdateElectionModal from '../components/UpdateElectionModal'
import axios from 'axios';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
  
 
 const Elections = () => {
  const navigate = useNavigate()
  const token = useSelector((state) => state?.vote?.currentVoter?.token);

   // ACCESS CONTROL
    useEffect(()=>{
      if(!token) {
        navigate('/')
  
      }
    }, [])
 const [elections, setElections] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState("");



  const dispatch = useDispatch()

  // open add election modal
  const openModal = () => {
    dispatch(UiActions.openElectionModal())
  }
  
  const electionModalShowing = useSelector(state => state.ui.electionModalShowing )
  const updateElectionModalShowing = useSelector(state => state.ui.updateElectionModalShowing)
  // const isAdmin= useSelector((state) => state?.vote?.currentVoter?.voter?.isAdmin);
  const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);


  
  
  const getElections =  async()=>{
    setIsLoading(true)
    try {
      const res = await axios.get("/elections",{withCredentials: true,
        headers: { Authorization: `Bearer ${token}`},
      });
      setElections(await res.data)

      
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      // Display error message on screen
      setError(message);
    }
    setIsLoading(false)
  }
  useEffect (() =>{
    getElections()
  }, [])

   return (
    <>
    <section className="selection elections">
      <div className="conatiner elections__container">
        <header className="elections__header">
          <h1>Ongoing Elections</h1>
          {isAdmin && <button className='btn primary' onClick={openModal}>Create New Election</button>}
        </header> 
        {isLoading ? <Loader /> : <menu className='elections__menu'>
          {
            elections.map(election => <Election key={election._id} {...election} />)
          }
        </menu>}
      </div>
     </section>
     {electionModalShowing && <AddElectionModal />}
     {updateElectionModalShowing && <UpdateElectionModal />}
    </>
     
   )
 }
 
 export default Elections
 