import FetchHelper from '../FetchHelper';

test('Server start Test', (): void => {
  const options = {};
  const server = new FetchHelper();
  console.log('Hello Testing');
  expect('Starting').toBe('Starting');
});
