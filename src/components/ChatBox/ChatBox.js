import React from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'

const ChatBox = () => {
  return (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={assets.profile_img} alt="profile_image" />
        <p>Richard Sanford <img className='dot' src={assets.green_dot} alt="green dot" /></p>
        <img src={assets.help_icon} className='help' alt="help" />
      </div>

      <div className='chat-msg'>
        <div className="s-msg">
          <p className='msg'>Lorem Ipsum is placeholder text commonly used in ...</p>
          <div>
            <img src={assets.profile_img} alt="profile pic" />
            <p>03:34 PM</p>
          </div>
        </div>
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
        <input type="text" placeholder='Send a message' />
        <input type="file" id='img' accept='image/png, image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="gallery icon" />
        </label>
        <img src={assets.send_button} alt="send button" />
      </div>
    </div>
  )
}

export default ChatBox
