'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    profile_pic: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Company,{foreignKey: 'companyId', as: 'Company'})    
    User.hasMany(models.UsersWorkingDay,{foreignKey:'userId', as:'usersworkingdays'})
  };
  return User;
};