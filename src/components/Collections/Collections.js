import React, { Fragment, useContext , useEffect, useState} from 'react'
import Collection from './Collection.js'
import {Button,Row,Col,FormGroup,Label,Input} from 'reactstrap'	
import { v4 } from 'uuid'
import { toast } from 'react-toastify'
import './Collections.css'
// context-api stuff
import UserContext from '../../context/UserContext.js'
import {SET_IMAGE_TO_COLLECT , TOGGLE_SPINNER , SET_COLLECTIONS, TOGGLE_MODAL } from '../../context/action-types'
// firebase, 
import firebase from 'firebase/app'

const Collections = () =>{

	const {user , dispatch} =useContext(UserContext)
	const {auth_detail,collections,imageToCollect} = user;
	const [isNewCollection,setNewCollection] = useState(false)
	const [collectionName,setCollectionName] = useState("")

	const syncCollection=async()=>{
		let collectionRef=await firebase.database().ref().child('/collections')  
		  dispatch({type:TOGGLE_SPINNER,payload:true})
		  collectionRef
			  .orderByChild("userID")
			  .equalTo(user.auth_detail.uid.toString())
			  .on("value",(snapshot)=>{
				  console.log(snapshot.val())
				  dispatch({type:SET_COLLECTIONS,payload:snapshot.val()})
			  })
		  dispatch({type:TOGGLE_SPINNER,payload:false})
	  }

	useEffect(()=>{
		if(user.auth_detail){
		  syncCollection()
		}
	  },[])
	
	const createCollection= async(name) => {
		if(!auth_detail){
			toast("Please Login 🙏",{
				type:"info"
			})
			dispatch({type:TOGGLE_MODAL,payload:false})
		}else{
		// fetching items from imgToCollect
		const item=imageToCollect
		let  newId=v4();	//generating unique id from new-collection object
		let object;		// Storing item into object
		if(item){
		   object={userID:auth_detail.uid.toString(), name:name,items:[{...item}] }
		}else{
			object={userID:auth_detail.uid.toString(), name:name,items:[] }
		}
		
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
		 setNewCollection(false)
		}
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
			{
				isNewCollection
					?
					( 
					<div className="collection-form" className="p-0 m-0">
						<div className="h3 text-primary">Enter New-Collection Details</div>
						<FormGroup>
       			 			<Label >Name </Label>
        					<Input type="text" name="name" 
								value={collectionName}
								onChange={(e)=>setCollectionName(e.target.value)}
								placeholder="eg: nature,phtoshoot, funny ..." />
      					</FormGroup>
						<Button color="info" size="lg" onClick={()=> createCollection(collectionName)}>Create!</Button>
					</div>
					)
					:
					(
					 <div id="collection-section" className="p-0 m-0">
			 			<Row>
							<Col sm={4} >
								<div className="collection-header p-1">
									<h4>Save to Collection</h4>
								</div>
							</Col>
							<Col sm={4} className="text-right offset-sm-4" >
								<Button color="success" onClick={()=>setNewCollection(true)}>Create New-Collection
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
					)
			}
		
		</Fragment>
	)
}

export default React.memo(Collections)