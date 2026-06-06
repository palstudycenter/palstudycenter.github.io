# URL Configuration Guide

## Overview
All URLs and API endpoints used throughout the project are now centralized in a single configuration file (`config.js`). This eliminates the need to change URLs in multiple files when switching between environments.

## Configuration File Location
- **File:** `config.js` (at the root of the project)
- **Purpose:** Centralized configuration for all API endpoints and base URLs

## How to Change URLs

### For Development (Local Testing)
1. Open `config.js`
2. Uncomment the local development line:
   ```javascript
   // BASE_URL: 'http://localhost:3000',
   ```
3. Comment out the production line:
   ```javascript
   // BASE_URL: 'https://study-center.onrender.com',
   ```

### For Production
1. Open `config.js`
2. Ensure the production URL is active:
   ```javascript
   BASE_URL: 'https://study-center.onrender.com',
   ```

## Configuration Structure

```javascript
const CONFIG = {
  // API Base URL
  BASE_URL: 'https://study-center.onrender.com',
  
  // API Endpoints
  API: {
    CREATE_STUDENT: '/createStudent',
    STUDENT_LOGIN: '/StudentLogin',
    GET_STUDENTS: '/students',
    DELETE_STUDENT: '/DeleteStudent',
    DISABLE_PROFILE: '/DisableProfile',
    UPDATE_PROFILE_LINK: '/UpdateProfileLink',
    CREATE_DASHBOARD: '/Dashboard/createDashboard',
  }
};
```

## Using the Configuration in Code

### Getting a Full API URL
Use the `getApiUrl()` helper function:

```javascript
// Example: Create student endpoint
const url = getApiUrl(CONFIG.API.CREATE_STUDENT);
// Result: https://study-center.onrender.com/createStudent

// Example: Login endpoint
const url = getApiUrl(CONFIG.API.STUDENT_LOGIN);
// Result: https://study-center.onrender.com/StudentLogin
```

### In Fetch Calls
```javascript
const response = await fetch(getApiUrl(CONFIG.API.CREATE_STUDENT), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### In AJAX Calls
```javascript
$.ajax({
  url: getApiUrl(CONFIG.API.STUDENT_LOGIN),
  type: 'POST',
  data: data,
  success: function(response) {
    // Handle response
  }
});
```

## Files Updated

The following files have been updated to use the centralized configuration:

### JavaScript Files (API Calls)
- `script.js` - Main signup/login/dashboard requests
- `src/student.js` - Student data fetching
- `admin/script.js` - Admin dashboard student operations
- `admin/profile.js` - Admin profile management
- `src/pal_study_center/app.js` - PAL study center signup/login
- `src/pal_study_center/admin.js` - PAL study center admin functions

### HTML Files (Script Includes)
All HTML files that use API calls now include `config.js` before their respective script files:
- `admin/index.html`
- `admin/students.html`
- `admin/profile.html`
- `src/student.html`
- `src/student_window/home.html`
- `src/student_window/student_window.html`
- `src/student_window/request.html`
- `src/signup_and_login/home.html`
- `src/signup_and_login/after_login.html`
- `src/pal_study_center/login.html`
- `src/pal_study_center/signup.html`
- `src/pal_study_center/dashboard.html`

## Adding New Endpoints

When adding a new API endpoint:

1. **Add it to `config.js`:**
   ```javascript
   API: {
     // ... existing endpoints
     NEW_ENDPOINT: '/new-endpoint',
   }
   ```

2. **Use it in your code:**
   ```javascript
   fetch(getApiUrl(CONFIG.API.NEW_ENDPOINT), options)
   ```

This ensures the endpoint is automatically updated when the base URL changes.

## Benefits of This Approach

✅ **Single Point of Change** - Modify the URL once in `config.js`  
✅ **Easy Environment Switching** - Comment/uncomment to switch between dev/prod  
✅ **Better Maintainability** - All endpoints are documented in one place  
✅ **Reduced Errors** - No typos from duplicating URLs across files  
✅ **Scalability** - Easy to add new endpoints or configurations  
✅ **Version Control Friendly** - Easier to manage in git commits  

## Troubleshooting

### "CONFIG is not defined" Error
- Ensure `config.js` is loaded **before** the script that uses it
- Check the HTML file includes: `<script src="config.js"></script>`

### "getApiUrl is not defined" Error
- Verify `config.js` is loaded in the page
- Check that the `<script>` tag points to the correct path for `config.js`

### API calls to wrong server
- Check `CONFIG.BASE_URL` in `config.js`
- Ensure the correct URL is uncommented
- Verify network requests in browser DevTools (Network tab)
