import React, { useContext }  from 'react'
import {Card ,Button } from 'reactstrap'
import {FaExpandAlt} from 'react-icons/fa'
import {IoIosRemoveCircle} from 'react-icons/io'
import './MyPost.css'
// context-api stuff
import { REMOVE_POST, UPDATE_POST, VIEW_POST } from '../../context/action-types'
import UserContext from '../../context/UserContext'
import { useHistory } from 'react-router'

const MyPost = ({uid,productDetail}) =>{
	const {dispatchPost} = useContext(UserContext)
	const history = useHistory()
	return(

			 <Card className="box" >
		 		<Card body className="p-0">
        			<img className="card-img" width="100%"  src={productDetail.imageURL} alt="prod_img" />
					<div className="card-footer" >
						<Button id="icon-expand" onClick={()=>{
							dispatchPost({type:VIEW_POST,payload:productDetail})
						}}>
						 	View-In-Detail  &nbsp; &nbsp; <FaExpandAlt/>
						</Button>

						<Button id="icon-add" onClick={()=>
									{
										dispatchPost({type:REMOVE_POST,payload:productDetail,key:uid})
									}}>
						 	Remove From List  &nbsp; &nbsp; <IoIosRemoveCircle/>
						</Button>
						<Button id="icon-add" onClick={()=>
									{
										dispatchPost({type:UPDATE_POST,payload:productDetail,key:uid})
										history.push('/upload-post')
									}}>
						 	Update Post  &nbsp; &nbsp; 
						</Button>
					</div>
		        </Card>
	   	</Card>
		
	)
}

export default MyPost