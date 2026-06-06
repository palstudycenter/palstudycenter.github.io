# URL Configuration - Quick Reference

## 🎯 Quick Start

### Change Environment (Development ↔ Production)
Open `config.js` and modify the `BASE_URL`:

```javascript
// For PRODUCTION (current)
BASE_URL: 'https://study-center.onrender.com',

// For DEVELOPMENT (uncomment to use)
// BASE_URL: 'http://localhost:3000',
```

That's it! All API calls will automatically use the new URL.

---

## 📍 Files Modified

**JavaScript Files (Using Config):**
- `script.js`
- `admin/script.js`
- `admin/profile.js`
- `src/student.js`
- `src/pal_study_center/app.js`
- `src/pal_study_center/admin.js`

**HTML Files (Including Config):**
- `admin/index.html`
- `admin/students.html`
- `admin/profile.html`
- `src/student.html`
- `src/pal_study_center/login.html`
- `src/pal_study_center/signup.html`
- `src/pal_study_center/dashboard.html`
- Plus 5 more files with script references

---

## 📚 API Endpoints Available

```javascript
CONFIG.API = {
  CREATE_STUDENT: '/createStudent',           // POST - Create new student
  STUDENT_LOGIN: '/StudentLogin',             // POST - Login student
  GET_STUDENTS: '/students',                  // GET  - Fetch all students
  DELETE_STUDENT: '/DeleteStudent',           // DELETE - Remove student
  DISABLE_PROFILE: '/DisableProfile',         // PATCH - Toggle profile visibility
  UPDATE_PROFILE_LINK: '/UpdateProfileLink',  // PATCH - Update profile image
  CREATE_DASHBOARD: '/Dashboard/createDashboard', // POST - Create dashboard
}
```

---

## 💻 Usage Examples

### Fetch API
```javascript
// Before (scattered across files):
fetch('https://study-center.onrender.com/createStudent', options)
fetch('http://localhost:3000/students', options)

// After (consistent, centralized):
fetch(getApiUrl(CONFIG.API.CREATE_STUDENT), options)
fetch(getApiUrl(CONFIG.API.GET_STUDENTS), options)
```

### jQuery AJAX
```javascript
// Before:
$.ajax({
  url: `${url}/students`,
  type: 'GET',
  ...
})

// After:
$.ajax({
  url: getApiUrl(CONFIG.API.GET_STUDENTS),
  type: 'GET',
  ...
})
```

---

## ✅ Verification Checklist

- [ ] All HTML files include `<script src="config.js"></script>` before API scripts
- [ ] All API calls use `getApiUrl(CONFIG.API.*)` instead of hardcoded URLs
- [ ] No hardcoded URLs remaining (search for 'https://' or 'http://')
- [ ] API calls work in development mode
- [ ] API calls work in production mode

---

## 🐛 Troubleshooting

**Issue:** "CONFIG is not defined" in console
- **Solution:** Ensure `config.js` is loaded **before** the script using it in HTML

**Issue:** API calls to wrong server
- **Solution:** Check `CONFIG.BASE_URL` in `config.js` and verify correct URL is active

**Issue:** 404 errors on API calls
- **Solution:** Verify endpoint names in `CONFIG.API` match backend routes

---

## 📖 Full Documentation
See `CONFIG_GUIDE.md` for complete documentation
