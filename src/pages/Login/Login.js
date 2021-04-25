import React, { Fragment , useContext, useState } from 'react'
import Logo from '../../components/UI/Logo/Logo';

import { Link, Redirect } from 'react-router-dom';
import { Button, Modal, ModalBody, Container } from 'reactstrap';
import { Row, Col , Form, FormGroup , Input, } from 'reactstrap';
import { toast } from 'react-toastify';
import './Login.css'

// context-api stuff
import UserContext from '../../context/UserContext'
import {CREATE_USER} from '../../context/action-types'


import firebase from 'firebase/app'


const Login = (props) =>{
	const [modal, setModal] = useState(true);
	const [email,setEmail] = useState("");
	const [password,setPassword]=useState("");

	const {user, dispatch} = useContext(UserContext);
	const {auth_detail} = user
	console.log("[LOGIN.JS]")
	const toggle = () => setModal(!modal);
	
	const handleSignin=()=>{
		firebase
			.auth()
			.signInWithEmailAndPassword(email,password)
			.then(res=>{
				const user={
					email:res.user.email,
					uid:res.user.uid
				}
				localStorage.setItem("user",JSON.stringify(user))
				dispatch({type:CREATE_USER , payload:user})
				

			})
			.catch(err=>{
				toast(err.message,{
					type:"error"
				})
			})
	}

	const handleSubmit=(e)=>{
		e.preventDefault();
		handleSignin();
		
	}
	if(auth_detail){
		return <Redirect to="/"/>
	}
	return(
	 <Fragment>
	  <div className="text-white" style={{zIndex:"200",position:"absolute",top:"0",right:"0"}} >
	  	New to MugglePexel ? 
		  <Link to="/signup">
		  	<Button size="lg" className="text-dark" style={{backgroundColor:"#f1f1f1"}}>Join</Button>
		  </Link>
	  </div>
	  <Container id="login-section" style={{zIndex:"50"}}>
		<div toggle={toggle}><Logo height="50px"/></div>
     	<Modal  isOpen={modal} 
		 			centered={true}
			  		modalTransition={{ timeout: 500 }} 
					backdropTransition={{ timeout: 700 }}
        			toggle={toggle}
					trapFocus={true}
					zIndex="100">

       		 <ModalBody>
				<Col lg={12} sm={12}>
				  <Form onSubmit={handleSubmit}>

				  	<Row>
						<Col sm={12} className="h3 text-weight-bolder text-center">Welcome back to MugglePexels</Col>
						<Col sm={12} className="p-3 text-center">
							<Button size="lg" style={{backgroundColor:"#4267B2",width:"100%"}}>Login via Facebook</Button>
						</Col>
						<Col sm={12} className="p-3 text-center">
							<Button size="lg"  style={{background:"linear-gradient(-120DEG,#4285F4,#34A853,#FBBC05,#EA4335)",width:"100%"}}>Login via Google</Button>
						</Col>
					</Row>

					<hr></hr>
					<Row>
						<Col className="h4 text-muted text-center" sm={12}><i>OR</i></Col>
					</Row>
					<hr></hr>

      				<FormGroup row>
       			     	<Col sm={12}>
          			   		<Input type="email" name="email" id="exampleEmail" 
								 placeholder="Email"
								 value={email}
								 onChange={(e)=>setEmail(e.target.value)} />
        			 	</Col>
     				</FormGroup>
      				<FormGroup row>
        			 	<Col sm={12}>
          			   		<Input type="password" 
								 name="password" 
								 id="examplePassword" 
								 placeholder="Password"
								 value={password}
								 onChange={(e)=>setPassword(e.target.value)} />
        			 	</Col>
					</FormGroup>
					<FormGroup row>
        			 	<Col sm={12}>
						 <Button size="lg" className="w-100" color="info">Login</Button>
        			 	</Col>
					</FormGroup>
	   			  </Form>
				</Col>
 

        	 </ModalBody>
        	{/* <ModalFooter>
          		<Button color="primary" onClick={toggle}>Do Something</Button>{' '}
        	</ModalFooter> */}
      	</Modal>
	  </Container>
	  </Fragment>
	)
}

export default Login