const nock = require('nock');
const request = require('request-promise-native');

describe('nock', () => {
  it('is setup correctly', (done) => {
    nock.disableNetConnect();
    nock('https://my-json-server.typicode.com')
      .get('/typicode/demo/posts')
      .reply(200, [
        {
          "id": 20,
          "title": "Post 20"
        },
        {
          "id": 21,
          "title": "Post 21"
        },
      ]);

    request({
      method: 'GET',
      uri: 'https://my-json-server.typicode.com/typicode/demo/posts',
      json: true
    })
      .then((posts) => {
        expect(posts[0].id).toBe(20);
        done();
      });
  });
});

