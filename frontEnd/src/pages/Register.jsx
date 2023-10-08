import React,{useEffect} from 'react'
import {Form, Input, message} from 'antd';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
function Register() {

const navigate=useNavigate()

//prevent for login user
useEffect(()=>{
    if(localStorage.getItem('user')){
        navigate('/')

    }
},[navigate]);

//form submit
  
    const submmitHandler= async (values)=>{
        
        try{
                console.log(values);
                    await axios.post("http://127.0.0.1:4000/users/register",values);
                    message.success("Registration Successfully");
                    navigate('/login');
            }catch(err)
            {
                console.log(err);
                message.error('something went wrong');

            }
    };


  return (
    <div className="register-page">
        
        <Form layout="vertical" onFinish={submmitHandler}>
            <h2>Register Form</h2>
            <Form.Item label="Name" name="name" >
                <Input/>
            </Form.Item>

            <Form.Item label="Email" name="email" >
                <Input type="email"/>
            </Form.Item>

            <Form.Item label="Password" name="password" >
                <Input type="password"/>
            </Form.Item>

            <div className="d-flex justify-content-between">
                    <Link to="/login">
                        Already Register? Click here to login
                    </Link>
                    <button className='btn btn-primary'>
                                Register
                    </button>
            </div>
        </Form>


    </div>
  )
}

export default Register