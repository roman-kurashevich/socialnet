import profileReducer, {addPostActionCreator, deletePost} from "./profileReducer";
import React from 'react'


it('length of posts should be incremented', () => {
  //1.Test data
  let action = addPostActionCreator("it-kamasutra!!")
  let state = {
    postsData: [
      {id: 1, name: 'Roma1', text: 'blabla1', likes: 4, src: 'https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-1.jpg'},
      {id: 2, name: 'Roma2', text: 'blabla2', likes: 34, src: 'https://klike.net/uploads/posts/2019-03/1551511801_1.jpg'},
      {id: 3, name: 'Roma3', text: 'blabla3', likes: 2, src: 'https://download-cs.net/steam/avatars/3408.jpg'},
    ]
  }
  //2. action
  let newState = profileReducer(state, action);

  //3.expectation
  expect(newState.postsData.length).toBe(4)
  
});

it('new message should be correct', () => {
  //1.Test data
  let action = addPostActionCreator("it-kamasutra!!")
  let state = {
    postsData: [
      {id: 1, name: 'Roma1', text: 'blabla1', likes: 4, src: 'https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-1.jpg'},
      {id: 2, name: 'Roma2', text: 'blabla2', likes: 34, src: 'https://klike.net/uploads/posts/2019-03/1551511801_1.jpg'},
      {id: 3, name: 'Roma3', text: 'blabla3', likes: 2, src: 'https://download-cs.net/steam/avatars/3408.jpg'},
    ]
  }
  //2. action
  let newState = profileReducer(state, action);

  //3.expectation
  expect(newState.postsData[3].text).toBe("it-kamasutra!!")
  
});

it('after deleting length of message should be decrement', () => {
  //1.Test data
  let action = deletePost(1)
  let state = {
    postsData: [
      {id: 1, name: 'Roma1', text: 'blabla1', likes: 4, src: 'https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-1.jpg'},
      {id: 2, name: 'Roma2', text: 'blabla2', likes: 34, src: 'https://klike.net/uploads/posts/2019-03/1551511801_1.jpg'},
      {id: 3, name: 'Roma3', text: 'blabla3', likes: 2, src: 'https://download-cs.net/steam/avatars/3408.jpg'},
    ]
  }
  //2. action
  let newState = profileReducer(state, action);

  //3.expectation
  expect(newState.postsData.length).toBe(2)
  
});

it('after deleting length of message should not be decrement if id is incorrect', () => {
  //1.Test data
  let action = deletePost(1000)
  let state = {
    postsData: [
      {id: 1, name: 'Roma1', text: 'blabla1', likes: 4, src: 'https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-1.jpg'},
      {id: 2, name: 'Roma2', text: 'blabla2', likes: 34, src: 'https://klike.net/uploads/posts/2019-03/1551511801_1.jpg'},
      {id: 3, name: 'Roma3', text: 'blabla3', likes: 2, src: 'https://download-cs.net/steam/avatars/3408.jpg'},
    ]
  }
  //2. action
  let newState = profileReducer(state, action);

  //3.expectation
  expect(newState.postsData.length).toBe(3)
  
});
