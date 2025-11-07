// Simple Telegram Bot Code for /start command (Without Firebase Admin SDK)
// Install required packages: npm install node-telegram-bot-api axios

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const http = require('http');

// Bot Token
const BOT_TOKEN = '8261350826:AAHCxoLbXzRqRZIuP7qCEA3_egxdm4VGw8w';

// Create bot instance
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Web App URL
const WEB_APP_URL = 'https://waaletlima.blogspot.com/';

// Firebase Realtime Database URL
const FIREBASE_URL = 'https://taskjob-f0ac5-default-rtdb.firebaseio.com';

console.log('🤖 Bot is starting...');

// Initialize task settings with Gigapub ads script
async function initializeTaskSettings() {
    try {
        const taskSettingsRef = `${FIREBASE_URL}/taskSettings.json`;
        const currentSettings = await axios.get(taskSettingsRef).catch(() => ({ data: null }));
        
        // Gigapub ads script
        const adsScript = `<script src="https://cdn.gigapub.com/sdk.js" data-app-id="4187"></script>`;
        
        // Default task settings
        const defaultTaskSettings = {
            channelLink: '',
            adsScript: adsScript,
            rewardAmount: 5,
            dailyLimit: 20,
            updatedAt: new Date().toISOString(),
            updatedBy: 'bot-initialization'
        };
        
        // Only update if settings don't exist or adsScript is missing
        if (!currentSettings.data || !currentSettings.data.adsScript) {
            await axios.put(taskSettingsRef, defaultTaskSettings);
            console.log('✅ Task settings initialized with Gigapub ads script');
        } else {
            // Update only adsScript if it's different
            if (currentSettings.data.adsScript !== adsScript) {
                await axios.patch(taskSettingsRef, {
                    adsScript: adsScript,
                    updatedAt: new Date().toISOString(),
                    updatedBy: 'bot-update'
                });
                console.log('✅ Gigapub ads script updated in task settings');
            } else {
                console.log('ℹ️  Gigapub ads script already configured');
            }
        }
    } catch (error) {
        console.error('❌ Error initializing task settings:', error.message);
    }
}

// Initialize task settings on bot start
initializeTaskSettings();

// Handle /start command
bot.onText(/\/start(.*)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id.toString();
    const userName = msg.from.first_name || msg.from.username || 'User';
    const startParam = match[1] ? match[1].trim() : null;

    try {
        console.log(`📥 /start command received from ${userName} (${userId})`);

        // Welcome message
        const welcomeMessage = `✓ স্বাগতম ${userName} 🎖️\n\n` +
            `আপনার ইনকামের যাত্রা শুরু করুন!\n\n` +
            `নীচের (ইনকাম শুরু করুন) বাটন থেকে Web Mini App খুলুন এবং আয় শুরু করুন।\n\n` +
            `👉 ইনকাম শুরু করুন বাটনে চাপুন।\n\n` +
            `বোঝার সুবিধার জন্য 🎥 টিউটোরিয়াল ভিডিও দেখে নিন।`;

        // Create inline keyboard with buttons
        const keyboard = {
            inline_keyboard: [
                [
                    {
                        text: 'ইনকাম শুরু করুন',
                        web_app: { url: WEB_APP_URL }
                    }
                ],
                [
                    {
                        text: 'টিউটোরিয়াল ভিডিও',
                        url: 'https://youtube.com' // Replace with your video URL
                    }
                ]
            ]
        };

        // Send welcome message with buttons
        await bot.sendMessage(chatId, welcomeMessage, {
            reply_markup: keyboard,
            parse_mode: 'HTML'
        });

        console.log(`✅ Welcome message sent to ${userName}`);

        // Handle referral if exists
        if (startParam && startParam !== userId && startParam !== 'default') {
            console.log(`🔗 Referral detected: ${userId} referred by ${startParam}`);
            await handleReferral(userId, startParam, userName);
        }

    } catch (error) {
        console.error('❌ Error handling /start command:', error);
        try {
            await bot.sendMessage(chatId, 'দুঃখিত, একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
        } catch (err) {
            console.error('Error sending error message:', err);
        }
    }
});

