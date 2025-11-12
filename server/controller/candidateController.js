const { v4: uuid } = require("uuid");
const cloudinary = require("../utils/cloudinary");
const path =  require("path")
const mongoose = require("mongoose")

const ElectionModel = require("../models/electionModel");
const CandidateModel =  require('../models/candidateModel')
const VoterModel =  require('../models/voterModel')


//***********ADD NEW ELECTION ********** */
//POST : api/elections

const HttpError = require("../models/ErrorModel");





//***********ADD CANDIDATE ********** */
//POST : api/candidates
//PROTECTED (only admin)
const addCandidate = async (req, res, next) => {
    try {
        //only admin can add election
        if(!req.user.isAdmin) {
            return next(new HttpError("only admin can perform this action.", 403))
        }

        const {fullName, motto, currentElection} = req.body;
        if(!fullName || !motto){
            return next(new HttpError("fill in all fields", 422))
        }
        if(!req.files.image){
            return next(new HttpError("Kindly upload images", 422))
        }
        const {image} = req.files;
        //check image size
        if(image.size > 2000000){
            return next(new HttpError("Image size should be less than 2mb", 422))
        }
         // rename the image
        let fileName = image.name;
        fileName = fileName.split(".");
        fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];

        //upload file to upload folder
        image.mv(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
            if(err) {
                return next(new HttpError(err))
            }
            // store image on cloudinary
            const result = await cloudinary.uploader.upload(
                      path.join(__dirname, "..", "uploads", fileName),
                      { resource_type: "image" }
                    ); 
                    if (!result.secure_url) {
          return next(
            new HttpError("couldn't upload image to cloudinary.", 422)
          );
        } 
        // add candidate to the db
        let newCandidate =  await CandidateModel.create({fullName, motto, image: result.secure_url, election: currentElection})

        // get election and push candidate to election
        let election = await ElectionModel.findById(currentElection)

        const sess = await mongoose.startSession()
        sess.startTransaction()
        await newCandidate.save({session: sess})
        election.candidates.push(newCandidate)
        await election.save({session: sess})
        await sess.commitTransaction()


        res.status(201).json("candidate added successfully")
        })
    } catch (error) {
        return next(new HttpError(error))
        
    }
}

//***********GET CANDIDATE ********** */
//GET : api/candidates/:id
//PROTECTED 
const getCandidate = async (req, res, next) => {
    try {
        const {id} = req.params;
        const candidate = await CandidateModel.findById(id)
        res.json(candidate)
    } catch (error) {
        return next(new HttpError(error))
        
    }
}

//***********DELETE CANDIDATE ********** */
//DELETE: api/candidates/:id
//PROTECTED (only admin)
const removeCandidate = async (req, res, next) => {
    try {
        //only admin can add election
        if(!req.user.isAdmin) {
            return next(new HttpError("only admin can perform this action.", 403))
        }
        const {id} = req.params;
        let currentCandidate =  await CandidateModel.findById(id).populate('election')
        if(!currentCandidate) {
            return next(new HttpError("Couldn't delete candidate.", 422))
        } else {
            const sess =  await mongoose.startSession()
            sess.startTransaction()
            await currentCandidate.deleteOne({session: sess})
            currentCandidate.election.candidates.pull(currentCandidate)
            await currentCandidate.election.save({session: sess})
            await sess.commitTransaction()


            res.status(200).json("Candidate Deleted Successfully.")

        }   
    } catch (error) {
        return next(new HttpError(error))
        
    }
}

//***********UPDATE CANDIDATE or vote candidate********** */
//PATCH: api/candidates/:id
//PROTECTED (only admin)
// const voteCandidate = async (req, res, next) => {
//     try {
//         const {id: candidateId} =  req.params;
//         const {selectedElection} = req.body;

//         //get the candidate
//         const candidate =  await CandidateModel.findById(candidateId);
//         const newVoteCount = candidate.voteCount + 1;

//         // update candiate vote
//         await CandidateModel.findByIdAndUpdate(candidateId, {voteCount: newVoteCount}, {new: true})

//         // start session for relationship between voter and election
//         const sess = await mongoose.startSession()
//         sess.startTransaction();

//         // get the current voter
//         let voter =  await VoterModel.findById(req.user.id)
//         await voter.save({session: sess})

//         // get selected election
//         let election =  await ElectionModel.findById(selectedElection);
//         election.voters.push(voter);
//         voter.votedElections.push(election);
//         await election.save({session: sess})
//         await voter.save({session: sess})
//         await sess.commitTransaction();
//         res.status(200).json(voter.votedElections)
//     } catch (error) {
//         return next (new HttpError(error))
        
//     }
// } 
const voteCandidate = async (req, res, next) => {
  try {
    const candidateId = req.params.id;
    const voterId = req.user.id; // from your auth middleware

    // 1️⃣ Find the candidate
    const candidate = await Candidate.findById(candidateId).populate("election");
    if (!candidate) return next(new HttpError("Candidate not found", 404));

    const election = await Election.findById(candidate.election._id);
    const voter = await Voter.findById(voterId);

    if (!election || !voter) return next(new HttpError("Election or Voter not found", 404));

    // 2️⃣ Prevent double voting
    if (voter.votedElections.includes(election._id)) {
      return next(new HttpError("You have already voted in this election", 403));
    }

    // 3️⃣ Increment candidate’s votes
    candidate.voteCount = (candidate.voteCount || 0) + 1;
    await candidate.save();

    // ✅ 4️⃣ Add voter ID to election’s voters list
    election.voters.push(voter._id);
    await election.save();

    // ✅ 5️⃣ Add election ID to voter’s votedElections list
    voter.votedElections.push(election._id);
    await voter.save();

    res.status(200).json({ message: "Vote recorded successfully!" });
  } catch (error) {
    next(new HttpError(error.message || "Voting failed", 500));
  }
};




module.exports = {addCandidate,getCandidate,removeCandidate,voteCandidate}