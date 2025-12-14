# 📝 Step-by-Step Deployment Walkthrough

Follow these steps exactly to deploy your application for free.

---

## Part 1: Deploy Backend to Render

### Step 1.1: Sign Up for Render
1. Open your browser and go to: **https://render.com**
2. Click **"Get Started for Free"** (top right)
3. Choose **"Sign up with GitHub"**
4. Authorize Render to access your GitHub account
5. Complete any additional verification if prompted

✅ **Checkpoint**: You should now be logged into Render dashboard

---

### Step 1.2: Create Web Service
1. Click the **"New +"** button (top right)
2. Select **"Web Service"** from dropdown
3. You'll see "Connect a repository" - click **"Connect account"** if needed
4. Click **"Connect"** next to your GitHub account
5. Search for your repository: `AI-Customer-Support-Agent`
6. Click **"Connect"** next to your repository

✅ **Checkpoint**: You should see the service configuration page

---

### Step 1.3: Configure Backend Service

Fill in the following:

- **Name**: `virallens-backend` (or any name you prefer)
- **Region**: Choose closest to you (e.g., `Oregon (US West)` or `Frankfurt (EU Central)`)
- **Branch**: `main`
- **Root Directory**: `server` ⚠️ **IMPORTANT: Type this exactly**
- **Runtime**: `Node` (should be auto-selected)
- **Build Command**: `npm install`
- **Start Command**: `npm start`

✅ **Checkpoint**: Configuration should look like:
```
Name: virallens-backend
Region: [Your choice]
Branch: main
Root Directory: server
Runtime: Node
Build Command: npm install
Start Command: npm start
```

---

### Step 1.4: Add Environment Variables

Click **"Advanced"** → Then click **"Add Environment Variable"** for each:

1. **PORT**
   - Key: `PORT`
   - Value: `10000`
   - Click "Save"

2. **NODE_ENV**
   - Key: `NODE_ENV`
   - Value: `production`
   - Click "Save"

3. **MONGODB_URI**
   - Key: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/virallens?retryWrites=true&w=majority`
   - Click "Save"
   
   📌 **Don't have MongoDB Atlas?** See "MongoDB Atlas Setup" section below

4. **JWT_SECRET**
   - Key: `JWT_SECRET`
   - Value: Generate a random string (you can use: `openssl rand -base64 32` or any long random string)
   - Example: `my-super-secret-jwt-key-change-this-in-production-12345`
   - Click "Save"

5. **JWT_EXPIRES_IN**
   - Key: `JWT_EXPIRES_IN`
   - Value: `7d`
   - Click "Save"

6. **HUGGING_FACE_API_KEY**
   - Key: `HUGGING_FACE_API_KEY`
   - Value: Your Hugging Face API key (get from https://huggingface.co/settings/tokens)
   - Click "Save"

7. **HUGGING_FACE_MODEL**
   - Key: `HUGGING_FACE_MODEL`
   - Value: `meta-llama/Llama-3.1-8B-Instruct`
   - Click "Save"

8. **CLIENT_URL**
   - Key: `CLIENT_URL`
   - Value: `https://placeholder.vercel.app` (we'll update this later)
   - Click "Save"

✅ **Checkpoint**: You should have 8 environment variables added

---

