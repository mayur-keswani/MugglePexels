import React, { Fragment, useEffect, useReducer, useState } from 'react' 
// css/styling components
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import 'bootstrap/dist/css/bootstrap.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// react functional component
import MugglesPhotos from './pages/MugglesPhotos/MugglesPhotos';
import Header from './components/UI/Header/Header';
import Collection from './components/Collections/Collection';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import ModalWrapper from './components/UI/ModalWrapper/ModalWrapper';
import ImageDetail from './components/Image_Details/ImageDetail';
import NavTabs from './components/UI/Header/NavTabs/NavTabs';
import MyPosts from './pages/MyPosts/MyPosts'
import UploadPost from './pages/UploadPost/UploadPost';

import { BrowserRouter, Route, Switch } from 'react-router-dom';


import UserContext from './context/UserContext'
import UserReducer from './context/user-reducer'
import PostReducer from './context/photos-reducers';


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
import {firebaseConfig} from './config/configs';
import { CREATE_USER } from './context/action-types';
import DeletingPost from './components/ConfirmPostDeletion/DeletingPost';

firebase.initializeApp(firebaseConfig)

const user_initialState={     /* For Authentication and storing ref of collection */
    auth_detail:null,
    collections:{},
    imageToCollect:null,
    imageToView:null,
    modalIsOpen:false         
}


const post_initialState={   /* For User Personal Uploads */
  posts:{},
  postToView:{},
  postToDelete:{},
  deletingPostKey:null,
  updatePost:null,
  updatePostKey:null,
  isModalOpen:false ,
  isLoading:false,
}

const App = () => {
 
  const [ user , dispatch] = useReducer(UserReducer ,user_initialState)     
  const [ myPosts , dispatchPost] = useReducer(PostReducer,post_initialState)                 
  const [ criterion , setCriterion]=useState("products");
  
  useEffect(()=>{

    JSON.parse(localStorage.getItem('user'))
    dispatch({type:CREATE_USER,payload:user})
  },[])


  const ModalBodyHandler = (view_post,delete_post) =>{
    if(view_post){
      return <ImageDetail/>
    }
    if(delete_post){
      return <DeletingPost/>
    }
    
  }
  
  return (
   <Fragment>
      <BrowserRouter>
          <ToastContainer/>
          <UserContext.Provider 
              value={{
                  user:user,
                  dispatch:dispatch,
                  myPosts:myPosts,
                  dispatchPost:dispatchPost
                }}>

              <Switch>
                  <Route path="/signup" exact render={()=>
                    <>
                      <Signup/>
                    </>
                  }>  
                  </Route>
                  <Route path="/signin" exact render={()=>
                    <>
                      <Login/>
                    </>
                  }>  
                  </Route>
                  <Route path="/" exact render={()=>
                    <>
                     
                      <Header setCriterion={(value)=>setCriterion(value)} />

                      <MugglesPhotos searchedProduct={criterion}/>

                      <ModalWrapper>
                        {
                          user.imageToView?
                           <ImageDetail/>:
                           <Collection />
                        }    
                      </ModalWrapper>
                    </>
                  }>  
                  </Route>
                  <Route path="/my-uploads" exact render={()=>
                    <>
                      <NavTabs/>
                      <MyPosts/>
                     
                      {
                       
                        <ModalWrapper>
                          {
                            ModalBodyHandler(myPosts.postToView,myPosts.postToDelete)
                          }        
                        </ModalWrapper>
                      }
                        
                      
                    </>
                  }>
                  </Route>

                  <Route path="/upload-post" exact render={()=>
                    <>
                      <UploadPost/>
                    </>
                  }>
                  </Route>
              </Switch>
                
             
                
          </UserContext.Provider>
      </BrowserRouter>

       

   </Fragment>
  );
}

export default App;
