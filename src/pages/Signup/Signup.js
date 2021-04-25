import React, { Fragment, useContext, useState } from 'react'
import Logo from '../../components/UI/Logo/Logo'

import { Container, Row , Col , Form , FormGroup , Input , Button } from 'reactstrap'
import { toast } from 'react-toastify'
import './Signup.css'
// react-router stuff
import { Link, Redirect, useHistory } from 'react-router-dom'

// context-api stuff
import UserContext from '../../context/UserContext'
import {CREATE_USER} from '../../context/action-types'


import firebase from 'firebase/app'

const Signup = (props) =>{
	const [name,setName]=useState("")
	const [email,setEmail]=useState("");
	const [password,setPassword]=useState("")

	const {user , dispatch}=useContext(UserContext);
	const {auth_detail}=user
	const history=useHistory()
	const handleSignup=()=>{
		// e.preventDefault();
		firebase
			.auth()
			.createUserWithEmailAndPassword(email,password)
			.then(res=>{
				// console.log(res.user.email)
				const user={
					email:res.user.email,
					uid:res.user.uid
				}
				localStorage.setItem("user",JSON.stringify(user))
				dispatch({type:CREATE_USER,payload:user})
			})
			.catch(err=>{
				console.log(err)
				toast(err.message,{type:"error"})
			})
	}

   const handleSubmit=(e)=>{
	   e.preventDefault()
	   handleSignup();
	   history.push('/')
	//    <Redirect to="/"></Redirect>
   }
   if (auth_detail?.uid) {
    return <Redirect to="/" />;
  }
	return(
		<Fragment>
			<Container fluid id="signup-section">
			  <Row>
				  <Col lg={12} md={12} sm={12} className="prod-title">
					 <Logo height="80%"/> 
					 <span className="text-dark" style={{zIndex:"200",position:"absolute",top:"2",right:"30px"}}>
	  					Have a Account? <Link to="/signin"><Button size="md" className="text-dark" style={{backgroundColor:"#f1f1f1"}}>Sign In</Button></Link>
	  				</span>
				  </Col>
			 </Row>
			 <Row>
				{/* // form section */}
				<Col lg={6} sm={12}>
				  <Form onSubmit={handleSubmit}>

				  	<Row>
						<Col sm={12} className="h1 text-weight-bolder text-center">Join with others</Col>
						<Col sm={12} className=" h4 text-center text-muted">Download free photos and videos powered by a community of photographers.
						</Col>
						<Col sm={12} className="p-3 text-center">
							<Button size="lg" color="" style={{backgroundColor:"#4267B2"}}>Join via Facebook</Button>
						</Col>
					</Row>

					<hr></hr>
					<Row>
						<Col className="h4 text-muted text-center" sm={12}><i>OR</i></Col>
					</Row>
					<hr></hr>
				  	<Row form>
        				<Col md={6}>
          			 		<FormGroup>
           			    		<Input type="text" 
								   name="firstname" id="firstname" 
								   placeholder="First Name"
								   value={name}
								   onChange={(e)=>setName(e.target.value)} />
          			 		</FormGroup>
       			    	</Col>
        				<Col md={6}>
          			 		<FormGroup>
            					<Input type="text" name="lastname" id="lastname" placeholder="Last Name" />
          			 		</FormGroup>
        				</Col>
      				</Row>
      				<FormGroup row>
       			     	<Col sm={12}>
          			   		<Input type="email" 
								 name="email" id="exampleEmail" 
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
						 <Button size="lg" className="w-100" color="info">Create New Account</Button>
        			 	</Col>
					</FormGroup>
	   			  </Form>
				</Col>
				
 



			  {/* // Project-illustration section */}
				<Col lg={6} sm={12} className="proj-illustration">
				</Col>
			 </Row>
				
			</Container>
		</Fragment>
	)
}

export default Signup