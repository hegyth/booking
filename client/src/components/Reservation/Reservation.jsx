import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Grid, InputLabel, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { setReservModal } from '../../redux/slices/reservationModalSlice';
import { totalPrice } from './date';
import {
  checkinReservationThunk, closeReservationThunk, removeReservationThunk, setTodayReservationThunk,
} from '../../redux/actions/reservationAction';

// dayjs.extend(customParseFormat);

export default function Reservation({ reservation, rooms }) {
  const dispatch = useDispatch();
  const [selectedRoom, setSelectedRoom] = useState(reservation?.number);
  const today = dayjs();
  console.log(selectedRoom);
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', marginBottom: 10,
    }}
    >

      <Grid
        container
        height={500}
        width={400}
        sx={{
          borderRadius: 1,
          bgcolor: '#e1f5fe',
          mx: 1,
        }}
        pl={3}
        pt={1}
      >
        <Grid item xs={12} sm={6} mt={3}>
          <Typography sx={{ fontSize: 18 }}>
            Информация о госте:
          </Typography>
        </Grid>
        <Grid item xs={8} sm={12}>
          <TextField
            label="First Name"
            id="standard-size-small"
            defaultValue={reservation?.firstName}
            size="small"
            variant="standard"
          />
          <TextField
            label="Last Name"
            id="standard-size-small"
            defaultValue={reservation?.lastName}
            size="small"
            variant="standard"
          />
        </Grid>
        <Grid item xs={8} sm={12}>
          <TextField
            label="Middle Name"
            id="standard-size-small"
            defaultValue={reservation?.middleName}
            size="small"
            variant="standard"
          />
        </Grid>
        <Grid item xs={8} sm={12}>

          <TextField
            label="Phone"
            id="standard-size-small"
            defaultValue={reservation?.phone}
            size="small"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={12} mr={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TextField
            fullWidth
            id="standard-multiline-static"
            label="Комментарий"
            multiline
            rows={4}
            variant="standard"
          />
        </Grid>
      </Grid>
      <Grid
        constainer
        width={400}
        height={500}
        sx={{
          backgroundColor: '#e1f5fe',
          borderRadius: 1,
          mr: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        pl={3}
      >
        <Grid item xs={12} sm={12} mt={4}>
          <Typography sx={{ fontSize: 18 }}>
            Информация о бронировании:
          </Typography>

        </Grid>
        <Grid item xs={2} sm={2} mr={2} mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" component="p">
            Заезд:
          </Typography>
          <Typography variant="body1" component="p">
            {reservation?.checkIN}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} mr={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" component="p">
            Выезд:
          </Typography>
          <Typography>
            {reservation?.checkOut}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} mr={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" component="p">
            Категория номера:
          </Typography>
          <Typography variant="body1" component="p">
            {reservation?.category}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} mr={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" component="p">
            Тариф:
          </Typography>
          <Typography variant="body1" component="p">
            {reservation?.price}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} mr={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" component="p">
            К оплате:
          </Typography>
          <Typography variant="body1" component="p">
            {totalPrice(reservation?.checkIN, reservation?.checkOut, reservation?.price)}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={2} mr={2} mb={2}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(checkinReservationThunk(reservation.id, selectedRoom));
              setTimeout(() => {
                dispatch(setTodayReservationThunk());
                dispatch(setReservModal(null));
              }, 500);
            }}
          // style={{ display: 'flex', justifyContent: 'center', width: 360 }}
          >

            {(reservation?.status !== 'In' && reservation?.status !== 'Out')
              && <FormControl variant="standard" required sx={{ minWidth: 150, ml: 12 }}>
                <InputLabel id="demo-simple-select-standard-label">Номер комнаты</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  defaultValue={reservation?.number ?? 'none'}
                  name={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  label="Room"
                >
                  {reservation?.category
                    ? rooms?.filter((room) => room?.category === reservation?.category)
                      ?.map((room) => <MenuItem
                          key={room?.id}
                          value={room?.number}
                      >
                        {room?.number}
                      </MenuItem>)
                    : rooms?.map((room) => <MenuItem
                        key={room?.id}
                        value={room?.number}
                    >
                      {room?.number}
                    </MenuItem>)}
                </Select>
              </FormControl>}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {reservation?.status === 'willBe'
                && <>
                  <Button
                    color="warning"
                    autoFocus
                    onClick={() => {
                      dispatch(removeReservationThunk(reservation.id));
                      dispatch(setReservModal(null));
                    }}
                  >
                    Удалить
                  </Button>
                  {(reservation?.checkIN === `${today.$y}-${today.$M + 1}-${today.$D}`)
                    && <Button
                      color="primary"
                      autoFocus
                      type="submit"
                    >
                      Заселить
                    </Button>}
                </>}
              {reservation?.status === 'In'
                && <Button
                  color="primary"
                  autoFocus
                  onClick={() => {
                    dispatch(closeReservationThunk(reservation.id));
                    setTimeout(() => {
                      dispatch(setReservModal(null));
                    }, 500);
                  }}
                >
                  Выселить
                </Button>}
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
