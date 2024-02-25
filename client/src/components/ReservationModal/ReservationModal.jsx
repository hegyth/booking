import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { setReservModal } from '../../redux/slices/reservationModalSlice';
import Reservation from '../Reservation';
import { readyRoomsForCheckInThunk, readyRoomThunk } from '../../redux/actions/roomAction';

export default function ReservationModal() {
  const reservationModal = useSelector((state) => state.reservationModal);
  const readyRooms = useSelector((state) => state.rooms);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(readyRoomThunk());
  }, []);

  useEffect(() => {
    (readyRoomsForCheckInThunk({
      checkIN: reservationModal?.checkIN, checkOut: reservationModal?.checkOut,
    }));
  }, []);
  console.log(reservationModal);
  const handleClose = () => dispatch(setReservModal(null));

  return (
    <div>
      <Dialog
        onClose={handleClose}
        open={reservationModal}
        maxWidth="md"
      >
        <DialogTitle
          onClose={handleClose}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <AddHomeIcon />
          <Typography sx={{ fontSize: 24 }}>
            Бронирование
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Reservation reservation={reservationModal} rooms={readyRooms} />
      </Dialog>
    </div>
  );
}
