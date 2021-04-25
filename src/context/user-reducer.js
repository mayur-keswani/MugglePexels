import {
	CREATE_USER,  
	CREATE_COLLECTION,
	ADD_INTO_COLLECTION,
	SET_IMAGE_TO_VIEW,
	SET_IMAGE_TO_COLLECT,
	TOGGLE_MODAL
} from './action-types'
// some dependencies
// import { createCollection } from './globalState'
import { v4 } from 'uuid';

const createCollection=(state)=>{
    // fetching items from imgToCollect
	console.log("[CreateCollection]")
    const item=state["imageToCollect"];
    //generating unique id from new-collection object
    let  newId=v4().toString();
    // Storing item into object
    let object;
    if(item){
       object={ name:"",items:[{...item}] }
	  

		console.log(state["collections"])
    }else{
		object={ name:"",items:[] }
	}
	 let newCollections={...state["collections"]}
	 newCollections[newId]=object; 
	 state["collections"]={...newCollections} 
    // Creating copy of prev. collections
     state["imageToCollect"]=null;
	 return {...state}
  }


  const addInCollection=(state , id)=>{
	  console.log("[AddInCollection]")
    // getting item from imageToCollect
	if(state["imageToCollect"]){
		let item=state["imageToCollect"]
    
    // creating copy of collections
    	const collections_Copy={...state["collections"]}
    	const selected_collection={...collections_Copy[id]}

    // push new item into collections->items array
    	selected_collection.items.push(item);
    	collections_Copy[id]=selected_collection

    state["collections"]={...collections_Copy}
	}
	state["imageToCollect"]=null
	return {...state}
  }


 const UserReducer = (state , action)=>{
	switch (action.type) {
		case CREATE_USER:{
			return {...state, auth_detail:action.payload}
		}
					
		case CREATE_COLLECTION:{
			return createCollection(state)				
		}		
		case ADD_INTO_COLLECTION:{
			return addInCollection(state,action.payload)
		}

		case SET_IMAGE_TO_COLLECT:{
			console.log("[SET_IMAGE_TO_COLLECT]")
			return {...state, imageToCollect: action.payload,modalIsOpen:true}
		}
				
		case SET_IMAGE_TO_VIEW:
			return {...state,imageToView:action.payload,modalIsOpen:true}
		
		case TOGGLE_MODAL:
			return {...state,modalIsOpen:action.payload,imageToView:null,imageToCollect:null}
		
		default:
			return state
	}

}

export default UserReducer