# Issue while running Karma and Nock together

## Steps to reproduce the problem

1. `npm install`
2. `npm run jasmine` (test should pass).
3. `npm run karma` (test should fail)

While running karma, the nock function call silently fails. The setup of the test seems to be correct because it runs fine under jasmine.
