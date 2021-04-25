import React, { Fragment } from 'react'
import './Logo.css'
import logo from './muggle_pexels.jpg'
const Logo=(props)=> {
	return(
		<Fragment>
			<img src={logo} 
				className="rounded m-1" 
				alt="MugglePexels" id="MugglePexels_Logo" 
				height={props.height}></img>
		</Fragment>
	)
}

export default Logo