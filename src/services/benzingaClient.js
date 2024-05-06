import axios from 'axios';
import log from 'loglevel';

// api client
const api = axios.create({
  baseURL: import.meta.env.VITE_BENZINGA_API_URL,
  params: {
    token: import.meta.env.VITE_BENZINGA_API_KEY
  }
});

/**
 * Attempts to fetch news by filter from Benzinga API.
 * @param {Object} params - Object containing parameters for the API request:
 *   - page: (int) page offset
 *   - pageSize: (int) number of results returned
 *   - displayOutput: (string) Content returned [headline, abstract, full]
 *   - updatedSince: (int) UNIX time to reduce query size
 *   - sort: (string) Sorting method, default is 'created desc'
 *   - tickers: (string) Tickers comma separated
 *   - channels: (string) search channels (comma separated)
 *   - topics: (string) words/phrases comma separated
 * @returns {Promise<Object>} The fetched news data.
 * @throws {Error} When the API call fails due to network issues or server errors.
 */
export async function fetchNews(params) {
  try {
    const response = await api.get('/news', { params });

    if (response.status === 200) {
      return response.data; 
    } else {
      log.warn(`Error fetching news: HTTP status ${response.status} - ${response.statusText}`);
      throw new Error(`Failed to fetch news: ${response.statusText || "Unknown error occurred"}`);
    }
  } catch (error) {
    log.error("Error fetching news.", error);
    throw new Error(`An error occurred while fetching news: ${error.message || "Error details not available"}`);
  }
};