const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Room, {
        foreignKey: 'roomId',
      });
      this.belongsTo(models.Guest, {
        foreignKey: 'guestId',
      });
    }
  }
  Reservation.init({
    checkIN: DataTypes.DATEONLY,
    checkOut: DataTypes.DATEONLY,
    status: DataTypes.STRING,
    bill: DataTypes.INTEGER,
    category: DataTypes.STRING,
    roomId: DataTypes.INTEGER,
    guestId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};
