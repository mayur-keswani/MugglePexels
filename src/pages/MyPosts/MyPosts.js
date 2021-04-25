import React, { Fragment, useContext , useEffect } from 'react'
import './MyPosts.css'
import {FaUpload} from 'react-icons/fa'
//context-api stuff
import MyPost from '../../components/MyPost/MyPost'
import UserContext from '../../context/UserContext'
import { Link } from 'react-router-dom'
import { SET_PHOTOS } from '../../context/action-types'

import firebase from 'firebase/app'

const MyPosts = () =>{
	const {myPosts , dispatchPost} = useContext(UserContext)
	const {posts} = myPosts
	
	const syncPosts = async() =>{
		let databaseRef=await firebase.database().ref('/posts')
		databaseRef.on('value',(snapshot)=>{
			dispatchPost({
			type:SET_PHOTOS,
			payload:snapshot.val()
		  })
		})
	  }
	  useEffect(()=>{
		syncPosts();
	  },[])

	return(
		<Fragment>
		  <div className="container">
			{
				posts?
					Object.entries(posts).map(([key,value])=>{
						return <MyPost 
									key={key}
									uid={key} 
									productDetail={value}/>
						})
					:
					null
					
			}
		  </div>
		  <Link to="/upload-post"><button id="upload-posts"
		  	className="h1 tooltip-big"
			data-toggle="tooltip" 
			data-container="body" 
			data-placement="right" 
			title="Click Here TO UPLOAD!">	
				<FaUpload/>
		  </button>
		  </Link>
		</Fragment>
	)
}

export default MyPosts