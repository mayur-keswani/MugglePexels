import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Card , CardBody , CardImg , CardTitle , CardText , Button, Row , Col} from 'reactstrap'
import UserContext from '../../context/UserContext';


const ImageDetail = () =>{
	const {user, myPosts}=useContext(UserContext);
	const {imageToView} =user
	const {postToView} = myPosts 
	const [imageDetails,setImageDetails]=useState(null)

	useEffect(()=>{
		if(imageToView)
			setImageDetails(imageToView)
		else
			setImageDetails(postToView)
	},[])

	var downloadImage = async (uri)=>{
			console.log(uri)
			const {data}=await axios.get(uri,{
				responseType:"blob"
			})
			console.log(data)
			const url=window.URL.createObjectURL(new Blob([data]))
			const link=document.createElement('a')
			link.href=url
			link.setAttribute('download','image.jpeg');
			document.body.appendChild(link)
			link.click()
	  };
	return(
		<Fragment>
			
			{
				
				(imageDetails)?
				<>
				<Row className="w-100 m-0 p-0">
					<Col lg={4} className="offset-lg-8 text-center ">
					<div id="btn-download" className="float-right">
					 <Button outline color="light" size="md"
					 	className="text-dark" 
						onClick={()=>
						downloadImage(imageDetails.imageURL)}>
							Download
			  	 	 </Button>
					</div>
					</Col>
				</Row>
			
				<Card  className="card-imgDetail" >
        			<CardImg top width="80%"  className="img-thumbnail img-fluid"  src={imageDetails.imageURL} 
						alt="Card-image cap" />
        			<CardBody>
          				<CardTitle className="h5 text-muted">{`ID: ${imageDetails.id}`}</CardTitle>
          				<CardText>{imageDetails.description}</CardText>
          				<CardText>
            				<small className="text-muted">Image By: {imageDetails.artist}</small>
          				</CardText>
       				</CardBody>
     			</Card>
				
				 </>:<Card>
					 <CardBody>Sorry!, No post-selected :(</CardBody>
				 </Card>
				
			}
			
		</Fragment>
	)
}

export default ImageDetail