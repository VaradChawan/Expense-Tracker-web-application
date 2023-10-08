
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


const addTransactions=async (req,res)=>{
    try{
        const addTrans=new transactionModel(req.body);
        await addTrans.save();
        res.status(200).send("Transactions added successfully")

    }catch(e){
        
        res.status(500).json(e);
    }
}

module.exports={getAllTransactions,addTransactions}