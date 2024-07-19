import React, { useMemo, useState } from "react";
import Companies from "../Pages/Companies";
import { getCurrentUser } from "../api/FirestoreAPI";
import Topbar from "../components/common/Topbar";

export default function CompaniesLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <Topbar currentUser={currentUser} />
      <Companies currentUser={currentUser} />
    </div>
  );
}
