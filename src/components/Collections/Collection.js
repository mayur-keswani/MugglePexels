import React , {Fragment, useContext} from 'react'
import { Button , Row  } from 'reactstrap'
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
	
	console.log("[collectionItem]")
	if(typeof collection_items.items.length !== typeof undefined){
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
		<Row>	 
		  <div>
		 	<label>{collection_items.name}</label> 
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
		</Row>
		</Fragment>
	)
}

export default Collection