// Handle any text message
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    
    // Ignore if it's a command
    if (msg.text && msg.text.startsWith('/')) {
        return;
    }

    // Send help message
    const helpMessage = `আমি একটি ইনকাম করার Bot! 💰\n\n` +
        `আপনার ইনকাম শুরু করতে /start কমান্ড ব্যবহার করুন।\n\n` +
        `নীচের বাটন থেকে Web Mini App খুলুন:`;

    const keyboard = {
        inline_keyboard: [
            [
                {
                    text: 'ইনকাম শুরু করুন',
                    web_app: { url: WEB_APP_URL }
                }
            ]
        ]
    };

    try {
        await bot.sendMessage(chatId, helpMessage, {
            reply_markup: keyboard
        });
    } catch (error) {
        console.error('Error sending help message:', error);
    }
});

// Error handling with auto-restart
let restartAttempts = 0;
const MAX_RESTART_ATTEMPTS = 5;

bot.on('polling_error', (error) => {
    console.error('❌ Polling error:', error);
    
    // Auto-restart bot if polling fails
    if (error.code === 'ETELEGRAM' || error.code === 'ECONNRESET') {
        restartAttempts++;
        if (restartAttempts < MAX_RESTART_ATTEMPTS) {
            console.log(`🔄 Attempting to restart bot (attempt ${restartAttempts}/${MAX_RESTART_ATTEMPTS})...`);
            setTimeout(() => {
                bot.stopPolling();
                setTimeout(() => {
                    bot.startPolling();
                    console.log('✅ Bot polling restarted');
                }, 2000);
            }, 5000);
        } else {
            console.error('❌ Max restart attempts reached. Please check your bot token and network connection.');
        }
    }
});

bot.on('error', (error) => {
    console.error('❌ Bot error:', error);
});

// Handle bot stop and restart
process.on('SIGTERM', () => {
    console.log('⚠️ SIGTERM received, stopping bot gracefully...');
    bot.stopPolling();
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('⚠️ SIGINT received, stopping bot gracefully...');
    bot.stopPolling();
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

// Handle referral processing
async function handleReferral(newUserId, referrerId, newUserName) {
    try {
        console.log(`🔄 Processing referral: ${newUserId} referred by ${referrerId}`);
        
        // Check if new user already has a referrer
        const newUserRef = `${FIREBASE_URL}/users/${newUserId}/referredBy.json`;
        const newUserCheck = await axios.get(newUserRef);
        
        if (newUserCheck.data && newUserCheck.data !== null) {
            console.log(`⚠️ User ${newUserId} already has a referrer: ${newUserCheck.data}`);
            return; // Already referred
        }
        
        // Check if referrer exists
        const referrerRef = `${FIREBASE_URL}/users/${referrerId}.json`;
        const referrerCheck = await axios.get(referrerRef);
        
        if (!referrerCheck.data) {
            console.log(`⚠️ Referrer ${referrerId} does not exist`);
            return; // Referrer doesn't exist
        }
        
        // Get settings for referral bonus
        const settingsRef = `${FIREBASE_URL}/settings.json`;
        const settingsResponse = await axios.get(settingsRef);
        const settings = settingsResponse.data || {};
        const referralBonus = parseFloat(settings.referralBonus || 10);
        
        // Get referrer's current data
        const referrerData = referrerCheck.data;
        const currentBalance = parseFloat(referrerData.balance || 0);
        const currentReferrals = parseInt(referrerData.referrals || 0);
        
        // Update new user - set referrer
        await axios.patch(`${FIREBASE_URL}/users/${newUserId}.json`, {
            referredBy: referrerId,
            referredAt: new Date().toISOString()
        });
        
        // Update referrer - add bonus and increment count
        const newBalance = currentBalance + referralBonus;
        const newReferralCount = currentReferrals + 1;
        
        await axios.patch(`${FIREBASE_URL}/users/${referrerId}.json`, {
            balance: newBalance,
            referrals: newReferralCount,
            lastUpdated: new Date().toISOString()
        });
        
        // Add to referrer's history
        const historyData = {
            type: 'referral',
            amount: referralBonus,
            referredUserId: newUserId,
            referredUserName: newUserName,
            date: new Date().toISOString(),
            timestamp: Date.now()
        };
        
        await axios.post(`${FIREBASE_URL}/users/${referrerId}/history.json`, historyData);
        
        console.log(`✅ Referral processed successfully!`);
        console.log(`   Referrer: ${referrerId}`);
        console.log(`   New Balance: ${newBalance} BDT (was ${currentBalance})`);
        console.log(`   New Referral Count: ${newReferralCount} (was ${currentReferrals})`);
        console.log(`   Bonus Added: ${referralBonus} BDT`);
        
    } catch (error) {
        console.error('❌ Error handling referral:', error.message);
        if (error.response) {
            console.error('   Response:', error.response.data);
        }
    }
}

// Start HTTP server for Render.com (bind to port)
const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Health check endpoint
    if (req.url === '/health' || req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            status: 'ok', 
            message: 'Bot is running',
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        }));
        return;
    }

    // Verify channel subscription endpoint
    if (req.url === '/verify-subscription' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const { userId, channelUsername } = data;
                
                if (!userId || !channelUsername) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        success: false, 
                        error: 'Missing userId or channelUsername' 
                    }));
                    return;
                }

                // Extract channel username (remove @ and https://t.me/ if present)
                let cleanChannel = channelUsername.replace('@', '').replace('https://t.me/', '').trim();
                
                // Verify channel membership using Telegram Bot API
                try {
                    const member = await bot.getChatMember(`@${cleanChannel}`, parseInt(userId));
                    
                    // Check if user is a member (member, administrator, or creator)
                    const isMember = ['member', 'administrator', 'creator'].includes(member.status);
                    
                    if (isMember) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ 
                            success: true, 
                            isMember: true,
                            status: member.status,
                            message: 'User is a member of the channel'
                        }));
                        console.log(`✅ User ${userId} verified as member of @${cleanChannel}`);
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ 
                            success: true, 
                            isMember: false,
                            status: member.status,
                            message: 'User is not a member of the channel'
                        }));
                        console.log(`❌ User ${userId} is not a member of @${cleanChannel} (status: ${member.status})`);
                    }
                } catch (error) {
                    console.error('Error checking channel membership:', error.message);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 
                        success: false, 
                        error: error.message || 'Failed to verify membership',
                        details: 'Bot must be added to the channel as administrator to verify members'
                    }));
                }
            } catch (error) {
                console.error('Error parsing request:', error);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    success: false, 
                    error: 'Invalid request data' 
                }));
            }
        });
        return;
    }

    // 404 for other routes
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
        status: 'error', 
        message: 'Not found'
    }));
});

