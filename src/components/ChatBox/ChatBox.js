import React, { useContext, useEffect, useState } from "react";
import "./ChatBox.css";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import { upload } from "@testing-library/user-event/dist/upload";

const ChatBox = () => {
  const { userData, messageId, chatUser, messages, setMessages, chatVisible, setChatVisible } =
    useContext(AppContext);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    try {
      if (input && messageId) {
        await updateDoc((db, "messages", messageId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date(),
          }),
        });

        const userIds = [chatUser.rId, userData.id];

        userIds.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messageId
            );
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
    setInput("");
  };

  const sendImage = async (e) => {
    try {
      const fileURL = await upload(e.target.files[0]);

      if (fileURL && messageId) {
        await updateDoc((db, "messages", messageId), {
          messages: arrayUnion({
            sId: userData.id,
            image: fileURL,
            createdAt: new Date(),
          }),
        });

        const userIds = [chatUser.rId, userData.id];

        userIds.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messageId
            );
            userChatData.chatsData[chatIndex].lastMessage = "Image";
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const convertTimeStamp = (timestamp) => {
    let date = timestamp.toDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    if (hours > 12) {
      return hours - 12 + ":" + minutes + "PM";
    } else {
      return hours + ":" + minutes + "AM";
    }
  };

  useEffect(() => {
    if (messageId) {
      const unSub = onSnapshot(doc(db, "messages", messageId), (res) => {
        setMessages(res.data().messages.reverse());
      });
      return () => {
        unSub();
      };
    }
  }, [messageId, setMessages]);

  return chatUser ? (
    <div className={`chat-box ${chatVisible? "": "hidden"}`}>
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="profile_image" />
        <p>
          {chatUser.userData.name}
          {Date.now() - chatUser.userData.lastseen <= 70000? <img className="dot" src={assets.green_dot} alt="green dot" />: null}
        </p>
        <img src={assets.help_icon} className="help" alt="help" />
        <img onClick={() => setChatVisible(false)} src={assets.arrow_icon} className="arrow" alt="" />
      </div>

      <div className="chat-msg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sId === userData.id ? "s-msg" : "r-msg"}
          >
            {msg["image"] ? (
              <img
                className="message-img"
                src={msg.image}
                alt="messaged-image"
              />
            ) : (
              <p className="msg">{msg.text}</p>
            )}

            <div>
              <img
                src={
                  msg.sId === userData.id
                    ? userData.avatar
                    : chatUser.userData.avatar
                }
                alt="profile pic"
              />
              <p>{convertTimeStamp(msg.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Enter a message"
        />
        <input
          onChange={sendImage}
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          hidden
        />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="gallery-icon" />
        </label>
        <img onClick={sendMessage} src={assets.send_button} alt="send_button" />
      </div>
    </div>
  ) : (
    <div className={`chat-welcome ${chatVisible? "": "hidden"}`}>
      <img src={assets.logo_icon} alt="" />
      <p>Chat Anytime and Anywhere</p>
    </div>
  );
};

export default ChatBox;
