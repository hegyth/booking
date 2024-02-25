const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Reservation, {
        foreignKey: 'roomId',
      });
    }
  }
  Room.init({
    number: DataTypes.STRING,
    category: DataTypes.STRING,
    floor: DataTypes.STRING,
    price: DataTypes.INTEGER,
    isClean: DataTypes.BOOLEAN,
    comment: DataTypes.TEXT,
    isOccupied: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};
