import axios from "axios";
import log from 'loglevel';
import { getToken } from "../auth/auth";

/**
 * Axios API instance configured with base URL and default headers.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-type": "application/json",
    }
  });

/**
 * Attempts to log in a user with provided credentials.
 * 
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<string>} The authentication token on successful login.
 * @throws {Error} When login fails due to network issues or invalid credentials.
 */
export async function login(username, password) {
    try {
        const response = await api.post('/api/login/', { username, password });
        const { token } = response.data;

        if (token) {
            return token;
        } else {
            log.error("Critical error: Login API did not return a token.");
            throw new Error("Login currently unavailable. Please try again later.");
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            log.error("Invalid credentials provided.");
            throw new Error("Invalid credentials");
        } else if (error.response) {
            log.error(`Login failed with HTTP status: ${error.response.status}`);
            throw new Error("Login service failed. Please try again later.");
        } else {
            log.error("Login service is currently unreachable. Check network connections and configurations.", error.message);
            throw new Error("Login service is currently unreachable. Please check your network connection and try again.");
        }
    }
}

/**
 * Fetches backtest data for a given backtest ID.
 * 
 * @param {string} backtest_id - The ID of the backtest to fetch.
 * @returns {Promise<Object>} A promise that resolves with the backtest data if successful.
 * @throws {Error} Throws an error if the fetch fails.
 */
export async function getBacktestById(backtest_id) {
    const token = getToken();
    
    // Check if the token is available
    if (!token) {
        log.error("Authorization token is not available for fetching backtest data.");
        throw new Error("Authorization token is required to fetch backtest data.");
    }

    try {
        const response = await api.get(`/api/backtest/${backtest_id}/`, { headers: { 'Authorization': `Token ${token}` } });
        if (response.status === 200) {
            return response.data;
        } else {
            consol.log('test')
            log.error(`Failed to fetch backtest data with status: ${response.status} - ${response.statusText}`);
            throw new Error(`Failed to fetch backtest data: ${response.statusText || "Unknown error occurred"}`);
        }
    } catch (error) {
        log.error(`An error occurred while fetching backtest data: ${error.message || error}`);
        throw new Error(`An error occurred while fetching backtest data: ${error.message || "Error details not available"}`);
    }
};

/**
 * Fetches a list of backtests.
 * 
 * @returns {Promise<Array>} A promise that resolves with an array of backtest summaries if successful.
 * @throws {Error} Throws an error if the fetch fails.
 */
export async function getBacktestList() {
    const token = getToken();
    
    // Check if the token is available
    if (!token) {
        log.error("Authorization token is missing for fetching backtest list.");
        throw new Error("Authorization token is required to fetch backtest data.");
    }

    try {
        const response = await api.get('/api/backtest/', { headers: { 'Authorization': `Token ${token}` } }); 
        if (response.status === 200) {
            return response.data;
        } else {
            log.warn(`Error fetching backtest list with status: ${response.status} - ${response.statusText}`);
            throw new Error(`Failed to fetch backtest list: ${response.statusText || "Unknown error occurred"}`);
        }
    } catch (error) {
        log.error(`An error occurred while fetching the backtest list: ${error.message || "Error details not available"}`, error);
        throw new Error(`An error occurred while fetching the backtest list: ${error.message || "Error details not available"}`);
    }
};

/**
 * Fetches the sessions id list.
 * 
 * @returns {Promise<Array>} A promise that resolves with an array of backtest summaries if successful.
 * @throws {Error} Throws an error if the fetch fails.
 */
export async function getSessionList () {
    const token = getToken();

    // Check if the token is available before proceeding
    if (!token) {
        log.error("Authorization token is missing for fetching session list.");
        throw new Error("Authorization token is required to fetch session data.");
    }
    
    try {
        const response = await api.get('/api/sessions/', { headers: { 'Authorization': `Token ${token}` } });

        if (response.status === 200) {
            const sessionIds = response.data.map(session => session.session_id);
            return sessionIds
        } else {
            log.warn(`Error fetching session list: HTTP status ${response.status} - ${response.statusText}`);
            throw new Error(`Failed to fetch session list: ${response.statusText || "Unknown error occurred"}`);
        }
    } catch (error) {
        log.error("Error fetching session list.", error);
        throw new Error(`An error occurred while fetching the session list: ${error.message || "Error details not available"}`);
    }
};

/**
 * Fetches the session data.
 * 
 * @returns {Promise<Array>} A promise that resolves with an array of backtest summaries if successful.
 * @throws {Error} Throws an error if the fetch fails.
 */
export async function getSessionData (session_id) {
    const token = getToken();

    // Check if the token is available before proceeding
    if (!token) {
        log.error("Authorization token is missing for fetching session data.");
        throw new Error("Authorization token is required to access session data.");
    }

    try {
        const response = await api.get(`/api/sessions/${session_id}/`, { headers: { 'Authorization': `Token ${token}` } });

        if (response.status === 200) {
            return response.data;
        } else {
            log.warn(`Error fetching session data: HTTP status ${response.status} - ${response.statusText}`);
            throw new Error(`Failed to fetch session data: ${response.statusText || "Unknown error occurred"}`);
        }
    } catch (error) {
        log.error("Error fetching session data.", error);
        throw new Error(`An error occurred while fetching session data: ${error.message || "Error details not available"}`);
    }
};