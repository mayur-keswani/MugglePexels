import React, { Fragment, useContext } from 'react'
import Collection from './Collection.js'
import {Button, Row , Col} from 'reactstrap'	
import { v4 } from 'uuid'
import './Collections.css'
// context-api stuff
import UserContext from '../../context/UserContext.js'
import {SET_IMAGE_TO_COLLECT} from '../../context/action-types'
// firebase
import firebase from 'firebase/app'
import { toast } from 'react-toastify'
const Collections = () =>{

	const {user , dispatch} =useContext(UserContext)
	const {collections,imageToCollect} = user

	const createCollection= async() => {
		// fetching items from imgToCollect
		console.log("[CreateCollection]")
		const item=imageToCollect
		//generating unique id from new-collection object
		let  newId=v4();
		// Storing item into object
		let object;
		if(item){
		   object={ name:"",items:[{...item}] }
		}else{
			object={ name:"",items:[] }
		}
		//
		let databaseRef=await firebase.database().ref()
		databaseRef
			.child('/collections/'+newId)
			.set(object)
			.then(()=>{
				toast("Collection created succcessfully",{
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
	
	

	let collectionRowItems;	
	console.log("[collection]")
	if(collections){
			collectionRowItems=Object.entries(collections).map(([key,value])=>
				 <Collection 
				 	key={key}
					uid={key}
					collection_items={ value }
				 />
			)	
	}else{
			collectionRowItems=(<p>You have no collection saved!</p>)
	}

	return(
		<Fragment>
			<div id="collection-section" className="p-0 m-0">
			 <Row>
				<Col sm={4} >
					<div className="collection-header p-1">
						<h4>Save to Collection</h4>
					</div>
				</Col>
				<Col sm={4} className="text-right offset-sm-4" >
					<Button color="success" onClick={createCollection}>Create New-Collection
					</Button>
				</Col>
			 </Row>
			 <Row>
				<Col>
				 <div className="collection-body p-5">			  	
					 {collectionRowItems}	
				 </div>
				</Col>
			 </Row>	
				
			</div>
			
		</Fragment>
	)
}

export default React.memo(Collections)