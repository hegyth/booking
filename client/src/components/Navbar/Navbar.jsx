import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import HotelIcon from '@mui/icons-material/Hotel';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { logoutUserAsync } from '../../redux/actions/userActions';
import './Navbar.css';

export default function Navbar() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUserAsync());
  };
  return (

    <AppBar position="sticky" id="navbar">
      <Toolbar sx={{ display: 'flex', width: '100%' }}>
        <HotelIcon sx={{ width: 250 }} />
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>

          <Typography variant="h6" component={Link} to="/check" sx={{ color: 'inherit', textDecoration: 'inherit' }}>
            Заезд
          </Typography>
          <Typography variant="h6" component={Link} to="/rooms" sx={{ color: 'inherit', textDecoration: 'inherit' }}>
            Комнаты
          </Typography>
          <Typography variant="h6" component={Link} to="/guests" sx={{ color: 'inherit', textDecoration: 'inherit' }}>
            Гости
          </Typography>
        </Box>
        <IconButton color="inherit" aria-label="logout" onClick={() => logoutHandler()}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
