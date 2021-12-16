import React from "react";
import { PostType } from "../../../../types/types";
import s from './Post.module.css'

type PropsType = {
  post: PostType
}

const Post: React.FC<PropsType> = (props) => {

  return (
    <div className={s.item}>
      <img src={props.post.src}/>
      <span>{props.post.name}, {props.post.text}</span>
      <div>
        <span>{props.post.likes} likes</span>
      </div>
    </div>
  )
}

export default Post;