import React ,{useContext} from 'react'
import {Card ,Button } from 'reactstrap'
import {FaExpandAlt} from 'react-icons/fa'
import {MdCollections} from 'react-icons/md'
import './MugglesPhoto.css'
// context-api stuff
import { SET_IMAGE_TO_COLLECT, SET_IMAGE_TO_VIEW } from '../../context/action-types'
import UserContext from '../../context/UserContext'

const MugglesPhoto = ({productDetail}) => {
	const {dispatch} = useContext(UserContext)
	
	return(
	
		 <Card className="box" >
		 		<Card body className="p-0">
        			<img className="card-img" width="100%"  src={productDetail.imageURL} alt="prod_img" />
					<div className="card-footer" >
						<Button id="icon-expand" onClick={()=>{
							// dispatch({type:TOGGLE_MODAL,payload:true})
							dispatch({type:SET_IMAGE_TO_VIEW,payload:productDetail})
						}}>
						 	View-In-Detail  &nbsp; &nbsp; <FaExpandAlt/>
						</Button>

						<Button id="icon-add" onClick={()=>
									{
										// dispatch({type:TOGGLE_MODAL,payload:true})
										dispatch({type:SET_IMAGE_TO_COLLECT,payload:productDetail})
									}}>
						 	Add-To-Collection  &nbsp; &nbsp; <MdCollections/>
						</Button>
					</div>
		        </Card>
	   	</Card>
	  
	)

}


export default MugglesPhoto;