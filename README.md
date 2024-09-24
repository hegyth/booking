# Booking
## Старт:
- Для старта клиента:
  - npm i
  - npm start
- Для старта сервера:
  - npm i
  - в ./db/database.js указать данные бд:
    ```
    module.exports = {
      development: {
        username: ______ ,
        password: ______ ,
        database: ______ ,
        host: __________ ,
        dialect: 'postgres',
      },
      test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
      },
      production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
      },
  - создать таблицу -> npx sequelize db:create
  - накатить миграции -> npx sequelize db:migrate
  - засидить таблицу -> npx sequelize db:seed:all
  - npm run dev
## Описание:
Приложение для организации бизнес процессов, предназначенное для сотрудников отеля/гостинницы
- создание, редактирование, удаление заявок на резервацию номеров
- статусы готовности номеров
- отдельные карточки номеров
- отдельные карточки гостей
