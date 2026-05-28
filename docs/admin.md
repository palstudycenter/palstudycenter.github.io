# Admin Section Documentation

## Admin Folder Purpose

The `admin/` folder contains pages for the website's administrative interface and user management.

## Admin Pages

- `admin/index.html`
  - Main admin landing page.
  - Requires user session data and redirects to login if not authenticated.
  - Includes links to student list and student window pages.

- `admin/profile.html`
  - Admin profile page. Presumably shows profile details for an admin user.

- `admin/students.html`
  - Student management page.
  - Used to view or manage student data from the admin perspective.

## Admin Scripts

- `admin/script.js`
  - Handles signup, login, and dashboard request submission.
  - Uses AJAX calls to a backend server at `https://study-center.onrender.com`.
  - Performs validation for fields such as name, phone, email, password, class, board, and user type.
  - Redirects users after login or signup based on role.

- `admin/profile.js`
  - Admin profile behavior and interactivity.

## Access Flow

1. User visits `admin/index.html`.
2. The page checks session storage for a valid user and redirects to login if needed.
3. Admin and student actions are handled through AJAX requests and client-side navigation.

## Note

The admin section relies on JavaScript for session checks and navigation. It is designed to work as part of the broader static site and can be reviewed or updated in the browser.
