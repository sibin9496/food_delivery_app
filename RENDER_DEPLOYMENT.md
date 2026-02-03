# 🚀 Render Deployment Guide

## Quick Summary
This project is configured for deployment on Render with the following structure:

```
Repository Root/
├── render.yaml           (Render configuration)
├── build.sh             (Build script)
├── start.sh             (Start script)  
└── food-order-website/  (Project root)
    ├── package.json
    ├── vite.config.js
    ├── src/
    └── public/
```

## Current Configuration

The `render.yaml` file tells Render to:
1. Use `food-order-website` directory as the service root
2. Run `npm install && npm run build` for building
3. Run `npm install -g serve && serve -s dist -l 3000` to start

## If You See `ENOENT` Errors

If Render shows errors like:
```
npm error path /opt/render/project/src/package.json
```

Follow these steps in the Render Dashboard:

### Option 1: Manual Render Dashboard Configuration
1. Go to your Render service dashboard
2. Click **Settings**
3. Find **Build & Deploy** section
4. Set **Root Directory** to: `food-order-website`
5. Set **Build Command** to: `npm install && npm run build`
6. Set **Start Command** to: `npm install -g serve && serve -s dist -l 3000`
7. Click **Deploy**

### Option 2: Clear Cache and Redeploy
1. Go to Render Dashboard
2. Click the **three dots menu**
3. Select **Clear build cache**
4. Click **Deploy**

### Option 3: Manual Environment Setup
If errors persist:
1. SSH into your Render instance
2. Run these commands:
   ```bash
   cd /opt/render/project/food-order-website
   npm install
   npm run build
   ```

## Deployment Status

Latest commits:
- ✅ Bug fixes applied
- ✅ render.yaml configured at root level
- ✅ Build tested locally (successful)
- ✅ All files pushed to GitHub

## Local Testing

To test locally before deploying:
```bash
cd food-order-website
npm install
npm run build
npm install -g serve
serve -s dist -l 3000
```

Then visit: http://localhost:3000

## Project Details

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Node Version**: 18.17.0
- **Port**: 3000 (Render)

## Support

If deployment still fails:
1. Check the Render logs in Dashboard > Logs
2. Verify root directory is set to `food-order-website`
3. Ensure render.yaml is at repository root (not in subdirectory)
4. Clear cache and redeploy
