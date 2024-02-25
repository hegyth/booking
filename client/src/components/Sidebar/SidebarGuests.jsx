import React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import { clearGuests, setCurrentGuestThunk, setGuestThunk } from '../../redux/actions/guestAction';

export default function SidebarGuests({ setChange }) {
  const guests = useSelector((state) => state.guests);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(setGuestThunk());
  // }, []);
  return (
    <div className="sidebar">
      <List
        sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Фильтр по гостям
          </ListSubheader>
        }
      >
        <ListItemButton onClick={() => {
          dispatch(clearGuests());
          dispatch(setCurrentGuestThunk());
          setChange((prev) => ({ ...prev, nowdays: true }));
        }}
        >
          <ListItemIcon>
            <Badge color="info" badgeContent={guests?.filter((guest) => guest?.status === 'In').length}>
              <GroupIcon style={{ fill: '#d3b990' }} />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="В отеле" />
        </ListItemButton>
        <ListItemButton onClick={() => {
          dispatch(clearGuests());
          dispatch(setGuestThunk());
          setChange((prev) => ({ ...prev, nowdays: false }));
        }}
        >
          <ListItemIcon>
            <GroupsIcon style={{ fill: '#d3b990' }} />
          </ListItemIcon>
          <ListItemText primary="За все время" />
        </ListItemButton>
      </List>
    </div>
  );
}
