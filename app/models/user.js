const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      first_name: { type: DataTypes.STRING, allowNull: false },
      last_name: { type: DataTypes.STRING, allowNull: false },
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
          const old_password = user.password;
          user.password = await bcrypt.hash(old_password, salt);
        }
      }
    }
  );
  User.prototype.validPassword = password => bcrypt.compare(password, this.password);
  return User;
};
