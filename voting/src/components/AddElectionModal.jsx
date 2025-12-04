import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { UiActions } from '../store/ui-slice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddElectionModal = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [thumbnail, setThumbnail] = useState("")
    const [error, setError] = useState(null);



    const dispatch = useDispatch()
    const navigate = useNavigate()
    //close add election Modal
    const closeModal = ()=> {
        dispatch(UiActions.closeElectionModal())

    }
    
    const token = useSelector((state) => state?.vote?.currentVoter?.token);


     const createElection = async (e)=>{
            e.preventDefault()
            try { 
                const electionData = new FormData()
                electionData.set('title', title)
                electionData.set('description', description)
                electionData.set('thumbnail', thumbnail)
                const res = await axios.post("/elections", electionData, {withCredentials: true,
                    headers: { Authorization: `Bearer ${token}`},
                });
                closeModal()
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
    <section className="modal">
        <div className="modal__content">
            <header className="modal__header">
                <h4>Create New Election</h4>
                <button className="modal__close" onClick={closeModal}>
                    <IoMdClose />
                </button>
            </header>
            <form onSubmit={createElection}>
                <div>
                    <h6>Election Title:</h6>
                    <input type="text" name='title' value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <h6>Election Descrption:</h6>
                    <input type="text" value={description} name='description' onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <h6>Election Thumbnail:</h6>
                    <input type="file" name='description' accept = "png, jpg, jpeg, webp, avif" onChange={e => setThumbnail(e.target.files[0])}/>
                </div>
                <button type="submit" className='btn primary'>Add Elelction</button>
            </form>
        </div>
    </section>
  )
}

export default AddElectionModal
