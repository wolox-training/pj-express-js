module.exports = (sequelize, DataTypes) => {
  const UserAlbum = sequelize.define(
    'UserAlbum',
    {
      albumId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
      userId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      underscored: true
    }
  );
  UserAlbum.associate = models => {
    UserAlbum.belongsTo(models.User);
  };
  return UserAlbum;
};