server.listen(PORT, () => {
    console.log(`🌐 HTTP server listening on port ${PORT}`);
    console.log('✅ Bot is running and ready to receive messages!');
    console.log('📱 Test by sending /start to your bot');
});

// Keep-alive mechanism to prevent Render free tier from sleeping
// Ping every 10 minutes (600000ms) - Render sleeps after 15 min inactivity
const KEEP_ALIVE_INTERVAL = 10 * 60 * 1000; // 10 minutes
const RENDER_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

function keepAlive() {
    setInterval(async () => {
        try {
            // Try external URL first (if available)
            const url = process.env.RENDER_EXTERNAL_URL 
                ? `${process.env.RENDER_EXTERNAL_URL}/health`
                : `http://localhost:${PORT}/health`;
            
            const response = await axios.get(url, { timeout: 5000 });
            console.log(`🔄 Keep-alive ping successful: ${new Date().toISOString()}`);
        } catch (error) {
            // If external URL doesn't work, try localhost
            try {
                await axios.get(`http://localhost:${PORT}/health`, { timeout: 5000 });
                console.log(`🔄 Keep-alive ping (localhost) successful: ${new Date().toISOString()}`);
            } catch (err) {
                console.error('❌ Keep-alive ping failed:', err.message);
                console.log('💡 Tip: Use external uptime monitor (UptimeRobot) for better reliability');
            }
        }
    }, KEEP_ALIVE_INTERVAL);
    
    console.log(`⏰ Keep-alive mechanism started (pinging every ${KEEP_ALIVE_INTERVAL / 60000} minutes)`);
    console.log('💡 For better reliability, use external uptime monitor like UptimeRobot');
}

// Start keep-alive after 1 minute (let server start first)
setTimeout(() => {
    keepAlive();
}, 60000);

// Also ping immediately on startup if external URL is available
if (process.env.RENDER_EXTERNAL_URL) {
    setTimeout(async () => {
        try {
            await axios.get(`${process.env.RENDER_EXTERNAL_URL}/health`, { timeout: 5000 });
            console.log('✅ Initial keep-alive ping successful');
        } catch (error) {
            console.log('⚠️ Initial keep-alive ping failed (will retry in interval)');
        }
    }, 5000);
}


