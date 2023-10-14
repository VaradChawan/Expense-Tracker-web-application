const express= require('express');
const {getAllTransactions,addTransactions,updateTransactions,deleteTransactions}=require('../controller/transactionController')    

const router=express.Router();

//add transaction
router.post('/addTransactions',addTransactions)

//display all expense
router.post('/showTransaction',getAllTransactions);
//update transaction
router.post('/updateTransaction',updateTransactions);

//delete transaction
router.post('/deleteTransaction',deleteTransactions);

module.exports = router;