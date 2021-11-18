import React from "react";
import Post from "./Post/Post";
import s from './MyPosts.module.css';
import { Field, reduxForm, reset } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const MyPosts = React.memo((props) => {

  console.log('RENDEAR YOOO')
  let posts = [];
  props.postsData.forEach((item, index) => {
    posts.push(
      <Post post={item} key={index}/>
    )
  })
  
  const onAddPost = (formData, dispatch) => {
    props.addPost(formData.newPostText);
    dispatch(reset("ProfileAddNewPostForm"))
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost}/>
      <div className={s.posts}>
        {posts.reverse()}
      </div>
    </div>
  )
})

const maxLength10 = maxLengthCreator(10);

let PostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field 
          component={Textarea} 
          name={'newPostText'} 
          placeholder="What's new?"
          validate={[required, maxLength10]}
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>

  )
}

const AddNewPostFormRedux = reduxForm({
  form: 'ProfileAddNewPostForm'
})(PostForm)

export default MyPosts;