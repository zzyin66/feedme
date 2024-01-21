import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const pages = [
  { text: "Home", href: "/home" },
  { text: "Science", href: "/category/science" },
  { text: "Sports", href: "/category/sports" },
  { text: "Health", href: "/category/health" },
  { text: "Entertainment", href: "/category/entertainment" },
  { text: "Technology", href: "/category/technology" },
  { text: "Business", href: "/category/business" },
  { text: "Nation", href: "/category/nation" },
  { text: "World", href: "/category/world" },
];

const settings = [
  { text: "Profile", href: "/" },
  { text: "Logout", href: "/logout" },
];

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div id="nav-bar">
      <div id="nav-header">
        <a id="nav-title" href="/home">
          FEEDME
        </a>
        <hr />
      </div>
      <div id="nav-content">
        {pages.map((page) => (
          <div className="nav-button" onClick={() => navigate(page.href)}>
            <i className="fas fa-palette">icon</i>
            <span>{page.text}</span>
          </div>
        ))}
        <hr />
        {settings.map((setting) => (
          <div className="nav-button" onClick={() => navigate(setting.href)}>
            <i className="fas fa-palette">icon</i>
            <span>{setting.text}</span>
          </div>
        ))}
      </div>
      <input id="nav-footer-toggle" type="checkbox" />
      <div id="nav-footer">
        <div id="nav-footer-heading">
          <div id="nav-footer-avatar">
            <img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" />
          </div>
          <div id="nav-footer-titlebox">
            <a id="nav-footer-title" href="/home">
              wassup
            </a>
            <span id="nav-footer-subtitle">User</span>
          </div>
        </div>
      </div>
    </div>
  );
};
