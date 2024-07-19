import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader";
import MessageComponent from "../components/MessageComponent";

export default function Message({ currentUser, selectedUser }) {
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, [navigate]);

  return loading ? <Loader /> : <MessageComponent currentUser={currentUser} selectedUser={selectedUser} />;
}