const nock = require('nock');
const fetchMock = require('fetch-mock');
require('isomorphic-fetch');

describe('nock', () => {
  it('is setup correctly', async (done) => {
    fetchMock.mock('https://my-json-server.typicode.com/typicode/demo/posts', [
      { id: 20 }
    ]);

    fetch('https://my-json-server.typicode.com/typicode/demo/posts')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        expect(data[0].id).toBe(20);
        done();
      })
      .catch((error) => {
        console.log(error);
      });

    fetchMock.reset();
  });
});

