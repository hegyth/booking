import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import GuestsModal from '../GuestsModal/GuestsModal';
import SidebarGuests from '../Sidebar/SidebarGuests';
import { setModal } from '../../redux/slices/guestModalSlice';
import { setCurrentGuestThunk } from '../../redux/actions/guestAction';
import '../CheckPage/page.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function GuestsPage() {
  const dispatch = useDispatch();
  const modalHandler = (el) => dispatch(setModal(el));

  const guests = useSelector((state) => state.guests);
  // search
  const [arr, setArr] = useState([]);
  const [change, setChange] = useState({
    nowdays: 'firstRender',
    search: '',
  });

  console.log('1st ARR SELECTED', guests);

  const filterGuest = (inputSearch, guestsArr) => {
    console.log('i was in Filter');
    if (inputSearch.nowdays !== 'firstRender') {
      console.log('changed part');
      const newGuests = guestsArr.filter((el) => el.Guest.lastName.includes(inputSearch.search));
      return newGuests;
    }
    console.log('first render part:', guestsArr);
    const newGuests = guestsArr;
    return newGuests;
  };

  // 2
  useEffect(() => {
    setTimeout(() => {
      console.log('i was in 2', guests);
      setArr(filterGuest(change, guests));
    }, 300);
  }, [change, guests]);
  // 1
  useEffect(() => {
    dispatch(setCurrentGuestThunk(setArr));
    console.log('i was in 1');
  }, []);
  console.log('arr', arr);
  return (

    <div className="customContainerGuest">

      <SidebarGuests setChange={setChange} change={change} />
      <div className="wrapper">
        {/*  */}
        <div style={{
          marginTop: '10px',
          marginRight: '15px',
          display: 'flex',
          justifyContent: 'right',
        }}
        >
          <Search style={{ marginLeft: '50px', marginBottom: '20px' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              style={{ border: '1px solid black', borderRadius: '10px' }}
              placeholder="Поиск…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setChange((prev) => ({ ...prev, search: e.target.value }))}
            />
          </Search>
        </div>
        {/*  */}

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {arr?.map((guest) => <ListItem alignItems="flex-start" key={guest.Guest?.phone} onClick={() => modalHandler(guest)}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={guest.Guest?.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={`${guest.Guest?.firstName} ${guest.Guest?.lastName}`}
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Room`s number
                    {' '}
                    {guest.Room?.number}
                  </Typography>

                </>

              }
            />
          </ListItem>)}
        </List>
      </div>
      <GuestsModal />
    </div>
  );
}
