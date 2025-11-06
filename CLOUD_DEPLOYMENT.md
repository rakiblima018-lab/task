# Cloud Deployment Guide - PC Off থাকলেও Bot চলবে! ☁️

## Option 1: Render.com (FREE) ⭐ Recommended

### Step 1: Create Account
1. https://render.com এ যান
2. Sign up করুন (GitHub account দিয়ে সহজ)

### Step 2: Deploy Bot
1. Dashboard → New → Web Service
2. Connect your GitHub repository (অথবা manual deploy)
3. Settings:
   - **Name**: telegram-bot-taskjob
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node bot-simple.js`
   - **Plan**: Free

### Step 3: Environment Variables (যদি প্রয়োজন হয়)
- Add any environment variables if needed

### Step 4: Deploy
- Click "Create Web Service"
- Bot automatically deploy হবে

**✅ Free Tier Features:**
- 750 hours/month free
- Auto-restart on crash
- Free SSL
- Logs available

---

## Option 2: Railway.app (FREE)

### Step 1: Create Account
1. https://railway.app এ যান
2. Sign up করুন

### Step 2: Deploy
1. New Project → Deploy from GitHub
2. Select your repository
3. Railway automatically detect Node.js
4. Start command: `node bot-simple.js`

### Step 3: Settings
- Add environment variables if needed
- Railway automatically handles the rest

**✅ Free Tier:**
- $5 credit/month
- Auto-deploy
- Free SSL

---

## Option 3: Fly.io (FREE)

### Step 1: Install Fly CLI
```bash
# Windows: Download from https://fly.io/docs/getting-started/installing-flyctl/
# Or use PowerShell:
iwr https://fly.io/install.ps1 -useb | iex
```

### Step 2: Login
```bash
fly auth login
```

### Step 3: Create App
```bash
fly launch
```

### Step 4: Deploy
```bash
fly deploy
```

**✅ Free Tier:**
- 3 shared VMs free
- 160GB outbound data transfer
- Global edge network

---

## Option 4: DigitalOcean App Platform ($5/month)

### Step 1: Create Account
1. https://www.digitalocean.com এ যান
2. Sign up করুন ($200 credit for new users)

### Step 2: Deploy
1. Create → Apps → GitHub
2. Select repository
3. Configure:
   - Build Command: `npm install`
   - Run Command: `node bot-simple.js`
   - Plan: Basic ($5/month)

**✅ Features:**
- Always on
- Auto-scaling
- Free SSL
- 99.99% uptime

---

## Option 5: Heroku (Paid - $7/month)

### Step 1: Install Heroku CLI
Download from: https://devcenter.heroku.com/articles/heroku-cli

### Step 2: Login
```bash
heroku login
```

### Step 3: Create App
```bash
heroku create telegram-bot-taskjob
```

### Step 4: Deploy
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### Step 5: Start Worker
```bash
heroku ps:scale worker=1
```

---

## Quick Setup Scripts

### For Render.com:
1. GitHub-এ code push করুন
2. Render.com-এ connect করুন
3. Auto-deploy হবে!

### For Railway:
1. GitHub-এ code push করুন
2. Railway-এ connect করুন
3. Auto-deploy হবে!

---

## Important Files for Deployment:

✅ `package.json` - Dependencies
✅ `bot-simple.js` - Bot code
✅ `Procfile` - For Heroku/Railway
✅ `render.yaml` - For Render.com
✅ `.gitignore` - Exclude node_modules

---

## Environment Variables (if needed):

Some platforms might need:
- `BOT_TOKEN` - Your Telegram bot token
- `FIREBASE_URL` - Firebase database URL

Add these in your hosting platform's environment variables section.

---

## Best Free Option: Render.com ⭐

**Why Render?**
- ✅ Completely FREE
- ✅ Easy setup
- ✅ Auto-restart
- ✅ Free SSL
- ✅ Logs available
- ✅ No credit card needed

**Steps:**
1. Sign up at render.com
2. New Web Service
3. Connect GitHub
4. Deploy!

---

## After Deployment:

### Check Bot Status:
- View logs in your hosting dashboard
- Test by sending `/start` to your bot

### Monitor:
- Most platforms provide monitoring dashboards
- Check logs regularly

---

## Cost Comparison:

| Platform | Cost | Best For |
|----------|------|----------|
| Render.com | FREE | Best free option |
| Railway.app | FREE ($5 credit) | Easy deployment |
| Fly.io | FREE | Global network |
| DigitalOcean | $5/month | Production use |
| Heroku | $7/month | Established platform |

---

## Recommendation:

**For Free:** Use **Render.com** - easiest and most reliable free option!

**For Production:** Use **DigitalOcean** - $5/month, very reliable!

---

## Need Help?

1. Check platform documentation
2. View deployment logs
3. Test bot after deployment
4. Monitor for errors

