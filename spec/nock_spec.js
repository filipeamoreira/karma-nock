const path = require('path');
require('es6-promise').polyfill();
require('isomorphic-fetch');

const { Polly } = require('@pollyjs/core');
const { setupPolly } = require('setup-polly-jest');
const NodeHttpAdapter = require('@pollyjs/adapter-node-http');

const FSPersister = require('@pollyjs/persister-fs');

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

describe('nock', () => {
  setupPolly({
    adapters: ['node-http'],
    persister: 'fs',
    persisterOptions: {
      fs: {
        recordingsDir: path.resolve(__dirname, '../__recordings__')
      }
    }
  });
  
  it('is setup correctly', async (done) => {
    console.log('Before request');
    expect(true).toBe(true);

    return fetch('https://my-json-server.typicode.com/typicode/demo/posts', {
      method: 'GET',
      credentials: 'include'
    })
      .then((response) => {
        console.log('Inside first then function');
        console.log(response);
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

