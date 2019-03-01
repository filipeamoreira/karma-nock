require('es6-promise').polyfill();
require('isomorphic-fetch');

const { Polly } = require('@pollyjs/core');
const RESTPersister = require('@pollyjs/persister-rest');
const { setupPolly } = require('setup-polly-jest');
const FetchAdapter = require('@pollyjs/adapter-fetch');

Polly.register(FetchAdapter);
Polly.register(RESTPersister);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe('pollyjs', () => {
  let context = setupPolly({
    logging: true,

    // If a request's recording is not found, pass-through to
    // the server and record the response
    recordIfMissing: true,
    recordFailedRequests: true,

    // "record" mode only records requests, but doesn't replay them
    // mode: 'record',

    // Default mode, can be omitted
    mode: 'replay',

    adapters: ['fetch'],

    persister: 'rest',
    persisterOptions: {
      rest: {
        // Default host, can be omitted
        host: 'http://localhost:3000',
      }
    },
  });

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
