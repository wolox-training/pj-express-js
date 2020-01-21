const bcrypt = require('bcrypt');

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
      }
    },
    {
      hooks: {
        async beforeCreate(user) {
          const salt = await bcrypt.genSalt(10);
          const oldPassword = user.password;
          user.password = await bcrypt.hash(oldPassword, salt);
        }
      }
    }
  );
  User.prototype.validPassword = password => bcrypt.compare(password, this.password);
  return User;
};
