import {
	CREATE_USER,  
	SET_COLLECTIONS,
	SET_IMAGE_TO_VIEW,
	SET_IMAGE_TO_COLLECT,
	TOGGLE_MODAL,
	TOGGLE_SPINNER
} from './action-types'


 const UserReducer = (state , action)=>{
	switch (action.type) {
		case CREATE_USER:{
			return {...state, auth_detail:action.payload}
		}
					
		case SET_COLLECTIONS:{
			return {...state,collections:action.payload}				
		}		
		case SET_IMAGE_TO_COLLECT:{
			console.log("[SET_IMAGE_TO_COLLECT]")
			return {...state, imageToCollect: action.payload,modalIsOpen:true}
		}
				
		case SET_IMAGE_TO_VIEW:
			return {...state,imageToView:action.payload,modalIsOpen:true}
		
		case TOGGLE_MODAL:
			return {...state,modalIsOpen:action.payload,imageToView:null,imageToCollect:null}
		case TOGGLE_SPINNER:
			return {...state,isLoading:action.payload}
		
		default:
			return state
	}

}

export default UserReducer