/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { useState, useEffect } from "react";
import useToken from '../useToken';
import React from 'react';
import { Container,Form,Col,Button,Row} from 'react-bootstrap';
async function updateUser(credentials,token) {
 return fetch('http://127.0.0.1:8000/api/update-user', {
   method: 'POST',
   headers: {
       'Authorization': 'Bearer '+token, 
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json());
}
async function getUser(token)
{
     return fetch('http://127.0.0.1:8000/api/user-details', {
   method: 'POST',
   headers: {
       'Authorization': 'Bearer '+token, 
     'Content-Type': 'application/x-www-form-urlencoded'
   },
   body: JSON.stringify([])
 })
   .then(data => data.json());
}
export default function Profile() {
                const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };
  var token=getToken();
         const [name, setName] = useState("");
         const [email, setUserName] = useState("");
             const handleSubmit = async e => {
    e.preventDefault();
    const response = await updateUser({
        name,
      email
    },token);
    if(response.hasOwnProperty('success')){
       alert(response.success);
     }else
     {
       var error=  response.error;
        for(var x in error)
        {
            alert(error[x]);
            break;
        }
     }
  }
  async function setProfileData()
  {
       const response = await getUser(token);
             setName(response.success.name);
             setUserName(response.success.email);
  }
  useEffect(() => {
      
//  console.log(token);
    setProfileData(token);
  }, []);
  return(
   <Container>
  <Row className="justify-content-center mt-5">
  <div className="col-6">
  <h1>Profile</h1>
                <Form onSubmit={handleSubmit}>
   <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Name"  value={name} onChange={e => setName(e.target.value)}/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email"   value={email} onChange={e => setUserName(e.target.value)}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>
  <Button variant="primary" type="submit">
    Update Profile
  </Button>
</Form>
  </div>
  </Row>
                </Container>
  );
}