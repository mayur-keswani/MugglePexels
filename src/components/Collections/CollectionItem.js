import React , {Fragment, useContext} from 'react'
import { Button , Row  } from 'reactstrap'
import UserContext from '../../context/UserContext'
import {ADD_INTO_COLLECTION} from '../../context/action-types'
// import {IoIosRemoveCircle} from 'react-icons/io'

const CollectionItem = ({uid,collection_items}) =>{

	let content=null
	const {dispatch} = useContext(UserContext)

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
			}))
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
						 dispatch({type:ADD_INTO_COLLECTION,payload:uid})
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

export default CollectionItem