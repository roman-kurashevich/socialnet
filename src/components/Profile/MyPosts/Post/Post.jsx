import React, { useState } from "react";
import s from './Post.module.css'

const Post = (props) => {

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