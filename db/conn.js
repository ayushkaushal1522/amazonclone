const mongoose = require("mongoose");
const DB=process.env.DATABASE;
mongoose.connect(DB).then(()=>console.log("Data Base Connected")).catch((error)=>console.log("error"+error.message));