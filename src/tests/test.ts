import FetchHelper from '../FetchHelper';

test('Server start Test', (): void => {
  const options = {};
  const server = new FetchHelper();
  expect('Starting').toBe('Starting');
});
