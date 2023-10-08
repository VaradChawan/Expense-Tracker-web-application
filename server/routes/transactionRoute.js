const express= require('express');
const {getAllTransactions,addTransactions}=require('../controller/transactionController')    

const router=express.Router();

//add transaction
router.post('/addTransactions',addTransactions)

//display all expense
router.post('/showTransaction',getAllTransactions);


module.exports = router;