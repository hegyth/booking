import {
  Button, Divider, Drawer, FormControl, InputLabel, MenuItem, Select, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './drawer.css';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { addReservationThunk } from '../../redux/actions/reservationAction';
import { readyRoomsForCheckInThunk, readyRoomThunk } from '../../redux/actions/roomAction';

dayjs.extend(customParseFormat);

export default function ReservationDrawer({ open, setOpen }) {
  const rooms = useSelector((state) => state.rooms);
  const dispatch = useDispatch();
  const today = dayjs();
  const tomorrow = dayjs().add(1, 'day');

  const [input, setInputs] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    birthday: '2000-05-05',
    phone: '',
    checkIN: `${today.$y}-${today.$M + 1}-${today.$D}`,
    checkOut: `${tomorrow.$y}-${tomorrow.$M + 1}-${tomorrow.$D}`,
    category: 'Стандартный',
    roomNumber: '',
  });
  useEffect(() => dispatch(readyRoomThunk()), []);
  const changeHandler = (e) => setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addReservationThunk(input));
    setInputs({
      firstName: '',
      lastName: '',
      middleName: '',
      birthday: '2000-05-05',
      phone: '',
      checkIN: `${today.$y}-${today.$M + 1}-${today.$D}`,
      checkOut: `${tomorrow.$y}-${tomorrow.$M + 1}-${tomorrow.$D}`,
      category: 'Стандартный',
      roomNumber: '',
    });
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => {
        setOpen(!open);
        setInputs({
          firstName: '',
          lastName: '',
          middleName: '',
          birthday: '2000-05-05',
          phone: '',
          checkIN: `${today.$y}-${today.$M + 1}-${today.$D}`,
          checkOut: `${tomorrow.$y}-${tomorrow.$M + 1}-${tomorrow.$D}`,
          category: 'Стандартный',
          roomNumber: '',
        });
      }}
    >
      <form className="form" onSubmit={submitHandler}>
        <Typography variant="h6" component="h6"> Добавить бронирование </Typography>
        <Divider />
        <TextField
          name="firstName"
          value={input.firstName}
          onChange={changeHandler}
          label="Имя гостя"
          placeholder="Имя"
          variant="standard"
          required
        />
        <TextField
          name="lastName"
          value={input.lastName}
          label="Фамилия гостя"
          placeholder="Фамилия"
          variant="standard"
          onChange={changeHandler}
          required
        />
        <TextField
          name="middleName"
          value={input.middleName}
          label="Отчество гостя"
          placeholder="Отчество"
          variant="standard"
          onChange={changeHandler}
          required
        />
        <TextField
          onChange={changeHandler}
          value={input.birthday}
          name="birthday"
          id="date"
          label="Birthday"
          type="date"
          variant="standard"
          // InputLabelProps={{
          //   shrink: true,
          // }}
          required
        />
        <TextField
          name="phone"
          value={input.phone}
          label="Номер телефона"
          placeholder="Телефон"
          variant="standard"
          onChange={changeHandler}
          required
        />
        <TextField
          onChange={(e) => {
            changeHandler(e);
            dispatch(readyRoomsForCheckInThunk({
              checkIN: e.target.value, checkOut: input.checkOut,
            }));
          }}
          value={input.checkIN}
          name="checkIN"
          id="date"
          label="Заезд"
          type="date"
          variant="standard"
          // InputLabelProps={{
          //   shrink: true,
          // }}
          required
        />
        <TextField
          onChange={(e) => {
            changeHandler(e);
            dispatch(readyRoomsForCheckInThunk({
              checkIN: input.checkIN, checkOut: e.target.value,
            }));
          }}
          value={input.checkOut}
          name="checkOut"
          id="date"
          label="Выезд"
          type="date"
          variant="standard"
          // InputLabelProps={{
          //   shrink: true,
          // }}
          required
        />
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, bgcolor: 'none' }}>

          <InputLabel id="demo-simple-select-standard-label">Категория</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="category"
            value={input.category}
            onChange={(e) => {
              changeHandler(e);
            }}
            label="Категория"
          >
            <MenuItem value="Стандартный">Стандартный</MenuItem>
            <MenuItem value="Двухместный">Двухместный</MenuItem>
            <MenuItem value="Люкс">Люкс</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, bgcolor: 'none' }}>

          <InputLabel id="demo-simple-select-standard-label">Номер комнаты</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={input.roomNumber}
            onChange={changeHandler}
            label="Номер комнаты"
            name="roomNumber"
          >
            {rooms?.filter((room) => room?.category === input?.category)
              ?.map((room) => <MenuItem key={room?.id} value={room?.number}>
                {room?.number}
              </MenuItem>)}

          </Select>
        </FormControl>
        <Button id="button" type="submit" variant="contained" onClick={() => setOpen(!open)}>
          Добавить
        </Button>
      </form>
    </Drawer>
  );
}