### Step 1.5: Deploy Backend
1. Scroll down and click **"Create Web Service"**
2. Wait for deployment to start (you'll see logs)
3. Wait 5-10 minutes for first deployment
4. Watch the logs - you should see:
   - ✅ Installing dependencies
   - ✅ Building
   - ✅ Starting server
   - ✅ "Server running on port 10000"

✅ **Checkpoint**: Deployment should complete successfully
✅ **Checkpoint**: Copy your backend URL (e.g., `https://virallens-backend.onrender.com`)
   - You'll see this at the top of the page

**⚠️ Note**: First deployment takes longer. Subsequent deployments are faster.

---

## Part 2: Deploy Frontend to Vercel

### Step 2.1: Sign Up for Vercel
1. Open your browser and go to: **https://vercel.com**
2. Click **"Sign Up"** (top right)
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account
5. Complete any additional verification if prompted

✅ **Checkpoint**: You should now be logged into Vercel dashboard

---

### Step 2.2: Import Project
1. Click **"Add New..."** button (top right)
2. Select **"Project"** from dropdown
3. You'll see your GitHub repositories
4. Find: `AdarshPandey011/AI-Customer-Support-Agent`
5. Click **"Import"** next to it

✅ **Checkpoint**: You should see the project configuration page

---

### Step 2.3: Configure Frontend Project

Configure the following:

**Project Name**: (Auto-filled, you can change it)

**Framework Preset**: Should auto-detect `Vite` ✅

**Root Directory**: Click **"Edit"** and set to: `client`
   - This is important! Change from `.` to `client`

**Build and Output Settings**:
- **Build Command**: Should be `npm run build` (auto-filled) ✅
- **Output Directory**: Should be `dist` (auto-filled) ✅
- **Install Command**: Should be `npm install` (auto-filled) ✅

✅ **Checkpoint**: Configuration should show:
```
Framework Preset: Vite
Root Directory: client
Build Command: npm run build
Output Directory: dist
```

---

### Step 2.4: Add Environment Variables

Before deploying, add environment variable:

1. Scroll down to **"Environment Variables"** section
2. Click **"Add"** or find the input field
3. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://virallens-backend.onrender.com/api` 
     (Replace with YOUR backend URL from Step 1.5)
4. Click **"Add"** or press Enter

✅ **Checkpoint**: `VITE_API_URL` should be listed in environment variables

---

### Step 2.5: Deploy Frontend
1. Scroll down and click **"Deploy"** button
2. Wait for deployment (usually 2-3 minutes)
3. Watch the build logs - you should see:
   - ✅ Installing dependencies
   - ✅ Building
   - ✅ Deploying
   - ✅ "Ready"

✅ **Checkpoint**: Deployment completes successfully
✅ **Checkpoint**: Copy your frontend URL (e.g., `https://ai-customer-support-agent.vercel.app`)
   - You'll see this after deployment completes
   - Click on it to visit your site

---

## Part 3: Update Backend CORS

### Step 3.1: Update CLIENT_URL in Render
1. Go back to **Render dashboard** (https://render.com)
2. Click on your backend service (`virallens-backend`)
3. Go to **"Environment"** tab
4. Find `CLIENT_URL` environment variable
5. Click the **pencil icon** to edit
6. Update value to your **Vercel frontend URL** (from Step 2.5)
   - Example: `https://ai-customer-support-agent.vercel.app`
   - ⚠️ **Important**: Include `https://` but NO trailing slash
7. Click **"Save Changes"**

### Step 3.2: Redeploy Backend
1. After saving, Render will show "Manual Deploy" option
2. Click **"Manual Deploy"** → **"Deploy latest commit"**
3. Wait for redeployment (usually faster, ~2-3 minutes)

✅ **Checkpoint**: Backend redeploys with updated CORS settings

---

## Part 4: Test Your Application

### Step 4.1: Test Frontend
1. Visit your Vercel frontend URL
2. You should see the login/signup page
3. Check browser console (F12) for any errors

### Step 4.2: Test Signup
1. Click "Sign Up"
2. Create a test account
3. Should redirect to chat page

### Step 4.3: Test Chat
1. Type a message in the chat
2. Should get AI response
3. Test sending multiple messages

### Step 4.4: Test Chat History
1. Click "Chat History" in header
2. Should see your previous conversations

✅ **Checkpoint**: All features working correctly

---

## 🗄️ MongoDB Atlas Setup (If Needed)

### If you don't have MongoDB Atlas yet:

#### Step 1: Create Account
1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up with email or GitHub
4. Choose **"Build a database"** → **"FREE"** tier

#### Step 2: Create Cluster
1. Choose **"M0 FREE"** cluster
2. Select a **cloud provider** (AWS recommended)
3. Choose **region** closest to you
4. Click **"Create"** (takes 3-5 minutes)

#### Step 3: Database Access
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username (e.g., `admin`)
5. Click **"Autogenerate Secure Password"** or create your own
6. **COPY THE PASSWORD** (you'll need it!)
7. Click **"Add User"**

#### Step 4: Network Access
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for simplicity)
   - Or add specific IPs: `0.0.0.0/0`
4. Click **"Confirm"**

#### Step 5: Get Connection String
1. Go to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**
5. Version: **5.5 or later**
6. **Copy the connection string**
   - Looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
7. Replace:
   - `<username>` with your database username
   - `<password>` with your database password
   - Add database name: `/virallens` before the `?`
   - Final: `mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/virallens?retryWrites=true&w=majority`

#### Step 6: Use in Render
1. Use this connection string as `MONGODB_URI` in Render environment variables

✅ **Checkpoint**: MongoDB Atlas is set up and connected

---

## 🔧 Troubleshooting

### Backend Issues

**Service won't start:**
- Check build logs in Render
- Verify all environment variables are set
- Check that `Root Directory` is `server`

**Database connection fails:**
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string format
- Ensure password is correct (no special character issues)

**Port errors:**
- Render uses port from `PORT` env var or assigns one
- Make sure `PORT` env var is set to `10000`

### Frontend Issues

**Can't connect to backend:**
- Verify `VITE_API_URL` is correct in Vercel
- Check backend URL is accessible
- Ensure backend is not sleeping (wait 30 seconds after first request)

**CORS errors:**
- Verify `CLIENT_URL` in Render matches Vercel URL exactly
- Include `https://` but no trailing slash
- Redeploy backend after updating

**Build fails:**
- Check that `Root Directory` is set to `client`
- Verify `Build Command` is `npm run build`
- Check build logs in Vercel

---

## ✅ Final Checklist

- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] MongoDB Atlas connected
- [ ] All environment variables set
- [ ] CORS updated with frontend URL
- [ ] Can access frontend URL
- [ ] Can sign up
- [ ] Can login
- [ ] Chat works
- [ ] Chat history works

---

## 🎉 You're Done!

Your application is now live:
- **Frontend**: Your Vercel URL
- **Backend**: Your Render URL
- **Status**: 🟢 Production Ready

Share your frontend URL with others to test!

---

## 📞 Quick Reference

**Render Dashboard**: https://dashboard.render.com
**Vercel Dashboard**: https://vercel.com/dashboard
**MongoDB Atlas**: https://cloud.mongodb.com

**Need Help?**
- Check logs in Render/Vercel dashboards
- Check browser console (F12)
- Review environment variables are correct
