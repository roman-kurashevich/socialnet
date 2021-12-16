import {connect} from "react-redux";
import {actions} from '../../../redux/profileReducer'
import { AppStateType } from "../../../redux/reduxStore";
import MyPosts, { DispatchPropsType, MapPropsType } from "./MyPosts";

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

const mapStateToProps = (state: AppStateType) => {
  return {
    postsData: state.profilePage.postsData,
  }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actions.addPost
})(MyPosts)

export default MyPostsContainer;