import React, { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getConnections } from "../../../api/FirestoreAPI";

export default function ConnectedUsers({ user, getCurrentUser, currentUser }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (currentUser && user) {
      getConnections(currentUser.id, user.id, setIsConnected);
    }
  }, [currentUser.id, user.id]);

  // Function to determine the button label
  const getButtonLabel = () => {
    return user.role === "Company" ? "Follow" : "Connect";
  };

  return isConnected ? (
    <></>
  ) : (
    <div className="grid-child">
      <img src={user.imageLink} alt={user.name} />
      <p className="name">{user.name}</p>
      <p className="headline">{user.headline}</p>

      <button onClick={() => getCurrentUser(user.id)}>
        <AiOutlineUsergroupAdd size={20} />
        {getButtonLabel()}
      </button>
    </div>
  );
}
