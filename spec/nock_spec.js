const nock = require('nock');
const fetchMock = require('fetch-mock');
import 'whatwg-fetch';

describe('nock', () => {
  it('is setup correctly', async (done) => {
    fetchMock.mock('https://my-json-server.typicode.com/typicode/demo/posts', [
      { id: 20 }
    ]);

    window.fetch('https://my-json-server.typicode.com/typicode/demo/posts')
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

