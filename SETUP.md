# 🚀 Setup & Installation Guide

## Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install:
- React 18.2
- Recharts 2.10 (for charts)
- Lucide React 0.303 (for icons)
- Tailwind CSS 3.4
- Vite 5.0 (build tool)

## Step 2: Start Development Server

```bash
npm run dev
```

The dashboard will be available at: **http://localhost:5173**

## Step 3: View the Dashboard

Open your browser and navigate to the local server URL. You should see:

✅ **Header** with device status (85% battery, Online)  
✅ **Daily Goal Widget** showing 60% progress (1.8L / 3.0L)  
✅ **Weekly Trend Chart** with 7 days of data  
✅ **Activity Timeline** with today's events  
✅ **Device Controls** with reminder toggle and interval selector  

## 🎨 Customization

### Change Daily Goal

Edit `src/components/Dashboard.jsx`:

```javascript
const mockDailyGoal = {
  current: 2.5,  // Change this
  target: 4.0,   // Change this
  percentage: 62.5,
};
```

### Add More Activity Events

```javascript
const mockActivityTimeline = [
  { time: '10:00 AM', event: 'Drank 200ml', type: 'drink', icon: Check },
  // Add more events here
];
```

### Modify Weekly Data

```javascript
const mockWeeklyData = [
  { day: 'Mon', volume: 2.4 },
  // Edit volumes here
];
```

## 🔧 Troubleshooting

### Port Already in Use

If port 5173 is busy:

```bash
npm run dev -- --port 3000
```

### Tailwind Styles Not Loading

1. Make sure `index.css` has Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. Restart the dev server:
```bash
# Stop server (Ctrl+C)
npm run dev
```

### Icons Not Showing

Check that `lucide-react` is installed:
```bash
npm list lucide-react
```

If missing:
```bash
npm install lucide-react
```

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder. Deploy to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 🌐 Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite config
4. Click "Deploy"

Done! 🎉

## 💡 Next Steps

1. **Connect to Backend**: See README.md "Backend Integration Guide"
2. **Add Authentication**: Implement user login
3. **WebSocket Updates**: Real-time data streaming
4. **Dark Mode**: Add theme toggle
5. **Mobile App**: Convert to React Native

## 📞 Need Help?

- Check the README.md for detailed documentation
- Review the component code in `src/components/Dashboard.jsx`
- All mock data is clearly marked with `// TODO: Replace with actual API call`

---

Happy coding! 💧
