'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'profile_pic', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),            
    ]);    
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'profile_pic'),
    ]);
  }
};
