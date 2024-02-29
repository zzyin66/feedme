import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const pages = [
  { text: 'Home', href: '/home' },
  { text: 'Science', href: '/category/science' },
  { text: 'Sports', href: '/category/sports' },
  { text: 'Health', href: '/category/health' },
  { text: 'Entertainment', href: '/category/entertainment' },
  { text: 'Technology', href: '/category/technology' },
  { text: 'Business', href: '/category/business' },
  { text: 'Nation', href: '/category/nation' },
  { text: 'World', href: '/category/world' },
];

const settings = [
  { text: 'Profile', href: '/' },
  { text: 'Bookmarks', href: '/bookmarks' },
  { text: 'Logout', href: '/logout' },
];

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className='nav-bar'>
      <div className='nav-header'>
        <a className='nav-title' href='/home'>
          FEEDME
        </a>
        <hr />
      </div>
      <div className='nav-content'>
        {pages.map((page) => (
          <div className='nav-button' onClick={() => navigate(page.href)}>
            <i className='fas fa-palette'>icon</i>
            <span>{page.text}</span>
          </div>
        ))}
        <hr />
        {settings.map((setting) => (
          <div className='nav-button' onClick={() => navigate(setting.href)}>
            <i className='fas fa-palette'>icon</i>
            <span>{setting.text}</span>
          </div>
        ))}
      </div>
      <input className='nav-footer-toggle' type='checkbox' />
      <div className='nav-footer'>
        <div className='nav-footer-heading'>
          <div className='nav-footer-avatar'>
            <img
              src='https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547'
              alt=''
            />
          </div>
          <div className='nav-footer-titlebox'>
            <a className='nav-footer-title' href='/home'>
              wassup
            </a>
            <span className='nav-footer-subtitle'>User</span>
          </div>
        </div>
      </div>
    </div>
  );
};
