/** @format */

import React, { useState, useEffect, useCallback } from "react";
import logoPhoto from "../../../assets/Pictures&Logos/shewell logo white.png";
import avatarPhoto from "../../../assets/Pictures&Logos/78-785827_user-profile-avatar-login-account-male-user-icon.png";
import axios from "../../../firebaseInstance";

export default function DashboardGlobalHeader(props) {
  const [user, setUser] = useState({});
  const userFeching = useCallback(() => {
    if (props.user) {
      axios.get("users.json").then((response) => {
        let datas = [];
        for (let i in response.data) {
          datas.push(response.data[i]);
        }
        datas.filter((user) => {
          if (user.id === props.user.uid) {
            setUser({ userName: user.fullName, email: user.email });
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    userFeching();
  }, [userFeching]);

  return (
    <div className="dashboard-global-header">
      <div>
        <div className="dashboard-header-image">
          <img src={logoPhoto} alt={logoPhoto} />
        </div>
      </div>
      <div className="dashboard-header-image-avatar-container">
        <div className="dashboard-header-image-avatar">
          <img src={avatarPhoto} alt={avatarPhoto} />
          <p>{user.userName}</p>
        </div>
      </div>
    </div>
  );
}
