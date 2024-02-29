import React, { useContext } from "react";
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Button, Popover, Typography } from "@mui/material";

/**
 * Renders a card with the users profile information that has a popover menu that allows navigation to profile page or logout.
 *
 * @returns {React.Element}
 */

const ProfileInfo = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget as unknown as HTMLButtonElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

//   const { user, logout } = useContext(AuthContext);
  const settings = [
    { text: 'Profile', href: '/profile' },
    { text: 'Logout', href: '/logout' },
  ];

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
              username
            </span>
            <span className='nav-footer-subtitle'>email</span>
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
