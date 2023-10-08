import React,{useEffect} from 'react';
import {Form,Input, message} from 'antd';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
function LoginPage() {
const navigate= useNavigate()

        const submitHandler=async(values)=>{
            
            try{
            const {data}= await axios.post('http://127.0.0.1:4000/users/login',values);
            message.success('Login successful');
            localStorage.setItem('user',JSON.stringify({...data,password:''}));
            navigate('/')
            }catch(err){
                console.log(err);
                message.error('something went wrong');

            }

        }
//prevent user to login
        useEffect(()=>{
            if(localStorage.getItem('user')){
                navigate('/')
        
            }
        },[navigate]);
        
  return (
    <div className="register-page">
        
    <Form layout="vertical" onFinish={submitHandler}>
        <h2>Login Form</h2>

        <Form.Item label="Email" name="email" >
            <Input type="email"/>
        </Form.Item>

        <Form.Item label="Password" name="password" >
            <Input type="password"/>
        </Form.Item>

        <div className="d-flex justify-content-between">
                <Link to="/register">
                    Not a user ? Click here to register
                </Link>
                <button className='btn btn-primary'>
                            Login
                </button>
        </div>
    </Form>


</div>
  )
}

export default LoginPage