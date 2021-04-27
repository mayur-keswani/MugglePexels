import React , {Fragment, useContext} from 'react'
import { Button , Col, Row  } from 'reactstrap'
import { toast } from 'react-toastify'
import UserContext from '../../context/UserContext'
import {SET_IMAGE_TO_COLLECT} from '../../context/action-types'
// firebase
import firebase from 'firebase/app'


const Collection = ({uid,collection_items}) =>{
	const {user,dispatch} = useContext(UserContext)
	const {imageToCollect}= user

	const addInCollection=async(id)=>{
		console.log("[AddInCollection]")
	  // getting item from imageToCollect
		  let item=imageToCollect
		  collection_items.items.push(item)
	 	  let databaseRef = await firebase.database().ref()
		 databaseRef
		 	.child('/collections/'+id)
			.update({
				items:collection_items.items
			})
			.then(()=>{
				toast("Collection updated succcessfully",{
					type:"success"
				})
			})
			.catch(error=>{
				toast(error,{
					type:"error"
				})
			})
	
	   dispatch({type:SET_IMAGE_TO_COLLECT,payload:null})
	}

	let content=null
	
	if(collection_items.items){
		content=(collection_items.items.map(prod=>{
				  if(prod)
					return (
							<img key={prod.id}
								 src={prod.imageURL}
								 className="img-thumbnail img-fluid p-2"
								 alt={prod.id} 
								 width="220px" 
								 height="300px"/>
					)
				  else	
					return null
			 	})
		)
	}else{
		content=(<h2>No items in this collection</h2>)
	}
	return(
		<Fragment>
		
		<Row className="container-fluid m-0 p-0">	 
		  <Col lg={12} className="text-left p-0">
		  	<div className="h4 text-muted">{collection_items.name}</div> 
		  </Col>
		  <Col lg={12} className="text-left">
		  <div>	
			 <Button color="info" 
			 		 onClick={()=>
						addInCollection(uid)
			 		 } 
					 className="btn-add p-2" >
				Add Here
			</Button>
			 <span className="triangle-topright"></span>
		  </div>
		  	<div className="collection-row" >	
				{ 
					content
				}
		  </div>
		  </Col>	  
		</Row>
		</Fragment>
	)
}

export default Collection