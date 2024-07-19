import React, { useEffect, useState } from "react";
import { getCurrentUser} from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar";
import Message from "../Pages/Message";
import Loader from "../components/common/Loader";

export default function MessageLayout() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);

      // Fetch a default selected user; replace 'user123' with an actual user ID
      const defaultSelectedUser = await getUserById("user123");
      setSelectedUser(defaultSelectedUser);
    };

    fetchCurrentUser();
  }, []);

  if (!currentUser || !selectedUser) {
    return  <Loader />; // Show loading message while fetching user data
  }

  
  return (
    <div>
      <Topbar currentUser={currentUser} />
      <Message currentUser={currentUser} selectedUser={selectedUser} />
    </div>
  );
}