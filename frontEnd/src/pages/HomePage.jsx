import React,{useState,useEffect} from 'react'
import Layout from '../components/Layouts/Layout'
import {Form, Modal,Input, Select, message,Table, Space, Button} from 'antd';

import axios from 'axios';

function HomePage() {
  
  const [showModal,setShowModal]=useState(false);
  const [allTransaction,setAllTransactions]=useState([]);
  const [editAble,setEditAble]=useState(null);

  const columns=[
    
    {
      title: 'Amount',
      dataIndex: 'amount'
      
    },
    
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Reference',
      dataIndex: 'reference'
    }
    ,
    {
      title: 'Actions',
      render: (text,record) => (
        <Space>
          <Button type="primary" onClick={()=>{ setEditAble(record); setShowModal(true) }}> Edit</Button>
          <Button type="primary" danger onClick={()=> handleDeleteRecord(record)}> Delete</Button>
        </Space>
      )
    }
  ]


//get all transaction details
const getAllTransactions1=async()=>{
  try{
    const userIdFetch=JSON.parse(localStorage.getItem('user'));
//console.log(typeof userIdFetch.user._id)
const userId=userIdFetch.user._id
    const res=await axios.post('http://127.0.0.1:4000/transactions/showTransaction',{userid:userId})
    setAllTransactions(res.data);
    console.log(res);
  }
  catch(err){
    console.log(err);
    message.error("Fetch issue with transaction");
  }
}

const handleDeleteRecord=async(record)=>{
  try{
    console.log("hello")
    await axios.post('http://127.0.0.1:4000/transactions/deleteTransaction',{transactionId:record._id})
    message.error("Deleted successfully")
    location.record();

  }catch(err)
  {
    console.log(err);
    message.error("Fail to delete the data")
  }
}

  const handleTransactionSubmit=async(values)=>{
    try{
      const userDet =JSON.parse(localStorage.getItem("user"));
      //const userid=userDet.user.name;

      if(editAble){
          await axios.post('http://127.0.0.1:4000/transactions/updateTransaction',
          {payload:{...values,userId:userDet.user._id},transactionId:editAble._id });
          message.success("Updated successfully");
      setEditAble(null);
      }else{
        await axios.post('http://127.0.0.1:4000/transactions/addTransactions',{...values,userid:userDet.user._id})
        message.success("transactions added successfully")
      
      }
      
      setShowModal(false);
      location.reload();
    }
    catch(err){
      console.log(err);
      message.error("failed to add transaction")
    }
  }

  
useEffect(() => {
  getAllTransactions1();
},[]);

  return (
   <Layout>
    <div className="filters">
        <div>range filters</div>
        <div>
          <button className='btn btn-primary' onClick={()=> setShowModal(true)}>Add New</button>
        </div>
    </div>
    <div className="content">
    <Table columns={columns} dataSource={allTransaction}/>
    </div>

    <Modal 
      title={editAble?"Edit Transaction":"Add Transaction"}
      open={showModal}
      onCancel={()=>setShowModal(false)}
      footer={false}

    >
      
      <Form layout="vertical" onFinish={handleTransactionSubmit} initialValues={editAble}>
        <Form.Item label="Amount" name="amount" >
          <Input type="text" />
        </Form.Item>

  <Form.Item label="Type" name="type" >
          <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
        </Form.Item>
      
        <Form.Item label="Category" name="category" >
          <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="tip">Tip</Select.Option>
            <Select.Option value="project">Project</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="movie">Movie</Select.Option>
          </Select>
        </Form.Item>


        <Form.Item label="Date" name="date" >
          <Input type="date" />
        </Form.Item>


        <Form.Item label="Reference" name="reference" >
          <Input type="text" />
        </Form.Item>


        <Form.Item label="Description" name="description" >
          <Input type="text" />
        </Form.Item>
        
<div className="d-flex justify-content-end">
<button className="btn btn-primary" >
    Save
</button>
</div>
      </Form>
    </Modal>


   </Layout>
  )
}

export default HomePage