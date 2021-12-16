import React from "react";
import Post from "./Post/Post";
import s from "./MyPosts.module.css";
import { reset } from "redux-form";
import { PostType } from "../../../types/types";
import { AddPostFormFormValuesType } from "./AddPostForm";
import AddNewPostFormRedux from "./AddPostForm";


export type MapPropsType = {
  postsData: Array<PostType>
}
export type DispatchPropsType = {
  addPost: (newPostText: string) => void
}
type PropsType = MapPropsType & DispatchPropsType

const MyPosts: React.FC<PropsType> = (props) => {
  let posts: Array<JSX.Element> = [];
  props.postsData.forEach((item, index) => {
    posts.push(<Post post={item} key={index} />);
  });

  const onAddPost = (formData: AddPostFormFormValuesType, dispatch: any) => {
    props.addPost(formData.newPostText);
    dispatch(reset("ProfileAddNewPostForm")); // сделать такое в сообщениях
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormRedux onSubmit={onAddPost} />
      <div className={s.posts}>{posts.reverse()}</div>
    </div>
  );
};

const MyPostMemorized = React.memo(MyPosts)

export default MyPostMemorized;