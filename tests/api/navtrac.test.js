import GetData from '../../pages/api/navtrac';
import { createMocks } from 'node-mocks-http';

test('Post data', async () => {
  const body = {
    name: 'Dummy Name',
    phoneNumber: '03927712123',
    company: 'Teck Track',
    loadNumber: '23232',
    customerName: 'Cus Dummy Name',
    containerNumber: '34343',
  };

  const { req, res } = createMocks({
    method: 'POST',
    body: body,
  });
  await GetData(req, res);
  expect(res._getStatusCode()).toBe(200);
});
