# GitHub Upload Guide - কোন Files Upload করবেন? 📤

## ✅ GitHub-এ Upload করতে হবে (Required Files):

### Bot Files:
- ✅ `bot-simple.js` - Main bot file (Render/Hostinger এর জন্য)
- ✅ `bot.js` - Alternative bot file (যদি Firebase Admin SDK ব্যবহার করেন)
- ✅ `package.json` - Dependencies list
- ✅ `Procfile` - Heroku/Railway deployment
- ✅ `render.yaml` - Render.com deployment config
- ✅ `ecosystem.config.js` - PM2 config (যদি ব্যবহার করেন)

### Web App Files:
- ✅ `index.html` - User website (Hostinger-এ host করতে হবে)
- ✅ `admin.html` - Admin panel (Hostinger-এ host করতে হবে)

### Documentation (Optional কিন্তু ভাল):
- ✅ `README.md` - Project description
- ✅ `BOT_SETUP.md` - Bot setup guide
- ✅ `CLOUD_DEPLOYMENT.md` - Deployment guide
- ✅ `RENDER_QUICK_START.md` - Quick start guide
- ✅ `PERMANENT_SETUP.md` - PM2 setup guide
- ✅ `.gitignore` - Git ignore file (IMPORTANT!)

---

## ❌ GitHub-এ Upload করবেন না (Never Upload):

### Sensitive Files:
- ❌ `serviceAccountKey.json` - Firebase service account key (SECRET!)
- ❌ `.env` - Environment variables (যদি থাকে)
- ❌ `node_modules/` - Dependencies (auto install হবে)
- ❌ `package-lock.json` - Lock file (optional, কিন্তু ignore করা ভাল)

### Logs & Temporary:
- ❌ `logs/` - Log files folder
- ❌ `*.log` - Any log files
- ❌ `.DS_Store` - Mac system files
- ❌ `Thumbs.db` - Windows system files

### IDE Files:
- ❌ `.vscode/` - VS Code settings
- ❌ `.idea/` - IntelliJ settings

---

## 📋 Complete File List for GitHub:

### Must Upload (Essential):
```
✅ bot-simple.js
✅ package.json
✅ Procfile
✅ render.yaml
✅ index.html
✅ admin.html
✅ .gitignore
```

### Should Upload (Recommended):
```
✅ ecosystem.config.js
✅ README.md (create if not exists)
✅ BOT_SETUP.md
✅ CLOUD_DEPLOYMENT.md
```

### Optional (Documentation):
```
✅ RENDER_QUICK_START.md
✅ PERMANENT_SETUP.md
✅ DEPLOYMENT_CHECKLIST.md
✅ GITHUB_UPLOAD_GUIDE.md (this file)
```

---

## 🚀 Quick Upload Steps:

### Step 1: Initialize Git (যদি না থাকে)
```bash
git init
```

### Step 2: Add .gitignore (IMPORTANT!)
```bash
# .gitignore file already exists, verify it has:
# - node_modules/
# - serviceAccountKey.json
# - logs/
# - *.log
```

### Step 3: Add Files
```bash
# Add all files (except .gitignore exclusions)
git add .

# Or add specific files:
git add bot-simple.js
git add package.json
git add Procfile
git add render.yaml
git add index.html
git add admin.html
git add .gitignore
```

### Step 4: Commit
```bash
git commit -m "Initial commit - Bot and Web App files"
```

### Step 5: Create GitHub Repository
1. GitHub.com এ যান
2. New Repository তৈরি করুন
3. Repository name: `telegram-bot-taskjob` (or any name)
4. Public বা Private করুন
5. "Create repository" click করুন

### Step 6: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## 📁 File Structure in GitHub:

```
telegram-bot-taskjob/
├── bot-simple.js          ✅ Bot code
├── bot.js                 ✅ Alternative bot (if using)
├── package.json           ✅ Dependencies
├── Procfile              ✅ Heroku/Railway
├── render.yaml           ✅ Render.com
├── ecosystem.config.js   ✅ PM2 config
├── index.html            ✅ User website
├── admin.html            ✅ Admin panel
├── .gitignore            ✅ Git ignore rules
├── README.md             ✅ Project docs
├── BOT_SETUP.md          ✅ Setup guide
├── CLOUD_DEPLOYMENT.md   ✅ Deployment guide
└── RENDER_QUICK_START.md ✅ Quick start
```

---

## ⚠️ Security Checklist:

Before pushing, verify:
- [ ] `serviceAccountKey.json` is in `.gitignore`
- [ ] No passwords/tokens in code
- [ ] `.env` files are ignored
- [ ] `node_modules/` is ignored
- [ ] Sensitive data removed

---

## 🔍 Verify Before Push:

### Check what will be uploaded:
```bash
git status
```

### See all files:
```bash
git ls-files
```

### If you see sensitive files, remove them:
```bash
git rm --cached serviceAccountKey.json
git rm --cached .env
```

---

## 📝 For Hostinger (Web Hosting):

### Files needed for Hostinger:
- ✅ `index.html` - Main user website
- ✅ `admin.html` - Admin panel

### Upload to Hostinger:
1. Hostinger cPanel/FTP login করুন
2. `public_html/` folder-এ upload করুন:
   - `index.html`
   - `admin.html`
3. Access করুন:
   - User site: `https://yourdomain.com/index.html`
   - Admin: `https://yourdomain.com/admin.html`

---

## 🎯 Summary:

### For Render.com (Bot):
Upload these to GitHub:
- ✅ `bot-simple.js`
- ✅ `package.json`
- ✅ `Procfile` or `render.yaml`
- ✅ `.gitignore`

### For Hostinger (Website):
Upload via FTP/cPanel:
- ✅ `index.html`
- ✅ `admin.html`

### Never Upload:
- ❌ `serviceAccountKey.json`
- ❌ `node_modules/`
- ❌ `logs/`
- ❌ `.env`

---

## ✅ Ready to Upload?

1. Check `.gitignore` is correct
2. Run `git status` to verify
3. Add files: `git add .`
4. Commit: `git commit -m "Initial commit"`
5. Push: `git push origin main`

**Done!** 🎉

