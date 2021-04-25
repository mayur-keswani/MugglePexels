import React, { Fragment, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {Card, CardText, CardBody, CardLink,CardTitle, CardSubtitle, Button} from 'reactstrap';
import UserContext from '../../context/UserContext';
import { TOGGLE_MODAL } from '../../context/action-types';
import firebase from 'firebase/app'

const DeletingPost = () =>{
	const {myPosts , dispatchPost} = useContext(UserContext);
	const {postToDelete , deletingPostKey} = myPosts
	const history = useHistory();

	const deletePostHandler = async() =>{
		let databaseRef= await firebase.database().ref()
		databaseRef.child('/posts/'+ deletingPostKey)
					.remove()
					.then(result=>{
						toast("Post Deleted Successfully" ,{
							type:"success"
						})
						dispatchPost({type:TOGGLE_MODAL,payload:false})
						history.push('/my-uploads')
					})
					.catch(error=>{
						toast("Error in Deleting Post :(",{
							type:"error"
						})
					})
	}
	return(
		<Fragment>
		<div className="container-fluid">
			<Card>
        		<CardBody>
          			<CardTitle className="h3 text-danger">Are you sure!, you wanna delete this post? 
					  	<span className="d-block h6 text-muted text-info">#{deletingPostKey}</span>
					</CardTitle>
					
          			<CardSubtitle className="h6 mb-2 text-muted">once deleted , won't be recovered</CardSubtitle>
        		</CardBody>
        		<img width="50%" className="mx-auto img-thumbnail" src={postToDelete.imageURL} alt="Card image cap" />
        		<CardBody>
         			<CardText>{postToDelete.description}</CardText>
         			<Button outline color="danger"
					 		className="m-2"
					 		onClick={deletePostHandler}>
							YES! Delete Post
					</Button>
          			<Button color="info" 
					  		onClick={()=> dispatchPost({type:TOGGLE_MODAL,payload:false})}>
							No! Go Back
					</Button>
        		</CardBody>
      		</Card>
		</div>
		</Fragment>
	)
}

export default DeletingPost