import React, { Fragment, useContext } from 'react'
import CollectionItem from './CollectionItem.js'
import {Button, Row , Col} from 'reactstrap'	
import './Collection.css'
// context-api stuff
import UserContext from '../../context/UserContext.js'
import {CREATE_COLLECTION} from '../../context/action-types'


const Collection = () =>{

	const {user , dispatch} =useContext(UserContext)
	const {collections} = user
	let collectionRowItems;	
	console.log("[collection]")
	if(Object.keys(collections).length>0){
			collectionRowItems=Object.entries(collections).map(([key,value])=>
				 <CollectionItem 
				 	key={key}
					uid={key}
					collection_items={ value }/>
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
					<Button color="success" onClick={()=>dispatch({type:CREATE_COLLECTION})}>Create New-Collection
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

export default React.memo(Collection)