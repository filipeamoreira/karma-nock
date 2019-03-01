require('es6-promise').polyfill();
require('isomorphic-fetch');

const { Polly } = require('@pollyjs/core');
const RESTPersister = require('@pollyjs/persister-rest');
const { setupPolly } = require('setup-polly-jest');
const FetchAdapter = require('@pollyjs/adapter-fetch');

Polly.register(FetchAdapter);
Polly.register(RESTPersister);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe('nock', () => {
  let context = setupPolly({
    loging: true,
    recordIfMissing: false,
    recordFailedRequests: true,
    mode: 'record',
    persister: 'rest',
    persisterOptions: {
      rest: {
        host: 'http://localhost.com:3000',
      } 
    },
  });
  console.log(context.polly);

  it('is setup correctly', async (done) => {
    expect(true).toBe(true);

    return fetch('https://my-json-server.typicode.com/typicode/demo/posts', {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => {
        console.log('Inside first then function');
        return response.json();
      })
      .then((posts) => {
        console.log('Inside second then function');
        console.log(posts);
        expect(posts[0].id).toBe(1);
        done();
      })
      .catch((error) => {
        console.log('Inside catch function');
        console.log(error);
        done();
      });
  });
});

