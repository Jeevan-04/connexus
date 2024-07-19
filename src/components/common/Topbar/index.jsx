import React, { useEffect, useState } from "react";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import user from "../../../assets/user.png";
import SearchUsers from "../SearchUsers";
import { AiOutlineHome, AiOutlineUserSwitch, AiOutlineMessage, AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../api/FirestoreAPI";
import ProfilePopup from "../ProfilePopup";
import BottomBar from "./BottomBar";
import "./index.scss";

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [scrollY, setScrollY] = useState(0);

  let navigate = useNavigate();

  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`topbar-main ${scrollY > 50 ? "topbar-scrolled" : ""}`}>
        <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />
        <input
          type="text"
          className={`search-bar ${isSearch ? "search-bar-active" : ""}`}
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div className="topbar-icons">
          <AiOutlineHome size={30} className="react-icon" onClick={() => goToRoute("/home")} />
          <AiOutlineUserSwitch size={30} className="react-icon" onClick={() => goToRoute("/connections")} />
          <BsBriefcase size={30} className="react-icon" onClick={() => goToRoute("/companies")} />
          <AiOutlineMessage size={30} className="react-icon" onClick={() => goToRoute("/message")} />
          <AiOutlineBell size={30} className="react-icon" />
          <img
            className="user-logo"
            src={currentUser?.imageLink || user}
            alt="user"
            onClick={displayPopup}
          />
        </div>
        <div className="topbar-mobile-icons">
          <AiOutlineSearch size={30} className="react-icon" onClick={() => setIsSearch(!isSearch)} />
          <AiOutlineBell size={30} className="react-icon" />
          <img
            className="user-logo"
            src={currentUser?.imageLink || user}
            alt="user"
            onClick={displayPopup}
          />
        </div>
      </div>
      {popupVisible && (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      )}
      {searchInput.length > 0 && (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user.id} className="search-inner" onClick={() => openUser(user)}>
                <img src={user.imageLink} alt={user.name} />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}
      <BottomBar />
    </>
  );
}
