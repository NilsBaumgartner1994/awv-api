import Event from '../models/Event';

test('Test invalid event', async () => {
  expect(() => {
    // @ts-ignore //ignore invalid type passing
    const invalidEvent = new Event(null, null, null);
    console.log(invalidEvent); //to suppress unused variable
  }).toThrow();
});
