import React, { useEffect, useState } from "react";


export type ChatMessageType = { 
  message: string
  photo: string
  userId: number
  userName: string
}

const ChatPage: React.FC = () => {
  return <div>
    < Chat />
  </div>
}

const Chat: React.FC = () => {

  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
  
  useEffect(() => {  
    let ws: WebSocket;
    const closeHandler = () => {
      debugger
      console.log('CLOSE WS')
      setTimeout(createChannel, 3000)
    }

    function createChannel() {
      
      ws?.removeEventListener('close', closeHandler)
      ws?.close()
      
      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws.addEventListener('close', closeHandler)
      setWsChannel(ws)
    } 
    createChannel()

    return () => {
      ws.removeEventListener('close', closeHandler)
      ws.close()
    }
  }, [])

  return <div>
    <Messages wsChannel={wsChannel}/>
    <AddMessageForm wsChannel={wsChannel}/>
  </div>
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])

  useEffect(() => {
    let messageHandler = (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data)
      setMessages((prevMessages) => [...prevMessages, ...newMessages])
    }

    wsChannel?.addEventListener('message', messageHandler)

    return () => {
      wsChannel?.removeEventListener('message', messageHandler)
    }
  }, [wsChannel])

  return <div style={{height: '500px', overflowY: 'auto'}} >
    { messages.map((m, index) => <Message message={m} key={index}/>) }
  </div>
}
const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

  useEffect( () => {
    let openHandler = () => {
      setReadyStatus('ready')
    }
    wsChannel?.addEventListener('open', openHandler)
    return () => {
      wsChannel?.removeEventListener('open', openHandler)
    }
  }, [wsChannel])

  const sendMessage = () => {
    if (!message) {
      return
    }
    wsChannel?.send(message)
    setMessage('')
  }
  return <div>
    <div>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
    </div>
    <div>
      <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
    </div>
  </div>
}


const Message: React.FC<{message: ChatMessageType}> = ({message}) => {

  return <div>
    <img src={message.photo} style={{width: '40px', height: '40px', borderRadius: '50%'}}/> <b>{message.userName}:</b>
    <br/>
    {message.message}
  </div>
}

export default ChatPage;