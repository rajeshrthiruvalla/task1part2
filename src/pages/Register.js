import React, { useState } from 'react';
import { Container,Form,Col,Button,Row} from 'react-bootstrap';
async function registerUser(credentials) {
 return fetch('http://127.0.0.1:8000/api/register', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json());
}

export default function Register() {
         const [name, setName] = useState();
         const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  const [c_password, setCPassword] = useState();
    const handleSubmit = async e => {
    e.preventDefault();
    const response = await registerUser({
        name,
      email,
      password,
      c_password
    });
    if(response.hasOwnProperty('success')){
    alert("hi "+response.success.name+", registered successfully.. please authentify "+response.success.email+"");
    window.location='/login';
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
  return(
          <Container>
  <Row className="justify-content-center mt-5">
  <div className="col-6">
  <h1>Register</h1>
                <Form onSubmit={handleSubmit}>
   <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Name"  onChange={e => setName(e.target.value)}/>
  </Form.Group>
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

  <Form.Group className="mb-3" controlId="formBasicPasswordC">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="c_password" placeholder="Password Confirm"  onChange={e => setCPassword(e.target.value)}/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
  </div>
  </Row>
                </Container>
  );
}