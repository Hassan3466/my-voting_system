import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { UiActions } from '../store/ui-slice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateElectionModal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState(null); // ✅ added

  const dispatch = useDispatch();
  const idOfElectionToUpdate = useSelector((state) => state?.vote?.idOfElectionToUpdate);
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(UiActions.closeUpdateElectionModal());
  };

  const fetchElection = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/elections/${idOfElectionToUpdate}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const election = res.data; // ✅ fixed
      setTitle(election.title);
      setDescription(election.description);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong';
      setError(message); // ✅ now works
    }
  };

  useEffect(() => {
    if (token && idOfElectionToUpdate) {
      fetchElection();
    }
  }, [token, idOfElectionToUpdate]); // ✅ safer dependencies

  const UpdateElection = async (e) => {
    e.preventDefault();
    try {
      const electionData = new FormData();
      electionData.set('title', title);
      electionData.set('description', description);
      electionData.set('thumbnail', thumbnail);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/elections/${idOfElectionToUpdate}`,
        electionData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      closeModal();
      navigate(0);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Something went wrong';
      setError(message);
    }
  };

  return (
    <section className="modal">
      <div className="modal__content">
        <header className="modal__header">
          <h4>Edit Election</h4>
          <button className="modal__close" onClick={closeModal}>
            <IoMdClose />
          </button>
        </header>

        {error && <p className="error">{error}</p>} {/* ✅ display errors */}

        <form onSubmit={UpdateElection}>
          <div>
            <h6>Election Title:</h6>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <h6>Election Description:</h6>
            <input
              type="text"
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <h6>Election Thumbnail:</h6>
            <input
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/webp, image/avif"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn primary">
            Update Election
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateElectionModal;


// import React, { useEffect, useState } from 'react'
// import { IoMdClose } from 'react-icons/io'
// import { useDispatch, useSelector } from 'react-redux';
// import { UiActions } from '../store/ui-slice';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const UpdateElectionModal = () => {
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("")
//     const [thumbnail, setThumbnail] = useState("")
//     const [error, setError] = useState(null);



//     const dispatch = useDispatch()
//     const idOfElectionToUpdate = useSelector(state => state?.vote?.idOfElectionToUpdate)
//     const token = useSelector((state) => state?.vote?.currentVoter?.token);
    

//     const navigate = useNavigate()
//     //close update election Modal
//     const closeModal = ()=> {
//         dispatch(UiActions.closeUpdateElectionModal())

//     }

//     const fetchElection = async()=> {
//         try {
//             const res = await axios.get(`${import.meta.env.VITE_API_URL}/elections/${idOfElectionToUpdate}`,{withCredentials: true,
//                     headers: { Authorization: `Bearer ${token}`},
//                 });

//                 const election = await response.data;
//                 setTitle(election.title)
//                 setDescription(election.description)
//         } catch (error) {
//             const message =
//                 error.response?.data?.message ||
//                 error.message ||
//                 "Something went wrong";
//                 // Display error message on screen
//                 setError(message);    
//         }

//     }
//     useEffect(()=>{
//         fetchElection()
//     }, [])

//     const UpdateElection = async(e) => {
//         e.preventDefault()
//         try {
//             const electionData =  new FormData();
//             electionData.set('title', title)
//             electionData.set('description', description)
//             electionData.set('thumbnail', thumbnail)
//             const res = await axios.patch(`${import.meta.env.VITE_API_URL}/elections/${idOfElectionToUpdate}`, electionData, {withCredentials: true,
//                     headers: { Authorization: `Bearer ${token}`},
//                 });
//                 closeModal()
//                 navigate(0)
//         } catch (error) {
//             const message = 
//             error.response?.data?.message || error.message ||
//              "Something went wrong";
//             // Display error message on screen
//             setError(message);
//         }
//     }

//   return (
//     <section className="modal">
//         <div className="modal__content">
//             <header className="modal__header">
//                 <h4>Edit Election</h4>
//                 <button className="modal__close" onClick={closeModal}>
//                     <IoMdClose />
//                 </button>
//             </header>
//             <form onSubmit={UpdateElection} >
//                 <div>
//                     <h6>Election Title:</h6>
//                     <input type="text" name='title' value={title} onChange={e => setTitle(e.target.value)} />
//                 </div>
//                 <div>
//                     <h6>Election Descrption:</h6>
//                     <input type="text" value={description} name='description' onChange={e => setDescription(e.target.value)} />
//                 </div>
//                 <div>
//                     <h6>Election Thumbnail:</h6>
//                     <input type="file" name='description' accept = "png, jpg, jpeg, webp, avif" onChange={e => setThumbnail(e.target.files[0])}/>
//                 </div>
//                 <button type="submit" className='btn primary' >Update Elelction</button>
//             </form>
//         </div>
//     </section>
//   )
// }

// export default UpdateElectionModal
