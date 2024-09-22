import React from 'react'
import './RightSidebar.css'
import assets from '../../assets/assets'
import { logout } from '../../config/firebase'

const RightSidebar = () => {
  return (
    <div className='rs'>
      <div className="rs-profile">
        <img src={assets.profile_img} alt="profile-img" />
        <h3>Richard Sanford <img src={assets.green_dot} className='dot' alt="online" /></h3>
        <p>Hey there, I am Richard Stanford using chat app.</p>
      </div>
      <hr />
      <div className='rs-media'>
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="sharing-pic" />
          <img src={assets.pic2} alt="sharing-pic" />
          <img src={assets.pic3} alt="sharing-pic" />
          <img src={assets.pic4} alt="sharing-pic" />
          <img src={assets.pic1} alt="sharing-pic" />
          <img src={assets.pic2} alt="sharing-pic" />
        </div>
      </div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default RightSidebar
