import React, { useState } from 'react';
import './Profile.css';

export const Profile = () => {
  // Dummy data for demonstration
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    preferences: 'User preferences data', // I know string isnt the correct format
    dailyEmailOptIn: true,
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement; // Assuming most controls will be input elements
    if (target.type === 'checkbox') {
      setUserProfile({
        ...userProfile,
        [target.name]: target.checked,
      });
    } else {
      setUserProfile({
        ...userProfile,
        [target.name]: target.value,
      });
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // API call to update the user profile
    console.log(userProfile);
  };

  return (
    <div className='profile-container'>
      <div className='profile-header'>
        <h2>User Profile</h2>
      </div>
      <form onSubmit={handleSubmit} className='profile-form'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          value={userProfile.name}
          onChange={handleInputChange}
        />

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={userProfile.email}
          onChange={handleInputChange}
        />

        <label htmlFor='preferences'>Preferences</label>
        <input
          type='text'
          id='preferences'
          name='preferences'
          value={userProfile.preferences}
          onChange={handleInputChange}
        />

        <div className='checkbox-container'>
          <input
            type='checkbox'
            id='dailyEmailOptIn'
            name='dailyEmailOptIn'
            checked={userProfile.dailyEmailOptIn}
            onChange={handleInputChange}
          />
          <label htmlFor='dailyEmailOptIn' className='checkbox-label'>
            Opt-in for daily emails
          </label>
        </div>

        <button type='submit'>Save Changes</button>
      </form>
    </div>
  );
};
