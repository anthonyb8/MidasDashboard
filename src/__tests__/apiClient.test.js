// Integration tests for apiClient functions
import * as apiClient from '../services/apiClient'; 

describe('API Client Integration Tests', () => {
  // Assuming you have a login function that returns a token
  const token = "e82ef6b286d886573322299a13914c0dd12d0c49";

  beforeAll(() => {
    global.sessionStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    };
  });
  

  test("login", async () => {
    console.log(process.env);
    token = await apiClient.login('anthony', 'Nov261997!');
    expect(token).toBeTruthy(); // Ensure we have a token
  });

  // test('Should fetch session data successfully', async () => {
  //   const sessionData = await apiClient.getSessionData();
  //   expect(sessionData).toBeDefined(); // Or any other assertion based on expected data
  // });

  // Add more tests for other functions...
});
