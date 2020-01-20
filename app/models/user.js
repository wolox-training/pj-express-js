module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true
    }
  });
  return User;
};
