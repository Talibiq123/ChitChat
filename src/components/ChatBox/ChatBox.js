import React, { useContext, useEffect, useState } from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { toast } from 'react-toastify'

const ChatBox = () => {

  const {userData, messageId, chatUser, messages, setMessages} = useContext(AppContext);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    try {
      if (input && messageId) {
        await updateDoc((db, 'messages', messageId),{
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date(),
          })
        })

        const userIds = [chatUser.rId, userData.id];

        userIds.forEach(async (id) => {
          const userChatsRef = doc(db, 'chats', id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex((c) => c.messageId === messageId);
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData
            })
          }
        })
      }
    } catch (error) {
      toast.error(error.message);
    }
    setInput("");
  }

  useEffect((req, res) => {
    if (messageId) {
      const unSub = onSnapshot(doc(db, "messages", messageId), () => {
        setMessages(res.data().messages.reverse());
      })
      return () => {
        unSub();
      }
    }
  }, messageId)

  return chatUser?  (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="profile_image" />
        <p>{chatUser.userData.name} <img className='dot' src={assets.green_dot} alt="green dot" /></p>
        <img src={assets.help_icon} className='help' alt="help" />
      </div>

      <div className='chat-msg'>
        {
          messages.map((msg, index) => (
            <div className="s-msg">
            <p className='msg'>Lorem Ipsum is placeholder text commonly used in ...</p>
            <div>
              <img src={assets.profile_img} alt="profile pic" />
              <p>03:34 PM</p>
            </div>
            </div>
          ))
        }

        
        <div className="s-msg">
          <img className='msg-img' src={assets.pic1} alt="pic1" />
          <div>
            <img src={assets.profile_img} alt="profile pic" />
            <p>03:34 PM</p>
          </div>
        </div>
        <div className="r-msg">
          <p className='msg'>Lorem Ipsum is placeholder text commonly used in ...</p>
          <div>
            <img src={assets.profile_img} alt="profile pic" />
            <p>03:34 PM</p>
          </div>
        </div>
      </div>

      <div className='chat-input'>
        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Send a message' />
        <input type="file" id='img' accept='image/png, image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="gallery icon" />
        </label>
        <img onClick={sendMessage} src={assets.send_button} alt="send button" />
      </div>
    </div>
  ) 
  :
  <div className='chat-welcome'>
    <img src={assets.logo_icon} alt="" />
    <p>Chat Anytime and Anywhere</p>
  </div>
}

export default ChatBox
