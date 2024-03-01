import React, { useContext, useEffect, useState } from "react";
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Popover, Typography } from "@mui/material";
import axios from "axios";

/**
 * Renders a card with the users profile information that has a popover menu that allows navigation to profile page or logout.
 *
 * @returns {React.Element}
 */

export interface User {
  daily_email_opt_in: boolean;
  email: string;
  id: string;
  preferences: Record<string, any>;
  username: string;
}

const ProfileInfo = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget as unknown as HTMLButtonElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const settings = [
    { text: 'Profile', href: '/profile' },
    { text: 'Logout', href: '/logout' },
  ];

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get("user/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setUser(res.data);
      } catch (error: any) {
        console.error(error);
        if (error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    getUserData();
  }, []);

  return (
    <div>
      <div className='nav-footer' onClick={handleClick}>
        <div className='nav-footer-heading'>
          <div className='nav-footer-avatar'>
            <img
              src='https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547'
              alt=''
            />
          </div>
          <div className='nav-footer-titlebox'>
            <span className='nav-footer-title'>
              {user?.username}
            </span>
            <span className='nav-footer-subtitle'>{user?.email}</span>
          </div>
        </div>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <div style={{ marginRight: '10px' }}>
          {settings.map((setting) => (
            <div
              className='nav-button'
              onClick={() => {
                navigate(setting.href);
                handleClose();
              }
            }>
              <i className='fas fa-palette'>icon</i>
              <Typography sx={{ p: 2 }}>{setting.text}</Typography>
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default ProfileInfo;
