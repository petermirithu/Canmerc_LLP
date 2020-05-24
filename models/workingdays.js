'use strict';
module.exports = (sequelize, DataTypes) => {
  const WorkingDays = sequelize.define('WorkingDays', {
    weekDay: DataTypes.STRING,
    workingDate: DataTypes.DATE,
    isWorking: DataTypes.BOOLEAN
  }, {});
  WorkingDays.associate = function(models) {
    WorkingDays.hasMany(models.UsersWorkingDay, {as: 'Days', foreignKey: 'workingDayId'})    
  };
  return WorkingDays;
};