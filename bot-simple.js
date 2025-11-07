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

// Initialize task settings with Monetager ads script
async function initializeTaskSettings() {
    try {
        const taskSettingsRef = `${FIREBASE_URL}/taskSettings.json`;
        const currentSettings = await axios.get(taskSettingsRef).catch(() => ({ data: null }));
        
        // Monetager ads script
        const adsScript = `<script src='//libtl.com/sdk.js' data-zone='10151928' data-sdk='show_10151928'></script>`;
        
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
            console.log('✅ Task settings initialized with Monetager ads script');
        } else {
            // Update only adsScript if it's different
            if (currentSettings.data.adsScript !== adsScript) {
                await axios.patch(taskSettingsRef, {
                    adsScript: adsScript,
                    updatedAt: new Date().toISOString(),
                    updatedBy: 'bot-update'
                });
                console.log('✅ Monetager ads script updated in task settings');
            } else {
                console.log('ℹ️  Monetager ads script already configured');
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

// Error handling
bot.on('polling_error', (error) => {
    console.error('❌ Polling error:', error);
});

bot.on('error', (error) => {
    console.error('❌ Bot error:', error);
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

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
        status: 'ok', 
        message: 'Bot is running',
        timestamp: new Date().toISOString()
    }));
});

server.listen(PORT, () => {
    console.log(`🌐 HTTP server listening on port ${PORT}`);
    console.log('✅ Bot is running and ready to receive messages!');
    console.log('📱 Test by sending /start to your bot');
});


