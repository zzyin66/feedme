import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import {
  Biotech,
  Bookmarks,
  BusinessCenter,
  Feed,
  Flag,
  HealthAndSafety,
  Logout,
  Memory,
  Person,
  Public,
  SportsFootball,
  TheaterComedy,
} from '@mui/icons-material';

const pages = [
  { text: 'Home', href: '/home', icon: Feed },
  { text: 'Science', href: '/category/science', icon: Biotech },
  { text: 'Sports', href: '/category/sports', icon: SportsFootball },
  { text: 'Health', href: '/category/health', icon: HealthAndSafety },
  {
    text: 'Entertainment',
    href: '/category/entertainment',
    icon: TheaterComedy,
  },
  { text: 'Technology', href: '/category/technology', icon: Memory },
  { text: 'Business', href: '/category/business', icon: BusinessCenter },
  { text: 'Nation', href: '/category/nation', icon: Flag },
  { text: 'World', href: '/category/world', icon: Public },
];

const settings = [
  { text: 'Profile', href: '/', icon: Person },
  { text: 'Bookmarks', href: '/bookmarks', icon: Bookmarks },
  { text: 'Logout', href: '/logout', icon: Logout },
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
          <div
            key={page.href}
            className='nav-button'
            onClick={() => navigate(page.href)}
          >
            {React.createElement(page.icon)}
            <div style={{ marginLeft: 6 }}>{page.text}</div>
          </div>
        ))}
        <hr />
        {settings.map((setting) => (
          <div
            key={setting.href}
            className='nav-button'
            onClick={() => navigate(setting.href)}
          >
            {React.createElement(setting.icon)}
            <div style={{ marginLeft: 6 }}>{setting.text}</div>
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
            <a className='nav-footer-title' href='/profile'>
              wassup
            </a>
            <span className='nav-footer-subtitle'>User</span>
          </div>
        </div>
      </div>
    </div>
  );
};
