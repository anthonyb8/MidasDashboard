import * as benzingaClient from "../../services/benzingaClient";
import { newsResponse } from '../mock/mockData';
import { mockSessionStorage, mockLocalStorage } from '../mock/mockStorage';
import axios from "axios";

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

describe('"BenzingaClient Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  test("fetchNews News valid", async () => {
    // mock api response
    axios.get.mockResolvedValue(
      Promise.resolve(newsResponse)
    );

    // test 
    let params = { topics: "News", updatedSince:1714536000, displayOutput: "abstract",  page: 1, pageSize: 3};
    const data = await benzingaClient.fetchNews(params);
    
    // validate
    expect(data).toEqual(newsResponse.data);
    
  });

  test("fetchNews invalid", async () => {
    // mock api response
    axios.get.mockResolvedValue(
      Promise.resolve({status:400})
    );
    
    // test
    let params = { topics: "null", displayOutput: "abstract", page: 1, pageSize: 3 };
    await expect(benzingaClient.fetchNews(params)).rejects.toThrow('Failed to fetch news');

  });

});
