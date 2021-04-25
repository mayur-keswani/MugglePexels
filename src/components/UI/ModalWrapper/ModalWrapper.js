import React, { Fragment, useContext } from 'react'
import { Modal,ModalHeader , ModalBody } from 'reactstrap';
// context-api stuff
import { TOGGLE_MODAL } from '../../../context/action-types';
import UserContext from '../../../context/UserContext';



const ModalWrapper = (props) =>{
	const {user , dispatch , myPosts , dispatchPost} = useContext(UserContext)
	const {modalIsOpen} = user 
	const {isModalOpen} = myPosts
	return(
		<Fragment>
		  
			<Modal  isOpen={modalIsOpen || isModalOpen} 
		 			centered={true}
					size="lg"
			  		modalTransition={{ timeout: 500 }} 
					backdropTransition={{ timeout: 700 }}
        			toggle={()=>dispatch({type:TOGGLE_MODAL,payload:false})}
					trapFocus={true}
					zIndex="250"
					onClosed={()=>{
						dispatch({type:TOGGLE_MODAL,payload:false})
						dispatchPost({type:TOGGLE_MODAL,payload:false})
					}
					}>
				<ModalHeader className="p-2" toggle={()=>
														(modalIsOpen)?
														dispatch({
																	type:TOGGLE_MODAL,
																	payload:false
																}):
														dispatchPost({
																	type:TOGGLE_MODAL,
																	payload:false
																})
														
													}></ModalHeader>
				<ModalBody className="d-flex p-1 justify-content-center align-items-center flex-column">
					{props.children}
				</ModalBody>			
			</Modal>

		</Fragment>
	)
}

export default ModalWrapper