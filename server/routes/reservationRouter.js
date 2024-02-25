const express = require('express');

const { Reservation, Guest, Room } = require('../db/models');

const router = express.Router();

// Все резервации

router.get('/allReservation', async (req, res) => {
  const allReservation = await Reservation.findAll({
    where:
      { status: 'willBe' },
    include: [{
      model: Guest,
      attributes: ['firstName', 'lastName', 'middleName', 'birthday', 'phone'],
    }, {
      model: Room,
    }],
  });
  // const { category } = allReservation;

  const reservation = allReservation.map((el) => ({
    id: el?.id,
    lastName: el.Guest?.lastName,
    firstName: el.Guest?.firstName,
    middleName: el.Guest?.middleName,
    checkIN: el?.checkIN,
    checkOut: el?.checkOut,
    status: el?.status,
    price: el?.category === 'Стандартный'
      ? 100 : el?.category === 'Двухместный'
        ? 200 : el?.category === 'Люкс' ? 300 : null,
    category: el?.category,
    number: el.Room?.number,
    phone: el.Guest?.phone,
  }));
  res.json(reservation);
});

// резерация на сегодня

router.get('/todayReservation', async (req, res) => {
  const today = new Date();
  const result = await Reservation.findAll({
    where: { checkIN: today, status: 'willBe' },
    include: [{
      model: Guest,
      attributes: ['firstName', 'lastName', 'middleName', 'birthday', 'phone'],
    }, {
      model: Room,
    }],
  });

  const todayReservation = result.map((el) => ({
    id: el?.id,
    lastName: el.Guest?.lastName,
    firstName: el.Guest?.firstName,
    middleName: el.Guest?.middleName,
    checkIN: el?.checkIN,
    checkOut: el?.checkOut,
    status: el?.status,
    price: el?.category === 'Стандартный'
      ? 100 : el?.category === 'Двухместный'
        ? 200 : el?.category === 'Люкс' ? 300 : null,
    category: el?.category,
    number: el.Room?.number,
    phone: el.Guest?.phone,
  }));
  console.log({ todayReservation });
  res.json(todayReservation);
});

// Активные резервации

router.get('/activeReservation', async (req, res) => {
  const result = await Reservation.findAll({
    where: { status: 'In' },
    include: [{
      model: Guest,
      attributes: ['firstName', 'lastName', 'middleName', 'birthday', 'phone'],
    }, {
      model: Room,
    }],
  });

  const todayReservation = result.map((el) => ({
    id: el?.id,
    lastName: el.Guest?.lastName,
    firstName: el.Guest?.firstName,
    middleName: el.Guest?.middleName,
    checkIN: el?.checkIN,
    checkOut: el?.checkOut,
    status: el?.status,
    price: el?.category === 'Стандартный'
      ? 100 : el?.category === 'Двухместный'
        ? 200 : el?.category === 'Люкс' ? 300 : null,
    category: el.Room?.category,
    number: el.Room?.number,
    phone: el.Guest?.phone,
  }));
  res.json(todayReservation);
});

// Прошлый резервации

router.get('/pastReservation', async (req, res) => {
  const result = await Reservation.findAll({
    where: { status: 'Out' },
    include: [{
      model: Guest,
      attributes: ['firstName', 'lastName', 'middleName', 'birthday', 'phone'],
    }, {
      model: Room,
    }],
  });

  const todayReservation = result.map((el) => ({
    id: el?.id,
    lastName: el.Guest?.lastName,
    firstName: el.Guest?.firstName,
    middleName: el.Guest?.middleName,
    checkIN: el?.checkIN,
    checkOut: el?.checkOut,
    status: el?.status,
    price: el?.category === 'Стандартный'
      ? 100 : el?.category === 'Двухместный'
        ? 200 : el?.category === 'Люкс' ? 300 : null,
    category: el.Room?.category,
    number: el.Room?.number,
    phone: el.Guest?.phone,
  }));
  res.json(todayReservation);
});

// резеравация на опредленную дату

