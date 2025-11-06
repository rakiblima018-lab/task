# Permanent Server Setup Guide (Windows)

## Method 1: PM2 (Recommended) ✅

### Step 1: Install PM2 (Already Done)
```bash
npm install -g pm2
```

### Step 2: Start Bot Permanently
```bash
# Option A: Use the batch file
start-permanent.bat

# Option B: Manual commands
pm2 start bot-simple.js --name telegram-bot
pm2 save
pm2 startup
```

### Step 3: PM2 Commands
```bash
# Check bot status
pm2 status

# View logs
pm2 logs telegram-bot

# Restart bot
pm2 restart telegram-bot

# Stop bot
pm2 stop telegram-bot

# Delete bot from PM2
pm2 delete telegram-bot

# View detailed info
pm2 show telegram-bot

# Monitor (real-time)
pm2 monit
```

### Step 4: Auto-start on Windows Boot
After running `pm2 startup`, PM2 will give you a command to run as Administrator. Copy that command and run it in Administrator Command Prompt.

## Method 2: Windows Task Scheduler

### Step 1: Create Startup Script
1. Open Task Scheduler (search in Windows)
2. Create Basic Task
3. Name: "Telegram Bot Startup"
4. Trigger: When computer starts
5. Action: Start a program
6. Program: `node`
7. Arguments: `C:\Users\applo\OneDrive\Desktop\New folder (12)\bot-simple.js`
8. Start in: `C:\Users\applo\OneDrive\Desktop\New folder (12)`

## Method 3: NSSM (Windows Service)

### Step 1: Download NSSM
Download from: https://nssm.cc/download

### Step 2: Install as Service
```bash
nssm install TelegramBot "C:\Program Files\nodejs\node.exe" "C:\Users\applo\OneDrive\Desktop\New folder (12)\bot-simple.js"
nssm start TelegramBot
```

## Method 4: Using Forever (Alternative)

```bash
npm install -g forever
forever start bot-simple.js
forever list
forever stop bot-simple.js
```

## Recommended: PM2 Setup

### Quick Start:
1. Run `start-permanent.bat`
2. Follow the instructions
3. Bot will run permanently!

### Verify It's Running:
```bash
pm2 status
```

You should see:
```
┌─────┬─────────────────────┬─────────┬─────────┬─────────┐
│ id  │ name                │ status  │ restart │ uptime  │
├─────┼─────────────────────┼─────────┼─────────┼─────────┤
│ 0   │ telegram-bot-taskjob │ online  │ 0       │ 5m      │
└─────┴─────────────────────┴─────────┴─────────┴─────────┘
```

## Troubleshooting

### Bot not starting?
- Check logs: `pm2 logs`
- Check if port is available
- Verify bot token is correct

### Bot stops after restart?
- Run `pm2 save` after starting
- Run `pm2 startup` to enable auto-start

### View real-time logs?
```bash
pm2 logs --lines 50
```

## Important Notes

1. **Keep Computer On**: Bot needs your computer to be running
2. **Internet Required**: Bot needs internet connection
3. **Firewall**: Make sure firewall allows Node.js
4. **VPS Option**: For 24/7 operation, consider using a VPS (DigitalOcean, AWS, etc.)

## Cloud Hosting Options (24/7)

### Free Options:
- **Render.com** - Free tier available
- **Railway.app** - Free tier available
- **Fly.io** - Free tier available

### Paid Options:
- **DigitalOcean** - $5/month
- **AWS EC2** - Pay as you go
- **Google Cloud Platform** - Free tier available


