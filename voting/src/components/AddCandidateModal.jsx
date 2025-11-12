import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch,  useSelector } from 'react-redux';
import { UiActions } from '../store/ui-slice'  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCandidateModal = () => {
    const [fullName, setFullName] = useState("")
    const [motto, setMotto] = useState("")
    const [image, setImage] = useState("")



    const dispatch = useDispatch()
    const navigate = useNavigate()
    //close update election Modal
    const closeModal = ()=> {
        dispatch(UiActions.closeAddCandidateModal())

    }

    const token = useSelector((state) => state?.vote?.currentVoter?.token);
    const electionId = useSelector((state) => state?.vote?.addCandidateElectionId);



    // const addCandidate = async ()=>{
    //     e.preventDefault()
    //     try {
    //         const candidateInfo = new FormData();
    //         candidateInfo.set('fullName', fullName);
    //         candidateInfo.set('motto', motto);
    //         candidateInfo.set('image', image);
    //         candidateInfo.set('currentElection', electionId);
    //         await axios.delete(`${import.meta.env.VITE_API_URL}/candidates`, candidateInfo, {withCredentials: true,
    //             headers: { Authorization: `Bearer ${token}`},
    //         });
    //         navigate(0)
    //     } catch (error) {
    //         const message = 
    //         error.response?.data?.message ||
    //         error.message ||
    //         "Something went wrong";
    //         // Display error message on screen
    //         // setError(message);    
    //         }
    //     }

    const addCandidate = async (e) => {
  e.preventDefault();

  try {
    const candidateInfo = new FormData();
    candidateInfo.set("fullName", fullName);
    candidateInfo.set("motto", motto);
    candidateInfo.set("image", image);
    candidateInfo.set("currentElection", electionId);

    await axios.post(`${import.meta.env.VITE_API_URL}/candidates`, candidateInfo, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });

    navigate(0);
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    console.error(message);
  }
};


  return (
    <section className="modal">
        <div className="modal__content">
            <header className="modal__header">
                <h4>Add Candidate</h4>
                <button className="modal__close" onClick={closeModal}>
                    <IoMdClose />
                </button>
            </header>
            <form onSubmit={addCandidate}>
                <div>
                    <h6>Candidate Name:</h6>
                    <input type="text"  value={fullName}  name='fullName' onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                    <h6>Candidate Motto:</h6>
                    <input type="text"  value={motto}  name='motto' onChange={(e) => setMotto(e.target.value)} />
                </div>
                <div>
                    <h6>Candidate Image:</h6>
                    <input type="file" 
                    name="image"
                    accept="image/png, image/jpg, image/jpeg, image/webp, image/avif"
                    onChange={(e) => setImage(e.target.files[0])}
                    />
                    {/* <input type="file"   value={image}  name='image' onChange={e => setImage(e.target.files[0])}  accept='png, jpg, webp, jpeg, avif'/> */}
                </div>
                <button type='submit' className="btn primary">
                    Add Candidate
                </button>
            </form>
        </div>
    </section>
  )
}

export default AddCandidateModal
