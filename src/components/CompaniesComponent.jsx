import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/FirestoreAPI";
import ConnectedUsers from "./common/ConnectedUsers";
import "../Sass/CompaniesComponent.scss";

export default function CompaniesComponent({ currentUser }) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);


  const filteredUsers = users.filter(user => user.role == "Company");

  return filteredUsers.length > 0 ? (
    <div className="Company-main">
      {filteredUsers.map((user) => (
        user.id === currentUser.id ? null : (
          <ConnectedUsers
            key={user.id}
            currentUser={currentUser}
            user={user}
            getCurrentUser={(id) => addConnection(currentUser.id, id)}
          />
        )
      ))}
    </div>
  ) : (
    <div className="Company-main">More Companies Yet to Arrive!</div>
  );
}
