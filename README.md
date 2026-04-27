# 🚰 IoT Hydration Dashboard

A modern, premium health dashboard for tracking water intake from a smart water bottle cap. Built with React, Tailwind CSS, and Recharts.

![Dashboard Preview](https://img.shields.io/badge/React-18.2-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-cyan) ![Recharts](https://img.shields.io/badge/Recharts-2.10-green)

## ✨ Features

### 📊 **Dashboard Widgets**

1. **Header Section**
   - Personalized greeting
   - Real-time device status (battery level, connectivity)

2. **Daily Goal Widget**
   - Beautiful circular progress indicator
   - Current intake vs. daily goal visualization
   - Gradient ring animation

3. **Weekly Trend Chart**
   - 7-day bar chart showing hydration patterns
   - Responsive Recharts visualization
   - Water-themed color palette

4. **Activity Timeline**
   - Chronological event feed
   - Timestamped drinking events
   - Icon-based activity indicators
   - Scrollable timeline

5. **Device Controls**
   - Smart reminder toggle switch
   - Configurable alert intervals (30/45/60 min)
   - Real-time status updates

## 🚀 Quick Start

### Prerequisites

- **Node.js 20.x LTS or higher** (Required!)
- npm 10+ (comes with Node.js)

### ⚠️ IMPORTANT: Check Your Node.js Version

```bash
node --version
# Must be v20.x or higher!
```

If you have an older version, **update Node.js first**:
1. Download from: https://nodejs.org/
2. Install the **LTS version** (v20.x or v22.x)
3. Restart your terminal

See **INSTALL_GUIDE.md** for detailed instructions.

### Installation

**Option 1: Automated (Recommended)**

Double-click `install.bat` or run in PowerShell:
```powershell
.\install.ps1
```

**Option 2: Manual**

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack (Latest Versions - April 2026)

- **React 18.3.1** - UI framework with functional components and hooks
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Recharts 2.13.3** - Composable charting library
- **Lucide React 0.468.0** - Beautiful hand-crafted icons
- **Vite 6.0.5** - Next-generation frontend build tool

## 📁 Project Structure

```
bottle_dashboard/
├── src/
│   ├── components/
│   │   └── Dashboard.jsx      # Main dashboard component (all widgets)
│   ├── App.jsx                 # Root application component
│   ├── index.jsx               # React entry point
│   └── index.css               # Tailwind directives & global styles
├── index.html                  # HTML template
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔌 Backend Integration Guide

The dashboard currently uses **mock data** for demonstration. To connect to your IoT backend:

### 1. **Daily Goal Data**

Replace `mockDailyGoal` with an API call:

```javascript
// In Dashboard.jsx
useEffect(() => {
  fetch('/api/hydration/today')
    .then(res => res.json())
    .then(data => setDailyGoal(data));
}, []);
```

Expected API response:
```json
{
  "current": 1.8,
  "target": 3.0,
  "percentage": 60
}
```

### 2. **Weekly Trend Data**

Replace `mockWeeklyData` with:

```javascript
fetch('/api/hydration/weekly')
  .then(res => res.json())
  .then(data => setWeeklyData(data));
```

Expected format:
```json
[
  { "day": "Mon", "volume": 2.4 },
  { "day": "Tue", "volume": 2.8 }
]
```

### 3. **Activity Timeline**

Replace `mockActivityTimeline` with:

```javascript
fetch('/api/hydration/activity/today')
  .then(res => res.json())
  .then(data => setActivities(data));
```

### 4. **Device Status**

```javascript
fetch('/api/device/status')
  .then(res => res.json())
  .then(data => setDeviceStatus(data));
```

### 5. **Device Control Updates**

When users toggle reminders or change intervals:

```javascript
// POST request to update settings
const handleReminderToggle = async () => {
  await fetch('/api/device/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      remindersEnabled: !remindersEnabled 
    })
  });
  setRemindersEnabled(!remindersEnabled);
};
```

## 🎨 Design Philosophy

- **Apple Health Inspired** - Clean, minimal, and premium feel
- **Water Theme** - Blue/cyan gradients throughout
- **Mobile-First** - Fully responsive grid layout
- **Accessibility** - High contrast, readable fonts, proper ARIA labels
- **Performance** - Optimized animations and lazy loading

## 📱 Responsive Breakpoints

- **Mobile**: Single column layout (< 1024px)
- **Desktop**: Multi-column grid (≥ 1024px)

## 🎯 Future Enhancements

- [ ] Real-time WebSocket updates
- [ ] Historical data export (CSV/PDF)
- [ ] User profile management
- [ ] Dark mode support
- [ ] Push notifications
- [ ] Multi-device support
- [ ] Hydration goals customization
- [ ] Achievement badges

## 📄 License

MIT License - feel free to use this for your IoT projects!

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

---

Built with ❤️ for better hydration habits
