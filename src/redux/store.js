import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";

export let store = {
  
  _subscriber() {
    console.log('state changed')
  },

  _state: {
    sideBar: {
      friendsData: [
        {id: 1, name: 'Jordan', avatarSrc: 'https://biografii.net/wp-content/uploads/2018/09/2YF1WyzQjyLS_maikl-dzhordan.jpg'},
        {id: 2, name: 'Cury', avatarSrc: 'https://www.gannett-cdn.com/-mm-/3cc04d2ef14fa91700469abb79ac5856f7d99ffa/c=0-119-2025-1263/local/-/media/2016/03/14/USATODAY/USATODAY/635935568094311208-USATSI-8611213.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp'},
        {id: 3, name: 'Chester', avatarSrc: 'https://www.vokrug.tv/pic/person/d/3/0/1/d301933ae0b63ca71848e5025b6be224.jpg'},
      ]
    },
    profilePage: {
      postsData: [
        {id: 1, name: 'Roma1', text: 'blabla1', likes: 4, src: 'https://trashbox.ru/ifiles/220798_004e6a_img_20140503_122504.jpg_min1/avatarki.-1.jpg'},
        {id: 2, name: 'Roma2', text: 'blabla2', likes: 34, src: 'https://klike.net/uploads/posts/2019-03/1551511801_1.jpg'},
        {id: 3, name: 'Roma3', text: 'blabla3', likes: 2, src: 'https://download-cs.net/steam/avatars/3408.jpg'},
      ],
      newPostText: ''
    },
    messagesPage: {
      dialogsData: [
        {id: 1, name: 'Jordan', avatarSrc: 'https://biografii.net/wp-content/uploads/2018/09/2YF1WyzQjyLS_maikl-dzhordan.jpg'},
        {id: 2, name: 'Cury', avatarSrc: 'https://www.gannett-cdn.com/-mm-/3cc04d2ef14fa91700469abb79ac5856f7d99ffa/c=0-119-2025-1263/local/-/media/2016/03/14/USATODAY/USATODAY/635935568094311208-USATSI-8611213.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp'},
        {id: 3, name: 'Chester', avatarSrc: 'https://www.vokrug.tv/pic/person/d/3/0/1/d301933ae0b63ca71848e5025b6be224.jpg'},
        {id: 4, name: 'Moby', avatarSrc: 'https://img.discogs.com/h2gOyyLcsRAUu06CGpU4zHWL_nI=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-1031-1500201712-1208.jpeg.jpg'},
        {id: 5, name: 'Fred', avatarSrc: 'https://pbs.twimg.com/profile_images/1271530504827875331/3Ka8BTK6.jpg'},
      ],
      messagesData: [
        {id: 1, author: "me", likesCount: 5, message: 'Hi'},
        {id: 2, author: "friend", likesCount: 12, message: 'Hello'},
        {id: 3, author: "me", likesCount: 4, message: 'Whatsup?'},
        {id: 4, author: "friend", likesCount: 41, message: 'Fine'},
        {id: 5, author: "me", likesCount: 0, message: 'Ok'},
      ],
      newMessageText: '',
    }
  },

  getState() {
    return this._state;
  },

  subscribe(observable) {
    this._subscriber = observable;
  },

  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
    this._state.sideBar = sidebarReducer(this._state.sideBar, action);

    this._subscriber(this._state);
  },
}

export default store;




