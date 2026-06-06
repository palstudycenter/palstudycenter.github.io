/**
 * Centralized Configuration
 * This file contains all URLs and API endpoints used across the project
 */

const CONFIG = {
  // API Base URL - Change this single line to switch between environments
  BASE_URL: 'http://localhost:3000',
  
  // Uncomment the line below to use local development server
  // BASE_URL: 'http://localhost:3000',

  // API Endpoints
  API: {
    // Student endpoints
    CREATE_STUDENT: '/createStudent',
    STUDENT_LOGIN: '/StudentLogin',
    GET_STUDENTS: '/students',
    DELETE_STUDENT: '/DeleteStudent',
    DISABLE_PROFILE: '/DisableProfile',
    UPDATE_PROFILE_LINK: '/UpdateProfileLink',
    
    // Dashboard endpoints
    CREATE_DASHBOARD: '/Dashboard/createDashboard',
  }
};

/**
 * Helper function to build API URLs
 * @param {string} endpoint - API endpoint from CONFIG.API
 * @returns {string} - Full URL
 */
function getApiUrl(endpoint) {
  return `${CONFIG.BASE_URL}${endpoint}`;
}
