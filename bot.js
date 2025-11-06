// Telegram Bot Code for /start command
// Install required packages: npm install node-telegram-bot-api firebase-admin

const TelegramBot = require('node-telegram-bot-api');
const admin = require('firebase-admin');

// Firebase Admin SDK Configuration
const serviceAccount = require('./serviceAccountKey.json'); // Download from Firebase Console

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://taskjob-f0ac5-default-rtdb.firebaseio.com"
});

const db = admin.database();

// Bot Token (Replace with your bot token)
const BOT_TOKEN = '8261350826:AAHCxoLbXzRqRZIuP7qCEA3_egxdm4VGw8w';

// Create bot instance
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Web App URL
const WEB_APP_URL = 'https://waaletlima.blogspot.com/';

// Handle /start command
bot.onText(/\/start(.*)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id.toString();
    const userName = msg.from.first_name || msg.from.username || 'User';
    const startParam = match[1] ? match[1].trim() : null;

    try {
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
                        url: 'https://youtube.com/your-tutorial-video' // Replace with your video URL
                    }
                ]
            ]
        };

        // Send welcome message with buttons
        await bot.sendMessage(chatId, welcomeMessage, {
            reply_markup: keyboard,
            parse_mode: 'HTML'
        });

        // Save user to Firebase (optional)
        const userRef = db.ref(`users/${userId}`);
        await userRef.update({
            name: userName,
            username: msg.from.username || '',
            firstSeen: admin.database.ServerValue.TIMESTAMP,
            lastSeen: admin.database.ServerValue.TIMESTAMP
        });

        // Handle referral if start parameter exists
        if (startParam && startParam !== userId && startParam !== 'default') {
            await handleReferral(userId, startParam);
        }

    } catch (error) {
        console.error('Error handling /start command:', error);
        bot.sendMessage(chatId, 'দুঃখিত, একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
});

// Handle referral
async function handleReferral(newUserId, referrerId) {
    try {
        const newUserRef = db.ref(`users/${newUserId}`);
        const referrerRef = db.ref(`users/${referrerId}`);

        // Check if new user already has a referrer
        const newUserSnapshot = await newUserRef.once('value');
        if (newUserSnapshot.exists() && newUserSnapshot.val().referredBy) {
            return; // Already referred
        }

        // Check if referrer exists
        const referrerSnapshot = await referrerRef.once('value');
        if (!referrerSnapshot.exists()) {
            return; // Referrer doesn't exist
        }

        // Get settings for referral bonus
        const settingsRef = db.ref('settings');
        const settingsSnapshot = await settingsRef.once('value');
        const settings = settingsSnapshot.val() || {};
        const referralBonus = parseFloat(settings.referralBonus || 10);

        // Update new user
        await newUserRef.update({
            referredBy: referrerId,
            referredAt: admin.database.ServerValue.TIMESTAMP
        });

        // Update referrer
        const referrerData = referrerSnapshot.val();
        const currentBalance = parseFloat(referrerData.balance || 0);
        const currentReferrals = parseInt(referrerData.referrals || 0);

        await referrerRef.update({
            balance: currentBalance + referralBonus,
            referrals: currentReferrals + 1,
            lastUpdated: admin.database.ServerValue.TIMESTAMP
        });

        // Add to referrer's history
        const historyRef = db.ref(`users/${referrerId}/history`);
        await historyRef.push({
            type: 'referral',
            amount: referralBonus,
            referredUserId: newUserId,
            date: new Date().toISOString(),
            timestamp: Date.now()
        });

        console.log(`Referral processed: ${newUserId} referred by ${referrerId}`);
    } catch (error) {
        console.error('Error handling referral:', error);
    }
}

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

    await bot.sendMessage(chatId, helpMessage, {
        reply_markup: keyboard
    });
});

console.log('Bot is running...');


