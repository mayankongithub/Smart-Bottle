# 🚀 Installation Guide - IoT Hydration Dashboard

## ⚠️ IMPORTANT: Update Node.js First!

Your current Node.js version is **v14.21.3** which is outdated.  
You need **Node.js 20.x LTS** (latest) to run this project.

---

## Step 1️⃣: Update Node.js to Latest LTS

### **Option A: Direct Download (Easiest)**

1. **Download**: Go to https://nodejs.org/
2. Click **"Download Node.js (LTS)"** - Should be v20.x or v22.x
3. Run the installer (`.msi` file)
4. Restart your terminal/PowerShell
5. Verify installation:

```bash
node --version
# Should show v20.x.x or higher
```

### **Option B: Using Winget (Windows 11)**

```bash
winget install OpenJS.NodeJS.LTS
```

### **Option C: Using NVM for Windows**

1. Download NVM from: https://github.com/coreybutler/nvm-windows/releases
2. Install `nvm-setup.exe`
3. Open new PowerShell and run:

```bash
nvm install 20
nvm use 20
node --version
```

---

## Step 2️⃣: Install Project Dependencies

After updating Node.js, open PowerShell in the project folder:

```bash
cd C:\bottle_dashboard

# Delete old node_modules if they exist
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# Install latest dependencies
npm install
```

This will install:
- ✅ React 18.3.1 (latest)
- ✅ Recharts 2.13.3 (latest charts library)
- ✅ Lucide React 0.468.0 (latest icons)
- ✅ Tailwind CSS 3.4.17 (latest)
- ✅ Vite 6.0.5 (latest build tool)

---

## Step 3️⃣: Start Development Server

```bash
npm run dev
```

You should see:

```
  VITE v6.0.5  ready in 450 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Open **http://localhost:5173** in your browser! 🎉

---

## 🐛 Troubleshooting

### Problem: "UnhandledPromiseRejectionWarning: SyntaxError: Unexpected token '??='"

**Solution**: Your Node.js is too old. Follow Step 1 to update.

---

### Problem: Port 5173 already in use

**Solution**: Use a different port:
```bash
npm run dev -- --port 3000
```

---

### Problem: "Cannot find module 'vite'"

**Solution**: Reinstall dependencies:
```bash
Remove-Item -Recurse -Force node_modules
npm install
```

---

### Problem: Blank white screen

**Solution**: Check browser console (F12). Make sure all files are in correct locations:
```
src/
├── components/
│   └── Dashboard.jsx
├── App.jsx
├── index.jsx
└── index.css
```

---

## ✅ Verify Everything Works

After running `npm run dev`, you should see:

1. **Header** with "Hello, User 👋"
2. **Device Status** card (85% battery, Online)
3. **Daily Goal Widget** showing circular progress (60%)
4. **Weekly Trend Chart** with 7 bars
5. **Activity Timeline** with events
6. **Device Controls** with toggle switch

---

## 📦 Latest Package Versions (April 2026)

```json
"dependencies": {
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "recharts": "^2.13.3",
  "lucide-react": "^0.468.0"
},
"devDependencies": {
  "@vitejs/plugin-react": "^4.3.4",
  "autoprefixer": "^10.4.20",
  "postcss": "^8.4.49",
  "tailwindcss": "^3.4.17",
  "vite": "^6.0.5"
}
```

---

## 🎯 Next Steps After Installation

1. ✅ Verify dashboard loads
2. ✅ Test responsive design (resize browser)
3. ✅ Toggle reminders ON/OFF
4. ✅ Click different interval buttons (30/45/60 min)
5. 📝 Customize mock data in `Dashboard.jsx`
6. 🔌 Connect to your backend API

---

## 💡 Quick Commands Reference

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check Node.js version
node --version

# Check npm version
npm --version
```

---

## 🆘 Still Having Issues?

1. Make sure Node.js is **v20.x or higher**: `node --version`
2. Delete `node_modules` and reinstall: `Remove-Item -Recurse node_modules; npm install`
3. Clear npm cache: `npm cache clean --force`
4. Restart your terminal/VS Code

---

**Happy Coding! 💧✨**
