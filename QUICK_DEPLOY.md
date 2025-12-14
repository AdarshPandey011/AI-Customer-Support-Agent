# ⚡ Quick Deployment Guide

## 🎯 Recommended: Vercel (Frontend) + Render (Backend)

### Step 1: Deploy Backend to Render (5 minutes)

1. **Sign up**: https://render.com (use GitHub)
2. **New Web Service** → Connect your GitHub repo
3. **Settings**:
   - Name: `virallens-backend`
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `npm start`
4. **Environment Variables** (Add these):
   ```
   PORT=10000
   NODE_ENV=production
   MONGODB_URI=your-mongodb-atlas-uri
   JWT_SECRET=generate-a-random-secret-key
   JWT_EXPIRES_IN=7d
   HUGGING_FACE_API_KEY=your-hf-api-key
   HUGGING_FACE_MODEL=meta-llama/Llama-3.1-8B-Instruct
   CLIENT_URL=https://your-frontend.vercel.app
   ```
5. **Save & Deploy** → Wait ~5 minutes
6. **Copy your backend URL** (e.g., `https://virallens-backend.onrender.com`)

---

### Step 2: Deploy Frontend to Vercel (3 minutes)

1. **Sign up**: https://vercel.com (use GitHub)
2. **Add New Project** → Import your repo
3. **Configure**:
   - Root Directory: `client`
   - Framework: Vite (auto-detected)
   - Build: `npm run build`
   - Output: `dist`
4. **Environment Variable**:
   - Key: `VITE_API_URL`
   - Value: `https://virallens-backend.onrender.com/api` (your backend URL)
5. **Deploy** → Wait ~2 minutes
6. **Copy your frontend URL** (e.g., `https://your-app.vercel.app`)

---

### Step 3: Update Backend CORS

1. Go back to **Render dashboard**
2. Update `CLIENT_URL` environment variable to your Vercel URL
3. **Redeploy** backend

---

### Step 4: Test

1. Visit your Vercel URL
2. Sign up / Login
3. Test chat functionality

---

## ✅ Done!

Your app is now live:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://virallens-backend.onrender.com`

---

## 📝 Need MongoDB Atlas?

1. Sign up: https://www.mongodb.com/cloud/atlas
2. Create free cluster (M0)
3. Database Access → Create user
4. Network Access → Add IP: `0.0.0.0/0`
5. Connect → Copy connection string
6. Replace `<password>` with your password
7. Use in Render's `MONGODB_URI`

---

## 🆓 Free Tier Limits

**Render:**
- Free tier available
- Services sleep after 15 min inactivity
- First request may be slow (~30 sec wake-up)

**Vercel:**
- Free tier available
- Generous limits
- Always on
