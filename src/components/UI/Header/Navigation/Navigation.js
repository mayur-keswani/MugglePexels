import React, { Fragment , useState , useContext} from 'react'
// import component
import Logo from '../../Logo/Logo'
// For styling
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Button,
	NavbarText,
	UncontrolledTooltip
  } from 'reactstrap';
// react icons
import {MdCollectionsBookmark} from 'react-icons/md'
// react-router-dom
  import { Link } from 'react-router-dom';
// context api stuff
import UserContext from '../../../../context/UserContext'
import { CREATE_USER, TOGGLE_MODAL } from '../../../../context/action-types';
  
const Navigation = () =>{
	const [isOpen, setIsOpen] = useState(false);
	const {user , dispatch} = useContext(UserContext)
	const {auth_detail } = user
	const toggle = () => setIsOpen(!isOpen);

	return(
		<Fragment>
			<Navbar dark className="m-0 p-0" expand="sm">
			<div><Logo height="50px"/></div>
			<NavbarBrand href="/" className="companyName font-weight-bold">MugglePexels</NavbarBrand>
			<NavbarToggler onClick={toggle}  />

			<Collapse 
				isOpen={isOpen} 
				className="collapse-navbar" navbar  
				style={{backgroundColor:(isOpen && window.innerWidth<576) ?"#242B2E":"transparent"}}>
			<NavbarText>{auth_detail?`Hello ${auth_detail.email}`:"Hello Muggle !!"}</NavbarText>
				<Nav className="ml-auto p-3 auto text-white" navbar>
						<NavItem>
							<NavLink tag={Link}
									to="/" 
									className="text-white"
								   	onClick={()=>
										   dispatch({type:TOGGLE_MODAL,payload:true})
									}>
							   		{isOpen?
									   "Your Collections":
									   <Button color="info" size="lg" id="user-collection">
									   	<MdCollectionsBookmark/>
									   </Button>}
									   <UncontrolledTooltip placement="bottom" target="user-collection">
       										Your Collection
     									</UncontrolledTooltip>
							</NavLink>
						</NavItem>
						{
						 auth_detail?
							(<NavItem >
             		  			<NavLink tag={Link} to="/" className="text-white"
								   onClick={()=>{
										   localStorage.removeItem("user");
										   dispatch({type:CREATE_USER, payload:null})

									   }}>
							   		{isOpen?
									   "Logout":
									   <Button color="info" size="lg">
									   	Logout
									   </Button>}
								</NavLink>
            				</NavItem>):
							(<NavItem >
            		  			<NavLink tag={Link} to="/signup" className="text-white">
							  		{isOpen?"Join":<Button color="info" size="lg">Join</Button>}		
								</NavLink>
           					</NavItem>)

					}		
         		</Nav>
			</Collapse>
			</Navbar>
		</Fragment>
	)
}

export default Navigation