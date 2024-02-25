import {
  Avatar, Button, Grid, TextField, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editGuestThunk, setCurrentGuestThunk, setGuestThunk } from '../../redux/actions/guestAction';

export default function Guest({ guest }) {
  const dispatch = useDispatch();
  console.log(guest?.status);
  const [input, setInput] = useState({
    firstName: guest?.Guest.firstName ?? '',
    lastName: guest?.Guest.lastName ?? '',
    middleName: guest?.Guest.middleName ?? '',
    birthday: guest?.Guest.birthday ?? '',
    language: guest?.Guest.language ?? '',
    phone: guest?.Guest.phone ?? '',
    email: guest?.Guest.email ?? '',
    comment: guest?.Guest?.comment ?? '',
  });
  const changeHandler = (e) => setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const updateHandler = (inputs, id) => {
    dispatch(editGuestThunk(inputs, id));
  };
  return (
    <form
      style={{
        display: 'flex', justifyContent: 'space-between', marginBottom: 10,
      }}
      onSubmit={(e) => { e.preventDefault(); updateHandler(input, guest?.Guest?.id); }}
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

        <Grid item sx={{ margin: '0 auto' }}>
          <Avatar alt="Remy Sharp" src={guest?.Guest?.avatar} sx={{ width: 140, height: 140 }} />
        </Grid>
        <Grid item xs={8} sm={12}>
          <TextField
            label="First Name"
            id="standard-size-small"
            value={input.firstName}
            size="small"
            variant="standard"
            name="firstName"
            onChange={changeHandler}
          />
          <TextField
            label="Last Name"
            id="standard-size-small"
            value={input.lastName}
            size="small"
            variant="standard"
            name="lastName"
            onChange={changeHandler}
          />

        </Grid>
        <Grid item xs={8} sm={5}>
          <TextField
            label="Middle Name"
            id="standard-size-small"
            value={input.middleName}
            size="small"
            variant="standard"
            name="middleName"
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={8} sm={12}>
          <TextField
            label="Birthday"
            id="standard-size-small"
            value={input.birthday}
            size="small"
            variant="standard"
            name="birthday"
            onChange={changeHandler}
          />

          <TextField
            label="Language"
            id="standard-size-small"
            value={input.language}
            size="small"
            variant="standard"
            name="language"
            onChange={changeHandler}
          />
        </Grid>
        <Grid item xs={8} sm={12}>

          <TextField
            label="Phone"
            id="standard-size-small"
            value={input.phone}
            size="small"
            variant="standard"
            name="phone"
            onChange={changeHandler}
          />

          <TextField
            label="Email"
            id="standard-size-small"
            value={input.email}
            size="small"
            variant="standard"
            name="email"
            onChange={changeHandler}
          />
        </Grid>
      </Grid>
      <Grid
        // container
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
        pb={2}
      >
        <Grid item xs={12} sm={12}>
          <TextField
            id="standard-multiline-static"
            name="comment"
            label="Комментарий"
            value={input.comment}
            onChange={changeHandler}
            multiline
            rows={5}
            sx={{ width: '90%' }}
            variant="standard"
          />
        </Grid>

        <Grid item xs={2} sm={2} mr={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>
            Комната:
          </Typography>
          <Typography>
            {guest?.Room?.number}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} mr={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>
            Категория:
          </Typography>
          <Typography>
            {guest?.Room?.category}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} mr={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>
            Всего потрачено:
          </Typography>
          <Typography>
            {guest?.bill}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} mr={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            onClick={() => {
              setTimeout(() => {
                if (guest?.status === 'In') {
                  dispatch(setCurrentGuestThunk());
                } else {
                  dispatch(setGuestThunk());
                }
              }, 50);
            }}
          >
            Сохранить
          </Button>

        </Grid>
      </Grid>
    </form>
  );
}
