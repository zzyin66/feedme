import React from 'react';
import { IconButton } from '@mui/material';
import { FilterList, Refresh } from '@mui/icons-material';
import './Header.css';

interface PageHeaderProps {
  title: string;
  subheader: string;
  showActions?: boolean;
  onFilterClick?: () => void;
  onRefreshClick?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subheader,
  showActions = true,
  onFilterClick = () => {},
  onRefreshClick = () => {},
}) => {
  return (
    <div>
      <div className='header'>
        <div className='title'>{title}</div>
        {showActions && (
          <div className='buttons'>
            <IconButton onClick={onFilterClick} size='large'>
              <FilterList />
            </IconButton>
            <IconButton onClick={onRefreshClick} size='large'>
              <Refresh />
            </IconButton>
          </div>
        )}
      </div>
      <div className='subheader'>
        <div className='subtitle'>{subheader}</div>
      </div>
    </div>
  );
};

export default PageHeader;
