import React, { useState } from 'react';
import { Container,Form,Col,Button,Row} from 'react-bootstrap';
async function loginUser(credentials) {
 return fetch('http://127.0.0.1:8000/api/login', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json());
}

export default function Login(prop) {
         const [email, setUserName] = useState();
  const [password, setPassword] = useState();
    const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
   if(token.hasOwnProperty('token')){
     prop.setToken(token);
   }else
   {
       alert(token.error);
   }
   
  }
  return(
          <Container>
  <Row className="justify-content-center mt-5">
  <div className="col-6">
  <h1>Login</h1>
                <Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email"  onChange={e => setUserName(e.target.value)}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password"  onChange={e => setPassword(e.target.value)}/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Login
  </Button><br/>
  <a href="/register">Register Now</a>
</Form>
  </div>
  </Row>
                </Container>
  );
}