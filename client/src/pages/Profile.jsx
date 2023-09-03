import React, { useEffect } from "react";
import { Tabs } from "antd";
import { Tag } from "antd";
import MyBooking from "./MyBooking";

const { TabPane } = Tabs;

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  function callback(key) {
    console.log(key);
  }

  return (
    <div className="ml-3  pt-5">
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Profile" key="1">
          <div className="row"  style={{display:"flex",justifyContent:"center", alignItems:"center",marginLeft:"30%"}}>
            <div className="col-xs-12 ml-5 mb-5">
              <div className="profile">
                <p>My Profile</p>
                <p>Name : {user.firstName} {user.lastName}</p>
                <p>Email : {user.email}</p>
                <p>
                  IsAdmin :{" "}
                  {user.isAdmin ? (
                    <Tag color="green">YES</Tag>
                  ) : (
                    <Tag color="red">NO</Tag>
                  )}
                </p>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Booking" key="2">
          <MyBooking />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
