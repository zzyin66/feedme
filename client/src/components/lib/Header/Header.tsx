import React from 'react';
import { IconButton, TextField } from '@mui/material';
import { FilterList, Refresh, Search } from '@mui/icons-material';
import './Header.css';

interface PageHeaderProps {
  title: string;
  subheader: string;
  onFilterClick?: () => void;
  onRefreshClick?: () => void;
  onSearchChange?: (searchValue: string) => void; // New prop for handling search changes
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subheader,
  onFilterClick,
  onRefreshClick,
  onSearchChange,
}) => {
  return (
    <div>
      <div className='header'>
        <div className='title'>{title}</div>
        <div className='buttons'>
          {onSearchChange && (
            <TextField
              size='small'
              placeholder='Search...'
              onChange={(e) => onSearchChange?.(e.target.value)} // Call onSearchChange prop with the new value
              InputProps={{
                endAdornment: <Search />,
              }}
            />
          )}
          {onFilterClick && (
            <IconButton onClick={onFilterClick} size='large'>
              <FilterList />
            </IconButton>
          )}
          {onRefreshClick && (
            <IconButton onClick={onRefreshClick} size='large'>
              <Refresh />
            </IconButton>
          )}
        </div>
      </div>
      <div className='subheader'>
        <div className='subtitle'>{subheader}</div>
      </div>
    </div>
  );
};

export default PageHeader;
