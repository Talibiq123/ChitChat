import React from "react";
import "./LeftSidebar.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

const LeftSidebar = () => {

  const navigate = useNavigate();

  const inputhandler = async (e) => {
    try {
      const input = e.target.value;
      const userRef = collection(db, 'users');
      const q = query(userRef, where("username", "==", input.toLowerCase()));
      const querySnap = await getDocs(q);
      if (!querySnap.empty) {
        console.log(querySnap.doc[0].data());
      }
    } catch (error) {
      
    }
  }

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} className="logo" alt="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="menu_icon" />
            <div className="sub-menu">
              <p onClick={() => navigate('/profile')}>Edit Profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="logo" />
          <input onChange={inputhandler} type="text" placeholder="Search here..." />
        </div>
      </div>
      <div className="ls-list">
        {Array(12)
          .fill("")
          .map((item, index) => (
            <div key={index} className="friends">
              <img src={assets.profile_img} alt="Profile" />
              <div>
                <p>Richard Sanford</p>
                <span>Hello, How are you?</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
