module.exports = {
    retries: 1,
    reporter: [
      ['html', { outputFolder: 'reports', open: 'on-failure' }], 
    ],
    use: {
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: 3000,
    },
    projects: [
      {
        name: 'API Tests',
        testMatch: /.*\.spec\.js/,
      },
    ],
}
  