router.post('/checkDate', async (req, res) => {
  const { input } = req.body;
  const result = await Reservation.findAll({
    where: { checkIN: input },
    include: [{
      model: Guest,
      attributes: ['firstName', 'lastName', 'middleName', 'birthday', 'phone'],
    }, {
      model: Room,
    }],
  });
  // const { category } = allReservation;
  const dateReservation = result.map((el) => ({
    id: el?.id,
    lastName: el.Guest?.lastName,
    firstName: el.Guest?.firstName,
    middleName: el.Guest?.middleName,
    checkIN: el?.checkIN,
    checkOut: el?.checkOut,
    status: el?.status,
    price: el?.category === 'Стандартный'
      ? 100 : el?.category === 'Двухместный'
        ? 200 : el?.category === 'Люкс' ? 300 : null,
    category: el.Room?.category,
    number: el.Room?.number,
    phone: el.Guest?.phone,
  }));
  res.json(dateReservation);
});

// создать резервацию

router.put('/newReservation', async (req, res) => { // Позже
  const {
    firstName, middleName, lastName, birthday, phone, checkIN, checkOut, category, roomNumber,
  } = req.body.input;

  console.log(firstName, middleName, lastName, birthday, phone, checkIN, checkOut, category, roomNumber);
  try {
    const guest = await Guest.findOrCreate({
      where: {
        firstName, lastName, middleName, birthday, phone,
      },
    });

    if (!firstName || !lastName || !birthday || !phone || !middleName) return res.status(400).json({ message: 'Заполните обязательные поля!' });
    const room = await Room.findOne({ where: { number: roomNumber } });
    if (guest) {
      await Reservation.create({
        checkIN, checkOut, guestId: guest[0]?.id, status: 'willBe', roomId: room?.id, category,
      });
    }
    const result = await Reservation.findAll({
      where: { guestId: guest[0].id },
      include: [{
        model: Guest,
        attributes: ['firstName', 'lastName', 'middleName', 'birthday', 'phone'],
      }, {
        model: Room,
      }],
    });

    const price = category === 'Стандартный'
      ? 100 : category === 'Двухместный'
        ? 200 : category === 'Люкс' ? 300 : null;

    const newReservation = result.map((el) => ({
      id: el?.id,
      lastName: el.Guest?.lastName,
      firstName: el.Guest?.firstName,
      middleName: el.Guest?.middleName,
      checkIN: el?.checkIN,
      checkOut: el?.checkOut,
      status: el?.status,
      price: el?.category === 'Стандартный'
      ? 100 : el?.category === 'Двухместный'
        ? 200 : el?.category === 'Люкс' ? 300 : null,
      category,
      number: el.Room?.number,
      phone: el.Guest?.phone,
    }));
    return res.json({ newReservation });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// удалить резервацию

router.delete('/deleteReservation/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Reservation.destroy({ where: { id } });
    const result = await Reservation.findAll({
      where: { status: 'willBe' },
      include: [{
        model: Guest,
        attributes: ['firstName', 'lastName', 'middleName', 'birthday', 'phone'],
      }, {
        model: Room,
      }],
    });

    // const price = category === 'Стандартный'
    //   ? 100 : category === 'Двухместный'
    //     ? 200 : category === 'Люкс' ? 300 : null;

    const newReservation = result.map((el) => ({
      id: el?.id,
      lastName: el.Guest?.lastName,
      firstName: el.Guest?.firstName,
      middleName: el.Guest?.middleName,
      checkIN: el?.checkIN,
      checkOut: el?.checkOut,
      status: el?.status,
      price: el.Room?.price,
      category: el.Room?.category,
      number: el.Room?.number,
      phone: el.Guest?.phone,
    }));
    return res.json({ newReservation });
  } catch (error) {
    console.log(error);
  }
});

// Для засеселения
router.patch('/checkinReservation/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { selectedRoom } = req.body;
    console.log({ selectedRoom });
    const pickedRoom = await Room.findOne({ where: { number: selectedRoom } });
    await Reservation.update({ status: 'In', roomId: pickedRoom.id }, { where: { id } });
    await Room.update({ isOccupied: true }, { where: { id: pickedRoom.id } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

// Выселить
router.patch('/closeReservation/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const currReserv = await Reservation.findOne({ where: { id } });
    await Reservation.update({ status: 'Out' }, { where: { id } });
    await Room.update({ isOccupied: false }, { where: { id: currReserv.roomId } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
