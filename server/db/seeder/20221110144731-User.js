const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('123', 10);
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          login: 'Stepan',
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: 'Artem',
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: 'Ivan',
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          login: 'Pavel',
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
