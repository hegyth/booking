const { Composer, Scenes, Markup } = require('telegraf');
const { Guest, Reservation, Room } = require('./db/models');

const startStep = new Composer();
startStep.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data = {};
    // ctx.wizard.state.data.userName = ctx.message.from.username
    // ctx.wizard.state.data.firstName = ctx.message.from.first_name
    // ctx.wizard.state.data.lastName = ctx.message.from.last_name
    await ctx.replyWithHTML('<b>Укажите ваше имя</b> \n <i>Например: Артем</i>');
    return ctx.wizard.next();
  } catch (e) {
    console.log(e);
  }
});

const titleStep = new Composer();
titleStep.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data.firstName = ctx.message.text;
    await ctx.replyWithHTML('<b>Укажите ваше отчество </b>\n <i>Например: Дмитриевич</i>');
    return ctx.wizard.next();
  } catch (e) {
    console.log(e);
  }
});

const dateStep = new Composer();
dateStep.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data.middleName = ctx.message.text;
    await ctx.replyWithHTML('<b>Укажите вашу фамилию </b>\n<i>Например: Полковников </i>');
    return ctx.wizard.next();
  } catch (e) {
    console.log(e);
  }
});

const middleStep = new Composer();
middleStep.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data.lastName = ctx.message.text;
    await ctx.replyWithHTML('<b>Укажите дату рождения📆</b>\n <i>Например: ГГГГ-ММ-ДД</i>');
    return ctx.wizard.next();
  } catch (e) {
    console.log(e);
  }
});

const wowStep3 = new Composer();
wowStep3.on('text', async (ctx) => {
  try {
    if ((/\d{4}-\d{2}-\d{2}/gi).test(ctx.message.text)) {
      ctx.wizard.state.data.birthday = ctx.message.text;
      await ctx.replyWithHTML('<b>Укажите телефон для обратной связи?📱 </b>\n <i>Например: 89991112233</i>');
      return ctx.wizard.next();
    }
    await ctx.replyWithHTML('<b>Неправильно введены даннные 🤬 </b>\n<i>Например: ГГГГ-ММ-ДД</i>');
  } catch (e) {
    console.log(e);
  }
});

