import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplet, Battery, Wifi, Check, AlertCircle, Bell, BellOff } from 'lucide-react';

// ============================================================================
// MOCK DATA - Replace with actual API calls to your backend
// ============================================================================

const mockWeeklyData = [
  { day: 'Mon', volume: 2.4 },
  { day: 'Tue', volume: 2.8 },
  { day: 'Wed', volume: 2.1 },
  { day: 'Thu', volume: 3.2 },
  { day: 'Fri', volume: 2.5 },
  { day: 'Sat', volume: 1.9 },
  { day: 'Sun', volume: 1.8 },
];

const mockActivityTimeline = [
  { time: '10:00 AM', event: 'Drank 200ml', type: 'drink', icon: Check },
  { time: '10:45 AM', event: 'Cap Opened', type: 'action', icon: Droplet },
  { time: '11:30 AM', event: 'Reminder Ignored', type: 'alert', icon: AlertCircle },
  { time: '12:15 PM', event: 'Drank 350ml', type: 'drink', icon: Check },
  { time: '01:30 PM', event: 'Drank 250ml', type: 'drink', icon: Check },
  { time: '02:45 PM', event: 'Cap Opened', type: 'action', icon: Droplet },
  { time: '03:20 PM', event: 'Drank 400ml', type: 'drink', icon: Check },
];

const mockDailyGoal = {
  current: 1.8,
  target: 3.0,
  percentage: 60,
};

const mockDeviceStatus = {
  isOnline: true,
  batteryLevel: 85,
  deviceName: 'Smart Bottle Cap #1',
};

// ============================================================================
// DASHBOARD COMPONENT
// ============================================================================

const Dashboard = () => {
  // State for device controls
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [reminderInterval, setReminderInterval] = useState(45); // in minutes

  // TODO: Replace with actual API call
  const handleReminderToggle = () => {
    setRemindersEnabled(!remindersEnabled);
    // API call: POST /api/device/settings { remindersEnabled: !remindersEnabled }
  };

  // TODO: Replace with actual API call
  const handleIntervalChange = (interval) => {
    setReminderInterval(interval);
    // API call: POST /api/device/settings { reminderInterval: interval }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ================================================================
            HEADER SECTION
        ================================================================ */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Hello, User 👋</h1>
            <p className="text-gray-500 mt-1">Stay hydrated and healthy</p>
          </div>
          
          {/* Device Status Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Droplet className="w-8 h-8 text-blue-500" />
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${mockDeviceStatus.isOnline ? 'bg-green-500' : 'bg-red-500'} ring-2 ring-white`}></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{mockDeviceStatus.deviceName}</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Battery className="w-4 h-4" />
                    <span>{mockDeviceStatus.batteryLevel}%</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <Wifi className="w-4 h-4" />
                    <span>Online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ================================================================
            MAIN GRID LAYOUT
        ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN - Daily Goal */}
          <div className="lg:col-span-1">
            <DailyGoalWidget data={mockDailyGoal} />
          </div>

          {/* MIDDLE COLUMN - Weekly Trend */}
          <div className="lg:col-span-2">
            <WeeklyTrendWidget data={mockWeeklyData} />
          </div>

          {/* FULL WIDTH - Activity Timeline */}
          <div className="lg:col-span-2">
            <ActivityTimelineWidget activities={mockActivityTimeline} />
          </div>

          {/* RIGHT COLUMN - Device Controls */}
          <div className="lg:col-span-1">
            <DeviceControlsWidget
              remindersEnabled={remindersEnabled}
              reminderInterval={reminderInterval}
              onReminderToggle={handleReminderToggle}
              onIntervalChange={handleIntervalChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// DAILY GOAL WIDGET - Circular Progress
// ============================================================================

const DailyGoalWidget = ({ data }) => {
  const { current, target, percentage } = data;
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Today's Goal</h2>
      
      <div className="flex flex-col items-center justify-center py-8">
        {/* Circular Progress Ring */}
        <div className="relative w-48 h-48">
          <svg className="transform -rotate-90 w-48 h-48">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="url(#blueGradient)"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-gray-800">{percentage}%</span>
            <span className="text-sm text-gray-500 mt-1">Complete</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-3xl font-bold text-blue-600">{current}L</p>
          <p className="text-gray-500 text-sm mt-1">of {target}L daily goal</p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// WEEKLY TREND WIDGET - Bar Chart
// ============================================================================

const WeeklyTrendWidget = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Weekly Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis
            dataKey="day"
            stroke="#9CA3AF"
            style={{ fontSize: '14px' }}
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: '14px' }}
            label={{ value: 'Liters', angle: -90, position: 'insideLeft', style: { fill: '#6B7280' } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value) => [`${value}L`, 'Volume']}
          />
          <Bar
            dataKey="volume"
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// ============================================================================
// ACTIVITY TIMELINE WIDGET
// ============================================================================

const ActivityTimelineWidget = ({ activities }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Today's Activity</h2>

      <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          const isLast = index === activities.length - 1;

          return (
            <div key={index} className="flex gap-4 relative">
              {/* Timeline Line */}
              {!isLast && (
                <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-gray-200"></div>
              )}

              {/* Icon Circle */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                activity.type === 'drink' ? 'bg-green-100' :
                activity.type === 'alert' ? 'bg-amber-100' :
                'bg-blue-100'
              }`}>
                <Icon className={`w-5 h-5 ${
                  activity.type === 'drink' ? 'text-green-600' :
                  activity.type === 'alert' ? 'text-amber-600' :
                  'text-blue-600'
                }`} />
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <p className="text-sm font-medium text-gray-800">{activity.event}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// DEVICE CONTROLS WIDGET
// ============================================================================

const DeviceControlsWidget = ({ remindersEnabled, reminderInterval, onReminderToggle, onIntervalChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Device Controls</h2>

      <div className="space-y-6">
        {/* Smart Reminders Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {remindersEnabled ? (
              <Bell className="w-5 h-5 text-blue-600" />
            ) : (
              <BellOff className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-sm font-medium text-gray-700">Smart Reminders</span>
          </div>

          <button
            onClick={onReminderToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              remindersEnabled ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                remindersEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100"></div>

        {/* Reminder Interval Selector */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Alert Interval</p>
          <div className="grid grid-cols-3 gap-2">
            {[30, 45, 60].map((interval) => (
              <button
                key={interval}
                onClick={() => onIntervalChange(interval)}
                disabled={!remindersEnabled}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                  reminderInterval === interval && remindersEnabled
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md'
                    : remindersEnabled
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                {interval} min
              </button>
            ))}
          </div>
        </div>

        {/* Status Message */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-xs text-blue-800">
            {remindersEnabled
              ? `You'll receive hydration reminders every ${reminderInterval} minutes.`
              : 'Reminders are currently disabled.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
