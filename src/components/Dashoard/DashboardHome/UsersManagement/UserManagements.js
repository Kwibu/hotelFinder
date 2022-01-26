import React, { useCallback, useState, useEffect } from "react";
import UserManagement from "./UserManagement";
import "./UserManagement.css";
import axios from "../../../../firebaseInstance";
import Confirm from "../../../UI/Confirmation";
import Alert from "../../../UI/Messages/Alert";
import SimpleBar from "simplebar-react";
import Spinner from "../../../UI/Spinner";
import Empty from "../../../UI/Empty";
import SideMenuBar from "../SideMenuBar/SideMenuBar";

export default function UserManagements() {
  const [users, setUsers] = useState([]);
  const [choosenId, setChoosenId] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/users.json")
      .then((response) => {
        let hotelsArray = [];
        for (let i in response.data) {
          hotelsArray.push(response.data[i]);
        }
        setUsers(hotelsArray);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const viewAllUserData = (id) => {
    const userObj = users.filter((user) => user.check_id === id);
    setIsShown(true);
    setChoosenId(userObj);
  };

  const usersManagementsDOM = users.map((user) => {
    return (
      <UserManagement
        key={user.id}
        userName={user.fullName}
        email={user.email}
        date={user.createdTime}
        clicked={() => viewAllUserData(user.check_id)}
      />
    );
  });

  const onCloseHandler = () => {
    setIsShown(false);
  };

  return (
    <div className="dashboard-containers">
      <div className="navigations-header">
        <div>
          <div className="dashboard-name">Dashboard</div>
          <div>
            <SideMenuBar />
          </div>
        </div>
      </div>
      <div className="userManagements-container ">
        <div className="HotelModify-header">
          <div className="HotelModify-title">All Users</div>
          <div className="HotelModify-filter">
            TotalNumber
            <span
              style={{
                backgroundColor: "#0482B2",
                padding: ".4rem .6rem",
                color: "white",
                margin: "auto 0",
              }}
            >
              {users.length}
            </span>
          </div>
        </div>
        {isShown && (
          <Confirm onClose={onCloseHandler}>
            <Alert
              hotelDetails={choosenId}
              confirmClicked={onCloseHandler}
              cancelClicked={onCloseHandler}
              buttonName="Delete"
            />
          </Confirm>
        )}
        <SimpleBar style={{ maxHeight: 470 }}>
          {isLoading ? <Spinner /> : usersManagementsDOM}
          {error && <p>{error}</p>}
          {usersManagementsDOM.length === 0 && <Empty />}
        </SimpleBar>
      </div>
    </div>
  );
}
