import React from "react";
import {connect} from "react-redux";
import {addPostActionCreator} from '../../../redux/profileReducer'
import MyPosts from "./MyPosts";

// const MyPostsContainer = () => {
  
//   return (
//     <StoreContext.Consumer> 
//     { (store) => {
        
//         let addPost = () => {
//           let action = addPostActionCreator();
//           store.dispatch(action);
//         }
      
//         let onPostChange = (text) => {
//           let action = updateNewPostTextActionCreator(text);
//           store.dispatch(action);
//         }
        
//         return (
//           <MyPosts 
//               updateNewPostText = {onPostChange} 
//               addPost={addPost} 
//               postsData={store.getState().profilePage.postsData} 
//               newPostText={store.getState().profilePage.newPostText}
//           />
//         )
//       }
//     }
//     </StoreContext.Consumer>
//   ) 
// }

const mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      dispatch(addPostActionCreator(newPostText));
    },
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;