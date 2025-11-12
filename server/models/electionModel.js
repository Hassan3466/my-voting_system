const {Schema, model, Types} = require('mongoose')




const electionSchema = new Schema({
    title: {type: String, required: true},
    description:{type: String, required: true},
    thumbnail:{type: String, required: true},
    candidates:[{type: Types.ObjectId, ref: "Candidate", required: true}],
    voters: [{type: Types.ObjectId, ref: "voter"}]
})


module.exports = model("Election", electionSchema)