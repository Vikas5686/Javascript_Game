const { mongoose } = require('mongoose');
const db="mongodb+srv://vs5686377:vs5686377@cluster0.dbp1ygs.mongodb.net/JavascriptScore?retryWrites=true&w=majority"

mongoose.connect(db,{
    useUnifiedTopology:true
}).then(()=>console.log("connect mahan start")).catch((e)=>console.log(e.message))