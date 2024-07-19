import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/FirestoreAPI";
import ConnectedUsers from "./common/ConnectedUsers";
import "../Sass/ConnectionsComponent.scss";

export default function ConnectionsComponent({ currentUser }) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);


  const filteredUsers = users.filter(user => user.role !== "Company");

  return filteredUsers.length > 0 ? (
    <div className="connections-main">
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
    <div className="connections-main">No Connections to Add!</div>
  );
}
