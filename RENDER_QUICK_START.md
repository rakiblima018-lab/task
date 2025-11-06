# Render.com Quick Start (Easiest & FREE) 🚀

## Step-by-Step Guide:

### Step 1: GitHub-এ Code Push করুন

1. GitHub account তৈরি করুন (যদি না থাকে)
2. New repository তৈরি করুন
3. Code push করুন:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

### Step 2: Render.com Setup

1. **Sign Up**: https://render.com
   - GitHub account দিয়ে sign up করুন (সবচেয়ে সহজ)

2. **New Web Service**:
   - Dashboard → "New +" → "Web Service"
   - "Connect GitHub" click করুন
   - আপনার repository select করুন

3. **Configure**:
   - **Name**: `telegram-bot-taskjob`
   - **Environment**: `Node`
   - **Region**: Choose closest (Singapore recommended for Bangladesh)
   - **Branch**: `main`
   - **Root Directory**: `.` (leave empty)
   - **Build Command**: `npm install`
   - **Start Command**: `node bot-simple.js`
   - **Plan**: `Free`

4. **Advanced Settings** (Optional):
   - Auto-Deploy: Yes
   - Health Check Path: Leave empty

5. **Create Web Service**:
   - Click "Create Web Service"
   - Render automatically deploy করবে

### Step 3: Wait for Deployment

- Build process শুরু হবে
- 2-3 minutes লাগবে
- "Live" status দেখলে bot running!

### Step 4: Test Bot

1. Telegram-এ আপনার bot-এ যান
2. `/start` command send করুন
3. Bot response করলে success! ✅

---

## Important Notes:

### ✅ Free Tier Includes:
- 750 hours/month (enough for 24/7)
- Auto-restart on crash
- Free SSL certificate
- Logs available
- No credit card needed

### ⚠️ Free Tier Limitations:
- Service sleeps after 15 minutes of inactivity (but wakes up on request)
- For always-on, consider paid plan ($7/month)

### 🔧 If Bot Sleeps:
- First request might take 30 seconds
- Bot will wake up automatically
- Or upgrade to paid plan for always-on

---

## Monitor Your Bot:

1. **View Logs**:
   - Render Dashboard → Your Service → Logs
   - Real-time logs দেখতে পারবেন

2. **Check Status**:
   - Dashboard-এ service status দেখবেন
   - Green = Running
   - Yellow = Deploying
   - Red = Error

---

## Update Bot Code:

1. Code change করুন locally
2. GitHub-এ push করুন:
   ```bash
   git add .
   git commit -m "Update bot"
   git push
   ```
3. Render automatically redeploy করবে!

---

## Troubleshooting:

### Bot not responding?
- Check logs in Render dashboard
- Verify bot token is correct
- Check if service is running

### Deployment failed?
- Check build logs
- Verify `package.json` is correct
- Check Node.js version compatibility

### Bot sleeping?
- First request after sleep takes time
- Consider upgrading to paid plan for always-on

---

## Upgrade to Always-On ($7/month):

1. Render Dashboard → Your Service
2. Settings → Plan
3. Select "Starter" plan ($7/month)
4. Bot will always be on!

---

## Success! 🎉

এখন আপনার bot:
- ✅ 24/7 running থাকবে
- ✅ PC off থাকলেও চলবে
- ✅ Auto-restart হবে
- ✅ Free hosting!

**Test করুন এবং enjoy করুন!** 🚀

