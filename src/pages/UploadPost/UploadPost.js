import React, { Fragment, useContext, useEffect , useRef, useState} from 'react'
import './UploadPost.css'
import {Row, Col, Spinner , Button} from 'reactstrap'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import { toast } from 'react-toastify'
import { v4 } from 'uuid'

import UserContext from '../../context/UserContext'

import {imageResizerConfig} from '../../config/configs'
 import { readAndCompressImage } from 'browser-image-resizer';
import firebase from 'firebase/app'
import { useHistory } from 'react-router'
import { TOGGLE_SPINNER, UPDATE_POST } from '../../context/action-types'


const UploadPost = () =>{
	let inputFileElement = useRef();

	const history = useHistory()
	
	const { user ,myPosts , dispatchPost } = useContext(UserContext)
	const { updatePost , updatePostKey , isLoading } = myPosts
	const {auth_detail} = user

	const [imageURL,setImageURL] = useState("https://i.stack.imgur.com/tDPMH.png");
	const [heading,setHeading] = useState("")
	const [criterion,setCriterion]=useState("")
	const [description,setDescription] = useState("");
	const [isPostUpdating,setUpdatePost] =useState(false)

	useEffect(()=>{
		if(!auth_detail){
			toast("Please Login 🙏",{
				type:"info"
			})
			history.replace('/')
		}
		if(updatePost){
			setImageURL(updatePost.imageURL)
			setHeading(updatePost.heading)
			setCriterion(updatePost.criterion)
			setDescription(updatePost.description)
			setUpdatePost(true)
		}
	},[])

	const defaultBtnActive = () =>{
		inputFileElement.current.click();
	}
	const imageUploadHandler = async(e) =>{
		let file=e.target.files[0];
		let metaData = {
			contentType:file.type
		}
		let resizedImage= await readAndCompressImage(file,imageResizerConfig)
		let storageRef=await firebase.storage().ref()
		var uploadTask= storageRef
						.child('/posts/'+file.name)
						.put(resizedImage,metaData);

		uploadTask.on("state_changed",(snapshot)=>{
				dispatchPost({type:TOGGLE_SPINNER,payload:true})

				let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
				switch(snapshot.state){
					case firebase.storage.TaskState.PAUSED:
						dispatchPost({type:TOGGLE_SPINNER,payload:false})
						console.log('Upload is paused');
						break;

					case firebase.storage.TaskState.RUNNING: // or 'running'
						console.log('Upload is running');
						break;
					default:
						break;
					
				}
				if(progress===100){
					dispatchPost({type:TOGGLE_SPINNER,payload:false})
					console.log("PROGRESS = 100% :)");
				}
			},
			(error)=>{
				toast(error,{
					type:"error"
				})		
			},
			() => {
					toast("Sucessfully Image Uploaded",{
						type:"success"
					})
					uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
				  	console.log('File available at', downloadURL);
					setImageURL(downloadURL)
				});
			  })
	}

	const createPost=async()=>{
		let post = {
			userID:auth_detail.uid,
			id: v4(),
			imageURL:imageURL,
			heading:heading,
			criterion:criterion,
			description: description,
			artist:"Yourself",
			date:Date.now()
		}
		
		try{
			 firebase
			.database()
			.ref()
			.child('/posts/'+v4())
			.set(post);

		}catch(error){
			toast("Something got wrong :(",{
				type:"error"
			})
		}
	}

	const updatePostHandler=()=>{
		let post = {
			userID:auth_detail.uid,
			id:updatePostKey,
			imageURL:imageURL,
			heading:heading,
			criterion:criterion,
			description: description,
			artist:"Yourself",
			date:Date.now()
		}
		try{
			firebase.database().ref(`/posts/`+updatePostKey).set(post)
			.then(success=>{
				toast("Post Updated Successfully :)",{type:success})
			})
			.catch(error=>{
				console.log(error)
			})
		}catch(error){
			toast("Something Went Wrong :(",{
				type:"error"
			})
		}		
	}

	const submitFormHandler = (e) =>{
		e.preventDefault();

		isPostUpdating?updatePostHandler():createPost()
		
		dispatchPost({
			type:UPDATE_POST,
			payload:null,
			key:null
		})
		history.push('my-uploads')
	}

	return(
			<Fragment>
				
					<div className="details-zone" >
						<Row className="text-center">
						 <Col lg={{ size: 4, offset: 2 }} md={{ size: 6, offset: 3 }} sm="12" 
							className="d-flex align-items-center justify-content-center">
							 <div className="h2">
								 <h1 >Enter Post Details
								 </h1>
							 </div>
						 </Col>
						 <Col  lg={{ size: 4, offset: 0 }} md={{ size: 6, offset: 3 }} sm="12">	
							  <div className="form-group mt-2">
								  <label >Criterion</label>
								  <select className="form-control" 
								  		name="criterion" 
								  		value={criterion} 
										onChange={(e)=>setCriterion(e.target.value)} >
									<option value="Personal">Personal</option>
									<option value="Family">Family</option>
									<option value="friends">Friends</option>
									<option value="Academics">Academics</option>
									<option value="Office">Office</option>
									<option value="Festival">Festival</option>
								 </select>
							  </div>
	
							  <div className="form-group">
								  <label >Post Title</label>
								 <input type="text" className="form-control"  
									 id="exampleForm" 			  		
									 placeholder="Post Heading ..."
									 value={heading}
									onChange={(e)=>setHeading(e.target.value)}
								 />
							  </div>
							  
				
							  <div className="form-group">
								  <label >Description</label>
								  <textarea className="form-control" 
								  name="description" rows="3"
								  style={{resize:"none"}}
								  value={description} 
								  onChange={(e)=>setDescription(e.target.value)}>
				
								</textarea>
							  </div>
	
							  <div className="image-preview" >	
								<div className="wrapper" >
								 {
									isLoading?
										<Spinner/>
										:
										<div className="image">
											<img alt="post_image" 
										  		 src={imageURL} 
										  		 width="100%" />
									   </div>
								 }
								  
							    </div>		
						     </div>

							 <button type="file" 
									name="myupload" 
									onClick={()=>defaultBtnActive()} 
									id="custom-btn">Choose a Picture
							</button>
							<input id="default-btn" type="file" 
								name="myupload"  
								hidden 
								ref={inputFileElement}
								onChange={(event)=>imageUploadHandler(event)}/>
	
							<div>	
								<Button type="submit" 
										outline
										color="success"
										size="lg"
										className="px-5"
										onClick={submitFormHandler}>
							
									{isPostUpdating?"Update Post"
												:" Upload Post "} <AiOutlineCloudUpload/>
								</Button>
							</div>
						</Col>
						
					   </Row>
					</div>
					   
					

			</Fragment>
	)
}

export default UploadPost