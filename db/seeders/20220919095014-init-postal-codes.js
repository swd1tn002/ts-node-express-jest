'use strict';
const fetch = require('node-fetch');

const JSON_URL = 'https://raw.githubusercontent.com/theikkila/postinumerot/master/postcode_map_light.json';

module.exports = {
  async up(queryInterface, Sequelize) {
    let response = await fetch(JSON_URL);
    let json = await response.json();
    const timestamps = { createdAt: new Date(), updatedAt: new Date() };

    let data = [];
    for (let [code, name] of Object.entries(json)) {
      data.push({ code, name, ...timestamps });
    }

    await queryInterface.bulkInsert('PostalCode', data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PostalCode', null, {});
  }
};
