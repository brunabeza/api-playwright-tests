const { faker } = require('@faker-js/faker');

function generateRandomPost() {
  return {
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraph(),
    userId: faker.number.int({ min: 1, max: 10 }) // ou um valor fixo se preferir
  };
}

module.exports = { generateRandomPost };
