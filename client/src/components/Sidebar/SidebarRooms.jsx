import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import DirtyLensIcon from '@mui/icons-material/DirtyLens';
import { useDispatch } from 'react-redux';
import { List } from '@mui/material';
import { sortedRoomsThunk } from '../../redux/actions/roomAction';

export default function SidebarRooms({ filter, setFilter }) {
  // const [ready, setReady] = useState({
  //   ready: false,
  //   notReady: false,
  // });
  const dispatch = useDispatch();
  const readyHandler = () => {
    setFilter((prev) => ({ ...prev, ready: true }));
    console.log('HELP', filter.catArr);
    dispatch(sortedRoomsThunk({ ready: true, catArr: filter.catArr }));
    console.log(filter, 'IN READY');
  };
  const unreadyHandler = () => {
    setFilter((prev) => ({ ...prev, ready: false }));
    dispatch(sortedRoomsThunk({ ready: false, catArr: filter.catArr }));
    console.log(filter, '-------- IN UNREADY');
  };
  return (
    <div className="sidebar">

      <List
        sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Фильтр по статусу
          </ListSubheader>
        }
      >
        <ListItemButton onClick={readyHandler}>
          <ListItemIcon>
            <DomainVerificationIcon style={{ fill: '#d3b990' }} />
          </ListItemIcon>
          <ListItemText primary="Готова к заселению" />
        </ListItemButton>
        <ListItemButton onClick={unreadyHandler}>

          <ListItemIcon>
            <DirtyLensIcon style={{ fill: '#d3b990' }} />
          </ListItemIcon>
          <ListItemText primary="Не готова" />
        </ListItemButton>
      </List>
    </div>
  );
}
