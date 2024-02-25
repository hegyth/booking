const {
  Telegraf, Scenes, Markup, session,
} = require('telegraf');
const env = require('dotenv');
const vacancyScene = require('./vacancy');

env.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([vacancyScene]);
bot.use(session());
bot.use(stage.middleware());

bot.hears('Оформить бронь на отель', (ctx) => ctx.scene.enter('vacancyWizard'));

bot.start(async (ctx) => {
  try {
    await ctx.reply('Добрый день! это бот по бронироваю номера', Markup.keyboard([
      ['Оформить бронь на отель'],

    ]).oneTime().resize());
  } catch (e) {
    console.log(e);
  }
});

bot.launch();
