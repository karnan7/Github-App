import React, { useState,useContext } from 'react'
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

const SignIn = () => {

	const context = useContext(UserContext)

	const [email, setEmail] = useState("abc@example.com")
	const [password, setPassword] = useState("123456")

	const handleSignIn = () => {
		firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then( res => {
			context.setUser({email: res.user.email, uid: res.user.uid})
		})
		.catch((error) => {
			toast(error.message, {
				type: 'error'
			}) 
		})
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		handleSignIn()
	}

	if(context.user?.uid){
		return <Navigate to="/" />
	}
	return (
			<Container className='text-center'>
				<Row>
					<Col lg={6} className='offset-lg-3 mt-5'>
						<Card>
							<Form onSubmit={handleSubmit}>
								<CardHeader className='fs-1 fw-bold'>Sign In</CardHeader>
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
												placeholder=' Enter your email'
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
												placeholder='password '
												value={password}
												onChange={e => setPassword(e.target.value)}
											/>
										</Col>
									</FormGroup>
								</CardBody>
								<CardFooter>
									<Button type='submit' block color='primary'>
										Sign In
									</Button>
								</CardFooter>
							</Form>
						</Card>
					</Col>
				</Row>
			</Container>
		);
}

export default SignIn