import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import { readyRoomsForCheckInThunk } from '../../redux/actions/roomAction';
// import Masonry from '@mui/lab/Masonry';
import ReservationList from '../ReservationList/ReservationList';
import ReservationDrawer from '../ReservationModal/ReservationDrawer';
import SidebarArrival from '../Sidebar/SidebarArrival';
import './page.css';

export default function CheckPage() {
  const [reservDrawer, setReservDrawer] = useState(false);
  const dispatch = useDispatch();
  const today = dayjs();
  const tomorrow = dayjs().add(1, 'day');
  const checkIN = `${today.$y}-${today.$M + 1}-${today.$D}`;
  const checkOut = `${tomorrow.$y}-${tomorrow.$M + 1}-${tomorrow.$D}`;
  return (
    <div className="customContainer">
      <SidebarArrival />
      <div style={{ marginTop: '10px', marginRight: '15px', width: 1000 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 style={{ display: 'inline-block' }}>Бронирования</h2>
          <IconButton
            style={{ flexGrow: '0', height: '45px' }}
            size="large"
            onClick={() => {
              setReservDrawer(!reservDrawer);
              dispatch(readyRoomsForCheckInThunk({ checkIN, checkOut }));
            }}
          >
            <AddIcon style={{ fill: '#d3b990' }} />
          </IconButton>
        </div>
        <ReservationList />
      </div>
      <ReservationDrawer open={reservDrawer} setOpen={setReservDrawer} />
    </div>
  );
}
