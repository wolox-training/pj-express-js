/* eslint-disable new-cap */
const userTypes = ['regular', 'admin'];

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true
      },
      type: {
        type: DataTypes.ENUM(userTypes),
        defaultValue: 'regular'
      },
      tokenEmitDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('NOW')
      }
    },
    {
      underscored: true
    }
  );
  User.associate = models => {
    User.hasMany(models.UserAlbum);
  };
  return User;
};
