const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Reservation, {
        foreignKey: 'guestId',
      });
    }
  }
  Guest.init({
    avatar: DataTypes.TEXT,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    language: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Guest',
  });
  return Guest;
};
