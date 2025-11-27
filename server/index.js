const express = require("express");
const cors = require("cors");
// const {connect} = require("mongoose");
const mongoose = require("mongoose");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const Routes = require("./routes/Routes")
const{notFound, errorHandler} = require("./middleware/errorMiddleware")


const app = express()
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
// app.use(cors({credentials:true, origin: ["http://localhost:/5173"]}))
app.use(cors({ credentials: true, origin: ["http://localhost:5173","http://vote.fuo.edu.ng", "https://vote.fuo.edu.ng"] }));
app.use(fileUpload())



app.use('/api', Routes)
app.use(notFound)
app.use(errorHandler)


//creating our servers


// connect(process.env.MONGO_URL).then(app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
// ).catch(err => console.log(err))
// connect(process.env.MONGO_URL)
//   .then(() => {
//     app.listen(process.env.PORT || 5000, () =>
//       console.log(`Server started on port ${process.env.PORT || 5000}`)
//     );
//   })
//   .catch((err) => console.error("MongoDB connection error:", err));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);

    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
