const express = require('express');
const { Op } = require('sequelize');
const uniqBy = require('lodash.uniqby');
const { Room, Reservation, Guest } = require('../db/models');

const router = express.Router();

// все комнаты
router.get('/listRooms', async (req, res) => {
  const allReservation = await Reservation.findAll({
    include: [{
      model: Guest,
    }, {
      model: Room,
    }],
  });
  const reservation = allReservation.map((el) => ({
    id: el?.id,
    lastName: el.Guest?.lastName,
    firstName: el.Guest?.firstName,
    middleName: el.Guest?.middleName,
    checkIN: el?.checkIN,
    checkOut: el?.checkOut,
    price: el.Room?.price,
    category: el.Room?.category,
    number: el.Room?.number,
    phone: el.Guest?.phone,
  }));
  res.json(reservation);
});

// только свободные и чистые комнаты
router.get('/listRooms/ready', async (req, res) => {
  const today = new Date();
  const all = await Reservation.findAll();

  try {
    const cleanAndAvailableRooms = await Room.findAll({
      where: {
        isOccupied: false,
        isClean: true,
      },
    });
    res.json(cleanAndAvailableRooms);
  } catch (err) {
    console.log(err);
  }
});

router.post('/listRooms/readycheckin', async (req, res) => {
  const { checkIN, checkOut } = req.body;
  if (checkOut <= checkIN) return res.json([]);
  try {
    const allReservationChekInToday = await Reservation.findAll({
      where: {

        [Op.or]: [

          {
            checkIN: {
              [Op.between]: [checkIN, checkOut],
            },
          },
          {
            checkOut: {
              [Op.between]: [checkIN, checkOut],
            },
          },
          {
            [Op.and]: [
              {
                checkIN: {
                  [Op.lt]: checkIN,
                },
              },
              {
                checkOut: {
                  [Op.not]: checkIN,
                  [Op.gt]: checkOut,
                },
              },
            ],
          },
        ],
      },
      include: [{
        model: Room,
      },
      ],
    });
    const reservWithRooms = allReservationChekInToday
      .filter((el) => el.checkOut !== checkIN && el.checkIN !== checkOut && el.roomId !== null);
    const onlyReservedRooms = reservWithRooms.map((reserv) => reserv.Room).filter((room) => !!room);

    const allReadyRooms = await Room.findAll({
      where: {
        isOccupied: false,
        id: {
          [Op.not]: onlyReservedRooms.map((el) => el.id),
        },
      },
    });
    res.json(allReadyRooms);
  } catch (err) {
    console.log(err);
  }
});

// Комнаты по категории

router.post('/listRooms/cathegory', async (req, res) => {
  try {
    const { category } = req.body;
    const categoryRooms = await Room.findAll({ where: { category } });
    res.json(categoryRooms);
  } catch (err) {
    console.log(err);
  }
});

router.get('/listRooms/readyBy/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const readyRoomsByCategory = await Room.findAll({
      where: {
        isClean: true, isOccupied: false, category,
      },
    });
    res.json(readyRoomsByCategory);
  } catch (err) {
    console.log(err);
  }
});

router.post('/listRooms/filter', async (req, res) => {
  console.log('-----ARRAY-----', req.body.arr);
  if (!req.body.arr) {
    const allRooms = await Room.findAll();
    return res.json(allRooms);
  }
  const { catArr } = req.body.arr;
  const newArr = [];
  if (catArr?.length !== 0) {
    for (let i = 0; i < catArr?.length; i += 1) {
      newArr.push(catArr[i]?.name);
    }
    const allRooms = await Room.findAll();
    const filteredRooms = allRooms.filter((el) => newArr.includes(el.category));
    const resultRooms = [];
    for (let i = 0; i < filteredRooms.length; i += 1) {
      resultRooms.push(filteredRooms[i].dataValues);
    }
    res.json(resultRooms);
  } else {
    const allRooms = await Room.findAll();
    res.json(allRooms);
  }
});

// ready

router.get('/listRooms/ready', async (req, res) => {
  try {
    const readyRooms = await Room.findAll({ where: { isOccupied: false } });
    res.json(readyRooms);
  } catch (err) {
    console.log(err);
  }
});

// грязные комнаты, не свободные комнаты
router.get('/listRooms/notready', async (req, res) => {
  try {
    const notReadyRooms = await Room.findAll({ where: { isOccupied: true } });
    res.json(notReadyRooms);
  } catch (err) {
    console.log(err);
  }
});

// sortedRooms

router.post('/sortedRooms', async (req, res) => {
  try {
    if (!req.body.catArr) {
      const allRooms = await Room.findAll();
      return res.json(allRooms);
    }
    const frontParams = req.body;
    console.log('--->', frontParams);

    const { catArr } = frontParams;
    const newArr = [];
    if (frontParams.ready !== 'firstRender') {
      for (let i = 0; i < catArr?.length; i += 1) {
        newArr.push(catArr[i]?.name);
      }
      // готовые всех категорий
      if (frontParams.catArr.length === 0 && frontParams.ready === true) {
        console.log('_____READY ROOMS + []_____');
        const readyOnly = await Room.findAll({
          where: {
            isOccupied: false,
          },
        });

        return res.json(readyOnly);
      }

      // не готовые всех категорий + первый рендеринг на данный момент
      if (frontParams.catArr.length === 0 && frontParams.ready === false) {
        console.log('_____NOT READY ROOMS + []_____');
        const notReadyOnly = await Room.findAll({
          where: {
            isOccupied: true,
          },
        });

        return res.json(notReadyOnly);
      }

      // готовые всех определенных категорий
      if (frontParams.catArr.length !== 0 && frontParams.ready === true) {
        console.log('_____READY ROOMS + [CATEGORIES]_____');
        const readyRooms = await Room.findAll({
          where: {
            isOccupied: false,
          },
        });
        const filteredRooms = readyRooms.filter((el) => newArr.includes(el.category));
        const resultRooms = [];
        for (let i = 0; i < filteredRooms.length; i += 1) {
          resultRooms.push(filteredRooms[i].dataValues);
        }
        res.json(resultRooms);
      }

      // не готовые всех категорий
      if (frontParams.catArr.length !== 0 && frontParams.ready === false) {
        console.log('_____NOT READY ROOMS + [CATEGORIES]_____');
        const notReadyRooms = await Room.findAll({
          where: {
            isOccupied: true,
          },
        });
        const filteredRooms = notReadyRooms.filter((el) => newArr.includes(el.category));
        const resultRooms = [];
        for (let i = 0; i < filteredRooms.length; i += 1) {
          resultRooms.push(filteredRooms[i].dataValues);
        }
        res.json(resultRooms);
      }
    } else {
      for (let i = 0; i < catArr?.length; i += 1) {
        newArr.push(catArr[i]?.name);
      }
      if (frontParams.catArr.length === 0) {
        console.log('_____[]_____');
        const readyOnly = await Room.findAll();
        return res.json(readyOnly);
      }
      if (frontParams.catArr.length !== 0) {
        console.log('_____[CATEGORIES]_____');
        const notReadyRooms = await Room.findAll();
        const filteredRooms = notReadyRooms.filter((el) => newArr.includes(el.category));
        const resultRooms = [];
        for (let i = 0; i < filteredRooms.length; i += 1) {
          resultRooms.push(filteredRooms[i].dataValues);
        }
        res.json(resultRooms);
      }

    }
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;
