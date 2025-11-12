const { v4: uuid } = require("uuid");
const cloudinary = require("../utils/cloudinary");
const path =  require("path")

const ElectionModel = require("../models/electionModel");
const CandidateModel =  require('../models/candidateModel')

//***********ADD NEW ELECTION ********** */
//POST : api/elections

const HttpError = require("../models/ErrorModel");
const electionModel = require("../models/electionModel");

//PROTECTED (only admin)
const addElection = async (req, res, next) => {
  try {
    //only admin can add election
    if(!req.user.isAdmin) {
        return next(new HttpError("only admin can perform this action.", 403))
    }
    const { title, description } = req.body;
    if (!title || !description) {
      return next(new HttpError("fill all field.", 422));
    }
    if (!req.files.thumbnail) {
      return next(new HttpError("choose a thumbnail.", 422));
    }

    const { thumbnail } = req.files;
    //image should be less than 2mb
    if (thumbnail.size > 2000000) {
      return next(new HttpError("File size too big. should be less then 2mb"));
    }
    // rename the image
    let fileName = thumbnail.name;
    fileName = fileName.split(".");
    fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];

    //upload file to uploads in project
    await thumbnail.mv(
      path.join(__dirname, "..", "uploads", fileName),
      async (err) => {
        if (err) {
          return next(HttpError(err));
        }
        // store image on cloudinary
        const result = await cloudinary.uploader.upload(
          path.join(__dirname, "..", "uploads", fileName),
          { resource_type: "image" }
        );
        if (!result.secure_url) {
          return next(
            new HttpError("couldnt uplaod image to cloudinary.", 422)
          );
        }
        // save election to db
        const newElection = await ElectionModel.create({
          title,
          description,
          thumbnail: result.secure_url,
        });
        res.json(newElection);
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

//***********GET ALL ELECTION **********/
//GET : api/elections
//PROTECTED
const getElections = async (req, res, next) => {
    try {
        const elections = await ElectionModel.find();
        res.status(200).json(elections)
    } catch (error) {
        return next(new HttpError(error))
        
    }
};
//***********GET SINGLE ELECTION **********/
// GET: api/elections/:id
//PROTECTED
const getElection = async (req, res, next) => {
    try {
        const {id} = req.params;
        const election =  await ElectionModel.findById(id)
        res.status(200).json(election)
    } catch (error) {
        return next(new HttpError(error))
        
    }
};
//***********GET ELECTION CANDIDATES***********/
//GET: api/elections/id/candidates
//PROTECTED (only admin)
const getCandidatesOfElection = async (req, res, next) => {
    try {
        const {id} = req.params;
        const candidates =  await CandidateModel.find({election: id})
        res.status(200).json(candidates)
    } catch (error) {
        return next(new HttpError(error))
    }
};
//***********GET VOTERS OF ELECTION **********/
//GET :/elections/:id/voters
//PROTECTED
// const getElectionVoters = async (req, res, next) => {
//     try {
//         const {id} = req.params;
//         const response =  await ElectionModel.findById(id).populate('voters')
//         res.status(200).json(response.voters)
//     } catch (error) {
//         return next(new HttpError(error)) 
//     }
// };
const getElectionVoters = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next(new HttpError("Election ID is required", 400));

    const election = await ElectionModel.findById(id).populate({
      path: "voters",
      select: "fullName email createdAt",
    });

    if (!election) {
      return next(new HttpError("Election not found", 404));
    }

    res.status(200).json(election.voters || []);
  } catch (error) {
    console.error("Error fetching voters:", error);
    return next(new HttpError(error.message || "Failed to get voters", 500));
  }
};



//***********UPDATE ELECTION **********/
//PATCH :/elections/:id
//PROTECTED (only admin)
// const updateElection = async (req, res, next) => {
//   try {
//      //only admin can add election
//       // res.json(!req.user.isAdmin) {
//       //     return next(new HttpError("only admin can perform this action.", 403))
//       // }
//       const {id} = req.params;
//       const {title, description} = req.body;
//       if(!title || description) {
//         return next(new HttpError("fill in all fields.", 422))
//       }
//       if(req.files.thumbnail) {
//         const {thumbnail} = req.files;
//         //image size should not be less than 2mb
//         if(thumbnail.size > 2000000){
//           return next(new HttpError("image size too big should be reduced"))
//         }
//         // rename the image
//         let fileName = thumbnail.name;
//         fileName = fileName.split(".");
//         fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];
//         thumbnail.mv(path.join(__dirname, '..', 'uploads', fileName))
//         if(err) {
//           return next (new HttpError(err))
//         }
//          // store image on cloudinary
//         const result = await cloudinary.uploader.upload(
//           path.join(__dirname, "..", "uploads", fileName),
//           { resource_type: "image" });
//         // check if cloudinary storage was successful
//         if (!result.secure_url) {
//           return next(
//             new HttpError("couldnt uplaod image to cloudinary.", 422)
//           );

//           await electionModel.findByIdAndUpdate(id,{title, description, thumbnail: result.secure_url})

//           res.json("election updated succesffully", 200) 
           
//         }
//       }
    
//   } catch (error) {
    
//   }
// };
const updateElection = async (req, res, next) => {
  try {
      //only admin can add election
    if(!req.user.isAdmin) {
        return next(new HttpError("only admin can perform this action.", 403))
    }
    const { id } = req.params;
    const { title, description } = req.body;

    // check for required fields
    if (!title || !description) {
      return next(new HttpError("fill in all fields.", 422));
    }

    let updateData = { title, description };

    // check if thumbnail is uploaded
    if (req.files && req.files.thumbnail) {
      const { thumbnail } = req.files;

      // image size check
      if (thumbnail.size > 2000000) {
        return next(new HttpError("image size too big, should be under 2MB", 422));
      }

      // rename the image
      let fileName = thumbnail.name.split(".");
      fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];

      // move file
      await thumbnail.mv(path.join(__dirname, "..", "uploads", fileName));

      // upload to cloudinary
      const result = await cloudinary.uploader.upload(
        path.join(__dirname, "..", "uploads", fileName),
        { resource_type: "image" }
      );

      if (!result.secure_url) {
        return next(new HttpError("couldn't upload image to cloudinary.", 422));
      }

      updateData.thumbnail = result.secure_url;
    }

    // update election
    await ElectionModel.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({ message: "Election updated successfully" });
  } catch (error) {
    return next(new HttpError(error.message || "Something went wrong", 500));
  }
};

//***********DELETE ELECTION ***********/
//DELETE : /elections/:id
//PROTECTED (only admin)
const removeElection = async (req, res, next) => {
  try {
      //only admin can add election
    if(!req.user.isAdmin) {
        return next(new HttpError("only admin can perform this action.", 403))
    }
    const {id} = req.params;
    await ElectionModel.findByIdAndDelete(id);
    // delete candidate that belong to this election
    await CandidateModel.deleteMany({election: id})
    res.status(200).json("Election deleted successfully.", 200)
    
  } catch (error) {
    return next(new HttpError(error))
    
  }
};

module.exports = {
  addElection,
  getElection,
  getElections,
  updateElection,
  removeElection,
  getCandidatesOfElection,
  getElectionVoters,
};
