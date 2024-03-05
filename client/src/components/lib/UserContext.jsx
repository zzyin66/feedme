import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const accessToken = localStorage.getItem('access_token');
//       console.log(accessToken)
//       if (accessToken) {
//         try {
//           const response = await axios.get('user/', {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           });
//           setUser(response.data);
//         } catch (error) {
//           console.error(error);
//           navigate('/login')
//         }
//       }
//     };

//     fetchUserData();
//   }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
