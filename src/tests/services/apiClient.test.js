import axios from "axios";
import * as apiClient from '../../services/apiClient';
import { mockSessionStorage, mockLocalStorage } from '../mock/mockStorage';
import {loginResponse, backtestListResponse, backtestResponse, sessionsListResponse, sessionsIds, sessionDataResponse, mockToken } from '../mock/mockData';

// Mocking axios globally
vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  };
});

// Mock browsers storage
global.sessionStorage = mockSessionStorage;
global.localStorage = mockLocalStorage;

describe('apiClient unit tests', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear all mocks before each test

    // Mock the login function
    sessionStorage.setItem("token", mockToken);

  });
  
  test("login valid", async () => {
    // mock api response
    axios.post.mockResolvedValue(
      Promise.resolve(loginResponse)
    );

    // test
    const token = await apiClient.login('anthony', 'testing123');

    // validate
    expect(token).toEqual(mockToken);
    expect(axios.post).toHaveBeenCalledWith('/api/login/', { username: 'anthony', password: 'testing123' });
  });

  test("login invalid credentials", async () => {
    const username = "wrongUser";
    const password = "password";
    axios.post.mockRejectedValue({
      response: {
        status: 401,
        data: { message: 'Invalid credentials' }
      }
    });

    // test
    await expect(apiClient.login(username, password)).rejects.toThrow('Invalid credentials')
  });

  test("login invalid not credentials", async () => {
    const username = "wrongUser";
    const password = "password";
    axios.post.mockRejectedValue({
      response: {
        status: 402,
        data: { message: '' }
      }
    });

    // test
    await expect(apiClient.login(username, password)).rejects.toThrow("Login service failed. Please try again later.")
  });

  test("getBacktestId valid", async () => {
    // mock api response
    axios.get.mockResolvedValue(
      Promise.resolve(backtestResponse)
    );

    // test
    const data = await apiClient.getBacktestById(1);
    
    // validate
    const expected_keys = ['id',
                            'static_stats',
                            'regression_stats',
                            'period_timeseries_stats',
                            'daily_timeseries_stats',
                            'trades',
                            'signals',
                            'parameters',
                            'price_data']
    
    const actual_keys = Object.keys(data);
    expect(actual_keys).toStrictEqual(expected_keys);
    expect(data).toEqual(backtestResponse.data);

  });

  test("getBacktestList valid", async () => {
      // mock api response
      axios.get.mockResolvedValue(
        Promise.resolve(backtestListResponse)
      );

      // test
      const data = await apiClient.getBacktestList();

      // validate
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data).toEqual(backtestListResponse.data);
  
  });

  test("getSessionList valid", async () => {
    // mock api response
    axios.get.mockResolvedValue(
      Promise.resolve(sessionsListResponse)
    );

    // test
    const data = await apiClient.getSessionList();

    // validate
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data).toEqual(sessionsIds);

  });

  test("getSessionData valid", async () => {
    // mock api response
    axios.get.mockResolvedValue(
      Promise.resolve(sessionDataResponse)
    );
    
    // test
    const data = await apiClient.getSessionData(1246);


    // validate
    expect(data).toEqual(sessionDataResponse.data);

  })

});
