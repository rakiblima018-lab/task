# Telegram Bot Setup Guide

## Bot-এ /start Command Message Add করার জন্য

### Step 1: Node.js Install করুন
1. https://nodejs.org/ থেকে Node.js download করুন
2. Install করুন

### Step 2: Project Setup
```bash
# Terminal/Command Prompt এ এই commands run করুন:

# 1. Dependencies install করুন
npm install

# 2. Firebase Admin SDK Key download করুন
# Firebase Console > Project Settings > Service Accounts > Generate New Private Key
# Download করে project folder এ রাখুন নাম: serviceAccountKey.json
```

### Step 3: Firebase Service Account Key Setup
1. Firebase Console এ যান: https://console.firebase.google.com/
2. আপনার project select করুন: `taskjob-f0ac5`
3. Settings (⚙️) > Project Settings
4. Service Accounts tab এ যান
5. "Generate New Private Key" button click করুন
6. JSON file download করুন
7. File টা rename করুন `serviceAccountKey.json` এ
8. Project folder এ রাখুন (bot.js এর সাথে)

### Step 4: Bot Configuration
`bot.js` file এ এই values update করুন:

```javascript
// Line 15: Bot Token (আপনার bot token)
const BOT_TOKEN = '8261350826:AAHCxoLbXzRqRZIuP7qCEA3_egxdm4VGw8w';

// Line 18: Web App URL (আপনার index.html এর URL)
const WEB_APP_URL = 'https://your-domain.com/index.html';
// অথবা localhost এর জন্য:
// const WEB_APP_URL = 'http://localhost:8080/index.html';
```

### Step 5: Bot Run করুন
```bash
# Terminal এ run করুন:
npm start

# অথবা development mode এ (auto-restart):
npm run dev
```

## Bot Commands

### /start
- Welcome message দেখাবে
- "ইনকাম শুরু করুন" button থাকবে
- "টিউটোরিয়াল ভিডিও" button থাকবে
- Referral link handle করবে

## Important Notes

1. **Bot Token**: আপনার bot token secure রাখুন
2. **Web App URL**: আপনার index.html file যেখানে host করবেন সেখানকার URL দিন
3. **Firebase Key**: serviceAccountKey.json file কখনো public repository তে upload করবেন না
4. **Server**: Bot 24/7 run করার জন্য server/VPS ব্যবহার করুন

## Deployment Options

### Option 1: Local Computer (Development)
```bash
npm start
```

### Option 2: VPS/Server (Production)
- Heroku
- Railway
- DigitalOcean
- AWS EC2
- Google Cloud Platform

### Option 3: Free Hosting
- Render.com
- Fly.io
- Replit (with keep-alive)

## Troubleshooting

### Error: Cannot find module
```bash
npm install
```

### Error: Firebase authentication failed
- serviceAccountKey.json file আছে কিনা check করুন
- Firebase project settings check করুন

### Bot not responding
- Bot token সঠিক কিনা check করুন
- Internet connection check করুন
- Bot running আছে কিনা check করুন

## Support

যদি কোনো সমস্যা হয়, check করুন:
1. Bot token সঠিক আছে কিনা
2. Firebase service account key আছে কিনা
3. Web App URL সঠিক আছে কিনা
4. Node.js installed আছে কিনা



