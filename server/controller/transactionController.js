
const transactionModel=require('../models/transactionModel');
const getAllTransactions=async (req,res)=>{
    try{
         const transaction=await transactionModel.find({userid:req.body.userid});
         res.status(200).json(transaction);
    }
    catch(err){

        res.status(500).json(err);
    }
}

const  deleteTransactions=async(req,res)=>{
    try{

        const transactionId=req.body.transactionId;
        await transactionModel.findOneAndDelete({_id:transactionId});
        res.status(200).send("Transactions deleted");


    }catch(err){
console.log(err);
res.status(500).json(err);
    }
}


const updateTransactions=async (req,res)=>{
    try{
        await transactionModel.findByIdAndUpdate({_id:req.body.transactionId}, req.body.payload);
        res.status(200).send("Updated transaction successfully");
    }catch(err){
        res.status(400).send(err);
    }
}

const addTransactions=async (req,res)=>{
    try{
        const addTrans=new transactionModel(req.body);
        await addTrans.save();
        res.status(200).send("Transactions added successfully")

    }catch(e){
        
        res.status(500).json(e);
    }
}

module.exports={getAllTransactions,addTransactions,updateTransactions,deleteTransactions}