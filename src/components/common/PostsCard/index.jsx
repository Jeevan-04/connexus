import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import { getCurrentUser, getAllUsers, deletePost, getConnections } from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";
import "./index.scss";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    if (currentUser && posts.userID) {
      getConnections(currentUser.id, posts.userID, setIsConnected);
    }
  }, [currentUser, posts.userID]);

  const currentUserProfile = allUsers.find(user => user.id === posts.userID) || {};

  if (!currentUser) {
    // Render a loading indicator or null while currentUser is being fetched
    return <div>Loading...</div>;
  }

  const profileImageClass = () => {
    if (currentUserProfile.role === "Company") return "profile-image-square";
    if (currentUserProfile.role === "Up for Job") return "profile-image-circle";
    if (currentUserProfile.role === "Freelancer") return "profile-image-curvy";
    return "";
  };

  return (isConnected || currentUser.id === posts.userID) ? (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
        {currentUser.id === posts.userID && (
          <div className="action-container">
            <BsPencil
              size={20}
              className="action-icon"
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={() => deletePost(posts.id)}
            />
          </div>
        )}

        <img
          alt="profile-image"
          className={`profile-image ${profileImageClass()}`}
          src={currentUserProfile.imageLink}
        />
        <div>
          <p
            className="name"
            onClick={() => navigate("/profile", {
              state: { id: posts.userID, email: posts.userEmail },
            })}
          >
            {currentUserProfile.name}
          </p>
          <p className="headline">{currentUserProfile.headline}</p>
          <p className="timestamp">{posts.timeStamp}</p>
        </div>
      </div>
      {posts.postImage && (
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image"
          alt="post-image"
        />
      )}
      <p
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></p>

      <LikeButton
        userId={currentUser.id}
        postId={posts.id}
        currentUser={currentUser}
      />

      <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          src={posts.postImage}
          className="post-image modal"
          alt="post-image"
        />
      </Modal>
    </div>
  ) : null;
}
