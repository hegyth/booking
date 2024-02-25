import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import {
  Stack, TextField,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  activeReservationThunk,
  pastReservationThunk,
  setDateReservationThunk,
  setReservationThunk,
  setTodayReservationThunk,
} from '../../redux/actions/reservationAction';

export default function SidebarArrival() {
  const [visibility, setVisibility] = useState(false);
  const [dateInput, setDateInput] = useState('');
  const dateHandler = (e) => {
    setDateInput(e.target.value);
  };
  const dispatch = useDispatch();
  const resevation = useSelector((state) => state.resevation);
  console.log(resevation);
  return (
    <div className="sidebar">
      <List
        sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Фильтр по бронированиям
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => dispatch(setTodayReservationThunk())}>
          <ListItemIcon>
            <CalendarTodayIcon style={{ fill: '#d3b990' }} />
          </ListItemIcon>
          <ListItemText primary="Заезд сегодня" />
        </ListItemButton>
        <ListItemButton onClick={() => dispatch(setReservationThunk())}>
          <ListItemIcon>
            <CalendarMonthIcon style={{ fill: '#d3b990' }} />
          </ListItemIcon>
          <ListItemText primary="Все" />
        </ListItemButton>
        <ListItemButton onClick={() => { dispatch(activeReservationThunk()); }}>
          <ListItemIcon>
            <EventAvailableIcon style={{ fill: '#d3b990' }} />
          </ListItemIcon>
          <ListItemText primary="Текущие" />
        </ListItemButton>
        <ListItemButton onClick={() => { dispatch(pastReservationThunk()); }}>
          <ListItemIcon>
            <EventRepeatIcon style={{ fill: '#d3b990' }} />
          </ListItemIcon>
          <ListItemText primary="Завершенные" />
        </ListItemButton>
        <ListItemButton onClick={() => setVisibility(!visibility)}>
          <ListItemIcon>
            <EventIcon style={{ fill: '#d3b990' }} />
          </ListItemIcon>
          <ListItemText primary="Выберите дату" />
        </ListItemButton>
      </List>

      {visibility
        && <Stack
          noValidate
          ml={2}
          sx={{
            display: 'flex', flexDirection: 'row', alignItems: 'center',
          }}
          onChange={(e) => {
            dispatch(setDateReservationThunk(e.target.value));
          }}
        >
          <TextField
            onChange={dateHandler}
            value={dateInput}
            id="date"
            label="Date"
            type="date"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />

        </Stack>}
    </div>
  );
}
