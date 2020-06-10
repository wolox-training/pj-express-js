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
