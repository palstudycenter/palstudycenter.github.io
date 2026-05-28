# Quick Start Guide

## Open Locally

The Study Center project is a static website. You can open it directly in a browser or use a local development server for best results.

### Option 1: Open directly

1. Open the folder `d:\study-center` in your file explorer.
2. Double-click `index.html` to open it in your browser.

### Option 2: Use a local server

Using a local server helps ensure all relative paths and scripts work correctly.

#### Using Python

If Python is installed, run one of these commands from `d:\study-center`:

- Python 3

```bash
python -m http.server 8000
```

- Python 2

```bash
python -m SimpleHTTPServer 8000
```

Then open:

```text
http://localhost:8000
```

#### Using VS Code Live Server

1. Install the **Live Server** extension in VS Code.
2. Open `d:\study-center` in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**.

## Inspect Pages

The main entry points are:

- `index.html` — public landing page
- `src/signup_and_login/login_form.html` — login page
- `src/signup_and_login/signup_form.html` — signup page
- `admin/index.html` — admin dashboard entry point

## Notes

- Most pages use local assets from `assets/` and vendor JS/CSS from `assets/vendor/`.
- The admin scripts make AJAX calls to a remote backend URL (`https://study-center.onrender.com`), so some features may require backend availability.
