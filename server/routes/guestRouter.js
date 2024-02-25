const express = require('express');
const uniqBy = require('lodash.uniqby');
const { Guest, Reservation, Room } = require('../db/models');

const router = express.Router();

// Все гости

router.get('/allGuests', async (req, res) => {
  try {
    const allGuests = await Reservation.findAll({
      include: [{
        model: Guest,
      }],
    });
    const uniqueGuest = uniqBy(allGuests, (el) => el.guestId);
    res.json(uniqueGuest);
  } catch (error) {
    console.log(error);
  }
});

//  текущие постояльцы с инфой по комнате

router.get('/currentGuests', async (req, res) => {
  try {
    const now = await Reservation.findAll({
      where: {
        status: 'In',
      },
      include: [{
        model: Guest,
      }, {
        model: Room,
        attributes: ['number', 'category'],
      }],
    });
    res.json(now);
  } catch (error) {
    console.log(error);
  }
});

router.patch('/patchGuests/:id', async (req, res) => {
  const { id } = req.params;
  const {
    avatar, firstName, lastName,
    middleName, birthday,
    language, phone, email, comment,
  } = req.body.input;
  await Guest.update({
    avatar,
    firstName,
    lastName,
    middleName,
    birthday,
    language,
    phone,
    email,
    comment,
  }, { where: { id } });
  const result = await Guest.findByPk(id);
  res.json(result);
});
module.exports = router;
