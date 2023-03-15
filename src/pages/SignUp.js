import React, {useState, useContext} from 'react'
import{
  Container,
  Form,
  Button,
  FormGroup,
  Label,
  Col,
  Input,
  Row,
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from 'reactstrap'

import firebase from 'firebase/compat/app';
import { UserContext } from '../context/UserContext';
import { Navigate } from "react-router-dom"
import {toast} from "react-toastify"
import "bootstrap/dist/css/bootstrap.min.css"

const SignUp = () => {

  const context= useContext(UserContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res)
        context.setUser({email: res.user.email, uid: res.user.uid})
      })
      .catch((error) => {
        console.log(error)
        toast(error.message,{
          type: 'error'
        })
      })
    }
  const handleSubmit = (e) => {
    e.preventDefault()
    handleSignUp()
  }

  if(context.user?.uid){
    return <Navigate to="/signin"/>
  }
  return (
    <Container className='text-center'>
      <Row>
        <Col lg={6} className='offset-lg-3 mt-5'>
          <Card>
            <Form onSubmit={handleSubmit}>
              <CardHeader className='fs-1 fw-bold'>Sign Up</CardHeader>
              <CardBody>
                <FormGroup row>
                  <Label for='email' sm={3}>
                    Email
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='email'
                      name='email'
                      id='email'
                      placeholder='Enter your email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for='password' sm={3}>
                    Password
                  </Label>
                  <Col sm={9}>
                    <Input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='Enter a password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Col>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button type='submit' block color='primary'>
                  Sign Up
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp