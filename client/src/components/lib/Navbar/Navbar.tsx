import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';

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
  { text: 'Profile', href: '/profile' },
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
      </div>
      <input className='nav-footer-toggle' type='checkbox' />
      <ProfileInfo />
    </div>
  );
};
