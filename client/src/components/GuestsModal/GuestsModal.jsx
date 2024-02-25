import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import { Typography } from '@mui/material';
import Guest from '../Guest';
import { setModal } from '../../redux/slices/guestModalSlice';
import { setCurrentGuestThunk, setGuestThunk } from '../../redux/actions/guestAction';

export default function GuestModal() {
  const guestModal = useSelector((state) => state.guestModal);
  console.log(guestModal);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setModal(null));
    if (guestModal?.status === 'In') {
      dispatch(setCurrentGuestThunk());
    } else {
      dispatch(setGuestThunk());
    }
  };

  return (
    <div>
      <Dialog
        onClose={() => handleClose()}
        open={guestModal}
        maxWidth="md"
      >
        <DialogTitle
          onClose={handleClose}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {guestModal?.status === 'In'
            ? <MeetingRoomIcon />
            : <NoMeetingRoomIcon />}
          <Typography sx={{ fontSize: 24 }}>

            Карточка гостя
          </Typography>
          <IconButton onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Guest guest={guestModal} />
      </Dialog>
    </div>
  );
}