const lastStep4 = new Composer();
lastStep4.on('text', async (ctx) => {
  try {
    if ((/^\+?[8][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/gi).test(ctx.message.text)) {
      ctx.wizard.state.data.phone = ctx.message.text;
      await ctx.replyWithHTML('<b>Желаемая дата заезда📆 </b>\n<i>Например: ГГГГ-ММ-ДД</i>');
      return ctx.wizard.next();
    }
    await ctx.replyWithHTML('<b>Неправильно введены даннные 🤬 </b>\n<i>Например: 89991112233</i>');
  } catch (e) {
    console.log(e);
  }
});

const lastStep5 = new Composer();
lastStep5.on('text', async (ctx) => {
  try {
    if ((/\d{4}-\d{2}-\d{2}/gi).test(ctx.message.text)) {
      ctx.wizard.state.data.checkIN = ctx.message.text;
      await ctx.replyWithHTML('<b>Желаемая дата выезда 📆 </b>\n<i>Например:  ГГГГ-ММ-ДД </i>');
      return ctx.wizard.next();
    }
    await ctx.replyWithHTML('<b>Неправильно введены даннные 🤬 </b>\n<i>Например: ГГГГ-ММ-ДД</i>');
  } catch (e) {
    console.log(e);
  }
});

const categoryStep = new Composer();
categoryStep.on('text', async (ctx) => {
  try {
    if ((/\d{4}-\d{2}-\d{2}/gi).test(ctx.message.text)) {
      ctx.wizard.state.data.checkOut = ctx.message.text;
      await ctx.replyWithHTML('<b>Какую категорию номера желаете </b>', Markup.inlineKeyboard([
        [Markup.button.callback('Стандартный ', 'standart')],
        [Markup.button.callback('Двухместный', 'twoPlace')],
        [Markup.button.callback('Люкс', 'luxury')],
      ]));
      return ctx.wizard.next();
    }
    await ctx.replyWithHTML('<b>Неправильно введены даннные 🤬 </b>\n<i>Например: XXXX-XX-XX</i>');
  } catch (e) {
    console.log(e);
  }
});

const conditionStep = new Composer();
conditionStep.action('standart', async (ctx) => {
  try {
    await ctx.answerCbQuery();
    ctx.wizard.state.data.category = 'Стандартный';
    const roomPrice = await Room.findOne({
      where: {
        category: ctx.wizard.state.data.category,
      },
    });
    const wizardData = ctx.wizard.state.data;
    const date1 = new Date(wizardData.checkIN);
    const date2 = new Date(wizardData.checkOut);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    await ctx.replyWithHTML(`Имя:<b>${wizardData.firstName}</b>\nФамилия:<b>${wizardData.lastName}</b>\nОтчество:<b>${wizardData.middleName}</b>\nДата рождения:<b>${wizardData.birthday}</b>\nКонтактный телефон:<b>${wizardData.phone}</b>\nДата заезда:<b>${wizardData.checkIN}</b>\nДата выезда:<b>${wizardData.checkOut}</b>\nКатегория номера:<b>${wizardData.category}</b>\n\n<b>Итоговая стоимость:${roomPrice.price * (diffDays)}₽</b>`);
    await ctx.replyWithHTML('<i>Заявка успешно отправлена👍</i>');
    console.log(wizardData);
    const {
      firstName, middleName, lastName, birthday, phone, checkIN, checkOut, category,
    } = wizardData;
    const guest = await Guest.findOrCreate({
      where: {
        firstName, lastName, middleName, birthday, phone,
      },
    });

    await Reservation.create({
      checkIN, checkOut, guestId: guest[0].dataValues.id, category, bill: (roomPrice.price * (diffDays)), status: 'willBe',
    });
    return ctx.scene.leave();
  } catch (e) {
    console.log(e);
  }
});

conditionStep.action('twoPlace', async (ctx) => {
  try {
    await ctx.answerCbQuery();
    ctx.wizard.state.data.category = 'Двухместный';
    const roomPrice = await Room.findOne({
      where: {
        category: ctx.wizard.state.data.category,
      },
    });
    const wizardData = ctx.wizard.state.data;
    const date1 = new Date(wizardData.checkIN);
    const date2 = new Date(wizardData.checkOut);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    await ctx.replyWithHTML(`Имя:<b>${wizardData.firstName}</b>\nФамилия:<b>${wizardData.lastName}</b>\nОтчество:<b>${wizardData.middleName}</b>\nДата рождения:<b>${wizardData.birthday}</b>\nКонтактный телефон:<b>${wizardData.phone}</b>\nДата заезда:<b>${wizardData.checkIN}</b>\nДата выезда:<b>${wizardData.checkOut}</b>\nКатегория номера:<b>${wizardData.category}</b>\n\n<b>Итоговая стоимость:${roomPrice.price * (diffDays)}₽</b>`);
    await ctx.replyWithHTML('<i>Заявка успешно отправлена👍</i>');
    console.log(wizardData);
    const {
      firstName, middleName, lastName, birthday, phone, checkIN, checkOut, category,
    } = wizardData;
    const guest = await Guest.findOrCreate({
      where: {
        firstName,
        lastName,
        middleName,
        birthday,
        phone,
      },
    });
    await Reservation.create({
      checkIN, checkOut, guestId: guest[0].dataValues.id, bill: (roomPrice.price * (diffDays)), status: 'willBe', category,
    });
    return ctx.scene.leave();
  } catch (e) {
    console.log(e);
  }
});

conditionStep.action('luxury', async (ctx) => {
  try {
    await ctx.answerCbQuery();
    ctx.wizard.state.data.category = 'Люкс';
    const roomPrice = await Room.findOne({
      where: {
        category: ctx.wizard.state.data.category,
      },
    });
    const wizardData = ctx.wizard.state.data;
    const date1 = new Date(wizardData.checkIN);
    const date2 = new Date(wizardData.checkOut);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    await ctx.replyWithHTML(`Имя:<b>${wizardData.firstName}</b>\nФамилия:<b>${wizardData.lastName}</b>\nОтчество:<b>${wizardData.middleName}</b>\nДата рождения:<b>${wizardData.birthday}</b>\nКонтактный телефон:<b>${wizardData.phone}</b>\nДата заезда:<b>${wizardData.checkIN}</b>\nДата выезда:<b>${wizardData.checkOut}</b>\nКатегория номера:<b>${wizardData.category}</b>\n\n<b>Итоговая стоимость:${roomPrice.price * (diffDays)}₽</b>`);
    await ctx.replyWithHTML('<i>Заявка успешно отправлена👍</i>');
    console.log(wizardData);
    const {
      firstName, middleName, lastName, birthday, phone, checkIN, checkOut, category,
    } = wizardData;
    const guest = await Guest.findOrCreate({
      where: {

        firstName, lastName, middleName, birthday, phone,
      },
    });

    await Reservation.create({
      checkIN, checkOut, guestId: guest[0].dataValues.id, status: 'willBe', bill: (roomPrice.price * (diffDays)), category,
    });
    return ctx.scene.leave();
  } catch (e) {
    console.log(e);
  }
});

const vacancyScene = new Scenes.WizardScene('vacancyWizard', startStep, titleStep, dateStep, middleStep, wowStep3, lastStep4, lastStep5, categoryStep, conditionStep);
module.exports = vacancyScene;
