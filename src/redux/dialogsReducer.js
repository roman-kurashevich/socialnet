const SEND_MESSAGE = 'dialogsReducer/SEND-MESSAGE';

let initialState = {
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
}

const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
   
    case SEND_MESSAGE: 

      return {
        ...state,
        messagesData: [...state.messagesData, {
          id: 5,
          author: 'me',
          likesCount: 0,
          message: action.newMessageBody
        }]
      }
     
    default:
      return state;
  }
}

export const sendMessageActionCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;