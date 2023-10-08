const express= require('express');
const mongoose= require('mongoose');
const cors=require('cors');
const app = express();
app.use(cors());
const url="mongodb://127.0.0.1:27017/expenseTracker";


const port= process.env.PORT || 4000;
app.use(express.json())


mongoose.connect(url, { useNewUrlParser:true,useUnifiedTopology:true });
const conn=mongoose.connection;

//user router
app.use('/users',require('./routes/userRoute'));

//transaction router
app.use('/transactions',require('./routes/transactionRoute'));


conn.on('error',()=>{
    console.log('something went wrong');
})


conn.on('open',()=>{
    console.log('Connection established');

})



// app.get('/',(req,res)=>{
//     res.send("<h1>Hello world</h1>");
// })





app.listen(port,()=>
    {
        console.log(`listening on port ${port}`);
    }
)