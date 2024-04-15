// import React from "react";
import axios from "axios";
import log from "loglevel";
const apiUrl = import.meta.env.VITE_API_URL;

// API Client
// ----------

/**
 * Axios API instance configured with base URL and default headers.
 */
const api = axios.create({
    baseURL: apiUrl,
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
export async function login (username, password) {
    log.debug(`Attempting to log in user: ${username}`);
    console.log(apiUrl)
    try {
        const response = await api.post('/api/login/', { username, password });
        const { token } = response.data;
        console.log(token);
        if (token) {
          sessionStorage.setItem('token', token); // Save token to sessionStorage
          log.info(`User ${username} logged in successfully.`);
          return token; // Return token for further processing if needed
        }
      } catch (error) {
        log.error("Login error", error);
        // Optionally, handle or throw the error for the caller to handle
        throw error;
      }
};

/**
 * Logs out the current user by removing the authentication token from sessionStorage.
 */
export function logout () {
    log.debug("Logging out user.");
    sessionStorage.removeItem('token'); // Remove token from sessionStorage
    log.info("User logged out successfully.");
};

/**
 * Fetches backtest data for a given backtest ID.
 * 
 * @param {string} backtest_id - The ID of the backtest to fetch.
 * @returns {Promise<Object>} A promise that resolves with the backtest data if successful.
 * @throws {Error} Throws an error if the fetch fails.
 */
export async function getBacktestById (backtest_id) {
    log.debug(`Fetching backtest data for ID: ${backtest_id}`);
    const authToken = sessionStorage.getItem('token');
    try {
        const response = await api.get(`/api/backtest/${backtest_id}/`, {
            headers: { 'Authorization': `Token ${authToken}` }
        });
        console.log(response)
        if (response.status === 200) {
            log.info(`Backtest data for ID: ${backtest_id} fetched successfully.`);
            return response.data;
        } else {
            log.warn(`Error fetching backtest for ID: ${backtest_id}`, response.statusText);
        }
    } catch (error) {
        log.error(`Error fetching backtest for ID: ${backtest_id}`, error);
        throw error;
    }
};

/**
 * Fetches a list of backtests.
 * 
 * @returns {Promise<Array>} A promise that resolves with an array of backtest summaries if successful.
 * @throws {Error} Throws an error if the fetch fails.
 */
export async function getBacktestList () {
    log.debug("Fetching backtest list.");
    const authToken = sessionStorage.getItem('token');
    try {
        const response = await api.get('/api/backtest/',{
        headers: { 'Authorization': `Token ${authToken}` }
        }); 
        console.log("response", response)
        if (response.status === 200) {
            log.info("Backtest list fetched successfully.");
            return response.data;
        } else {
            log.warn("Error fetching backtest list", response.statusText);
        } 
    } catch (error) {
        log.error("Error fetching backtest list", error);
        throw error;
    }
};

/**
 * Fetches the session data.
 * 
 * @returns {Promise<Array>} A promise that resolves with an array of backtest summaries if successful.
 * @throws {Error} Throws an error if the fetch fails.
 */
export async function getSessionList () {
    log.debug("Fetching list of sessions.")
    const authToken = sessionStorage.getItem('token');
    try {
        const response = await api.get('/api/sessions/',{
            headers: { 'Authorization': `Token ${authToken}` }
            }
        );
        console.log("Session list Response", response)
        if (response.status === 200) {
            log.info("Session list fetched successfully.");
            const sessionIds = response.data.map(session => session.session_id);
            return sessionIds
        } else {
            log.warn("Error fetching session list", response.statusText);
        } 
    } catch (error) {
        log.error("Error fetching sesssion list.", error);
        throw error;
    }
};

/**
 * Fetches the session data.
 * 
 * @returns {Promise<Array>} A promise that resolves with an array of backtest summaries if successful.
 * @throws {Error} Throws an error if the fetch fails.
 */
export async function getSessionData (session_id) {
    log.debug("Fetching session data.")
    const authToken = sessionStorage.getItem('token');
    try {
        const response = await api.get(`/api/sessions/${session_id}/`,{
            headers: { 'Authorization': `Token ${authToken}` }
            }
        );
        console.log("Session Data Response", response)
        if (response.status === 200) {
            log.info("Session data fetched successfully.");
            return response.data;
        } else {
            log.warn("Error fetching session data list", response.statusText);
        } 
    } catch (error) {
        log.error("Error fetching sesssion data.", error);
        throw error;
    }
};
