import "./navbar.css";
import styled from 'styled-components';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom'; // Use useNavigate from react-router v6
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get user name from session storage
    const name = sessionStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    // Clear user session or token
    sessionStorage.removeItem('token'); // Or whatever method you use to manage session
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userName');

    // Redirect to login page
    navigate('/'); // Use navigate to redirect to login page
  };

  return (
    <nav className="navbarr">
      <div className="navbar-left">
        {/* <div className="menu-icon">
          <MenuIcon fontSize="large"/>
        </div> */}
        <h1 className="hello">Hello, <strong>{userName}</strong> </h1>
      </div>
      <div className="navbar-right">
        <div className="search-bar">
          {/* <SearchOutlinedIcon className="search-icon"/>
          <input type="text" placeholder="Search..."/> */}
          {/* <Searchbar> 
            <div className='searchbar'> 
              <Magnifier src={require('../../../assets/Ordersimgs/magnifier.svg').default} alt="Magnifier Icon" />
              <input placeholder='Search'/>
            </div> 
          </Searchbar> */}
        </div>
        {/* <div className="notification-icon">
          <NotificationsNoneOutlinedIcon/>
        </div> */}
        <div className="profile-icon">
          <ExitToAppIcon onClick={handleLogout} fontSize="large" className="logoutIcon"/>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

const Searchbar = styled.div`
  width: 95%;
  height: 50px;
  display: flex;
  border-radius: 8px;
  background: #FCFCFC;
  box-shadow: 0px 1px 5px 0px #0000001A;
  align-items: center;
`;

const Magnifier = styled.img`
  width: 13px;
  height: 20px;
  border: 1.5px;
`;
