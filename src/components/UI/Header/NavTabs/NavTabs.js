import React, { useContext } from 'react'
import './NavTabs.css'
import { Col , Row } from 'reactstrap'
import {Link} from 'react-router-dom'
//context-api stuff
import UserContext from '../../../../context/UserContext'

const NavTabs = () =>{
	const {user} = useContext(UserContext)
	const {auth_detail} = user
	return(
		<div className="underlined-tabs bg-white mx-0 p-0">
				
				<Row className="justify-content-md-center p-0 m-0" style={{height:"100%"}}>
					<Col xs lg="2"  tag={Link} to="/"
						 className="tab text-decoration-none h-100 d-flex justify-content-center align-items-center">
						 Home
					</Col>
					{ 
						 auth_detail ?
						<Col xs lg="2" 
							className="tab text-decoration-none h-100 d-flex justify-content-center align-items-center" tag={Link} to="/my-uploads">
							My Photos
						</Col>
						:"" 
					}
					
				</Row>
		</div>
	)
}

export default NavTabs