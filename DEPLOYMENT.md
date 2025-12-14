# 🚀 Deployment Guide - Free Hosting

This guide covers deploying your AI Customer Support Agent application using free-tier hosting services.

## 📋 Recommended Setup

**Frontend**: Vercel (Best for React/Vite)  
**Backend**: Render (Reliable free tier)  
**Database**: MongoDB Atlas (Already free)

---

## 🎨 Frontend Deployment - Vercel (Recommended)

### Prerequisites
- GitHub account
- Repository pushed to GitHub (✅ Already done)

### Steps

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign up/Login with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your repository: `AdarshPandey011/AI-Customer-Support-Agent`
   - Select repository

3. **Configure Project**
   - **Root Directory**: Select `client` folder
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables**
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
   - (Add this after deploying backend)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-3 minutes)
   - Get your frontend URL (e.g., `https://your-app.vercel.app`)

### Alternative: Netlify

1. Visit: https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Configure:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
6. Add environment variable: `VITE_API_URL`
7. Deploy

---

## 🔧 Backend Deployment - Render (Recommended)

### Prerequisites
- Render account (free tier available)
- MongoDB Atlas connection string

### Steps

1. **Go to Render**
   - Visit: https://render.com
   - Sign up (free account)

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select: `AdarshPandey011/AI-Customer-Support-Agent`

3. **Configure Service**
   - **Name**: `virallens-backend` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables**
   Click "Advanced" and add:
   ```
   PORT=10000
   NODE_ENV=production
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRES_IN=7d
   HUGGING_FACE_API_KEY=your-hugging-face-api-key
   HUGGING_FACE_MODEL=meta-llama/Llama-3.1-8B-Instruct
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes first time)
   - Get your backend URL (e.g., `https://virallens-backend.onrender.com`)

6. **Update Frontend Environment**
   - Go back to Vercel
   - Update `VITE_API_URL` to your Render backend URL
   - Redeploy frontend

---

## 🗄️ Database - MongoDB Atlas (Already Free)

If not already set up:

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create Cluster**
   - Create free cluster (M0)
   - Choose region closest to you

3. **Database Access**
   - Create database user
   - Set username and password

4. **Network Access**
   - Add IP address: `0.0.0.0/0` (allow from anywhere)
   - Or add Render's IP addresses

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Use this in Render environment variables

---

## 🔄 Alternative: Railway (Full Stack in One Place)

Railway can host both frontend and backend:

1. **Go to Railway**
   - Visit: https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - "Deploy from GitHub repo"
   - Select your repository

3. **Deploy Backend First**
   - Add service → "GitHub Repo"
   - Configure:
     - **Root Directory**: `server`
     - **Start Command**: `npm start`
   - Add all environment variables
   - Deploy

4. **Deploy Frontend**
   - Add another service
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - Set output directory: `dist`
   - Add `VITE_API_URL` pointing to backend service
   - Deploy

**Note**: Railway free tier has limited hours/month

---

## 🌐 Alternative: Render Full Stack

Render can also host both:

1. **Backend** (same as above)
2. **Frontend**:
   - Create new "Static Site"
   - Connect repository
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - Deploy

---

## ✅ Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured correctly
- [ ] MongoDB Atlas connection working
- [ ] Frontend can reach backend API
- [ ] Test signup/login
- [ ] Test chat functionality
- [ ] CORS configured (CLIENT_URL set correctly)

---

## 🔗 Quick Links

- **Vercel**: https://vercel.com
- **Render**: https://render.com
- **Netlify**: https://netlify.com
- **Railway**: https://railway.app
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas

---

## 💡 Tips

1. **Render Free Tier**:
   - Services sleep after 15 minutes of inactivity
   - First request may be slow (wake-up time ~30 seconds)
   - Consider using a free tier with better uptime if needed

2. **Environment Variables**:
   - Never commit `.env` files
   - Always set them in hosting platform
   - Update `CLIENT_URL` after frontend deployment

3. **CORS Issues**:
   - Make sure `CLIENT_URL` in backend matches your frontend URL exactly
   - Include protocol (`https://`)

4. **Testing**:
   - Test all endpoints after deployment
   - Check browser console for errors
   - Verify API calls are working

---

## 🐛 Common Issues

**Backend returns 404:**
- Check if service is running (not sleeping)
- Verify environment variables are set
- Check logs in Render dashboard

**CORS errors:**
- Verify `CLIENT_URL` is set correctly in backend
- Include full URL with `https://`

**Database connection fails:**
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure password is URL-encoded if special characters

**Frontend can't reach backend:**
- Check `VITE_API_URL` is set correctly
- Verify backend URL is accessible
- Check browser network tab for errors
