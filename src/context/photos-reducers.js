import { SET_PHOTOS ,
		 UPDATE_POST ,
		 TOGGLE_SPINNER, 
		 VIEW_POST , 
		 REMOVE_POST , 
		 TOGGLE_MODAL
		} from './action-types'

 const PostReducer = (state , action) =>{
	switch (action.type) {
		case SET_PHOTOS:
			{
				return {...state,posts:action.payload}
			}
		case VIEW_POST:{
				return {...state , postToView:action.payload , isModalOpen:true}  
		}	
		
		case UPDATE_POST:
				return {...state , updatePost : action.payload , updatePostKey:action.key}

		case REMOVE_POST:
				return {...state ,
						postToDelete : action.payload , 
						deletingPostKey:action.key,
						postToView:null,
						isModalOpen:true }

		case TOGGLE_SPINNER:
				return {...state,isLoading:action.payload}

		case TOGGLE_MODAL:
					return {...state,isModalOpen:action.payload,postToView:null,postToDelete:null}
		default:
			return state;
	}
}

export default PostReducer