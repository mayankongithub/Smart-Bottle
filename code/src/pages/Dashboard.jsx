import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  Droplet, 
  Battery, 
  Wifi, 
  Check, 
  AlertCircle, 
  Bell, 
  Clock,
  TrendingUp,
  Award,
  Zap,
  Sun,
  Moon,
  Coffee
} from 'lucide-react';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockWeeklyData = [
  { day: 'Mon', volume: 2.4, goal: 3.0 },
  { day: 'Tue', volume: 2.8, goal: 3.0 },
  { day: 'Wed', volume: 2.1, goal: 3.0 },
  { day: 'Thu', volume: 3.2, goal: 3.0 },
  { day: 'Fri', volume: 2.5, goal: 3.0 },
  { day: 'Sat', volume: 1.9, goal: 3.0 },
  { day: 'Sun', volume: 1.8, goal: 3.0 },
];

const mockTodayData = [
  { time: '8 AM', ml: 250 },
  { time: '10 AM', ml: 450 },
  { time: '12 PM', ml: 800 },
  { time: '2 PM', ml: 1050 },
  { time: '4 PM', ml: 1450 },
  { time: '6 PM', ml: 1800 },
];

const mockActivityTimeline = [
  { time: '08:00 AM', event: 'Morning hydration - 250ml', type: 'drink', icon: Coffee, color: 'green' },
  { time: '08:45 AM', event: 'Reminder sent', type: 'reminder', icon: Bell, color: 'blue' },
  { time: '09:30 AM', event: 'Cap opened', type: 'action', icon: Droplet, color: 'cyan' },
  { time: '10:15 AM', event: 'Drank 200ml', type: 'drink', icon: Check, color: 'green' },
  { time: '11:00 AM', event: 'Reminder ignored', type: 'alert', icon: AlertCircle, color: 'amber' },
  { time: '11:45 AM', event: 'Drank 350ml', type: 'drink', icon: Check, color: 'green' },
  { time: '01:30 PM', event: 'Afternoon boost - 250ml', type: 'drink', icon: Sun, color: 'green' },
  { time: '03:20 PM', event: 'Drank 400ml', type: 'drink', icon: Check, color: 'green' },
  { time: '04:15 PM', event: 'RGB Light blinked (Blue)', type: 'light', icon: Zap, color: 'purple' },
];

const mockDailyGoal = {
  current: 1.8,
  target: 3.0,
  percentage: 60,
  streakDays: 7,
};

const mockDeviceStatus = {
  isOnline: true,
  batteryLevel: 85,
  deviceName: 'HydroSmart Cap Pro',
  lastSync: '2 min ago',
  rgbStatus: 'Active - Blue',
};

const mockUpcomingReminders = [
  { time: '05:00 PM', status: 'upcoming', interval: 45 },
  { time: '05:45 PM', status: 'upcoming', interval: 45 },
  { time: '06:30 PM', status: 'upcoming', interval: 45 },
];

// ============================================================================
// DASHBOARD PAGE
// ============================================================================

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('today');

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Welcome back! 👋</h1>
          <p className="text-gray-500 mt-1">Stay hydrated and maintain your health goals</p>
        </div>
        
        {/* Device Status Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Droplet className="w-7 h-7 text-white" />
              </div>
              <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${mockDeviceStatus.isOnline ? 'bg-green-500' : 'bg-red-500'} ring-2 ring-white animate-pulse`}></div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{mockDeviceStatus.deviceName}</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Battery className="w-4 h-4 text-green-600" />
                  <span>{mockDeviceStatus.batteryLevel}%</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <Wifi className="w-4 h-4" />
                  <span>Online</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-1">Synced {mockDeviceStatus.lastSync}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStatCard
          icon={Droplet}
          label="Today's Intake"
          value={`${mockDailyGoal.current}L`}
          subtitle={`${mockDailyGoal.percentage}% of goal`}
          color="blue"
          trend="+15%"
        />
        <QuickStatCard
          icon={Award}
          label="Streak"
          value={`${mockDailyGoal.streakDays} days`}
          subtitle="Keep it up!"
          color="amber"
        />
        <QuickStatCard
          icon={Bell}
          label="Next Reminder"
          value={mockUpcomingReminders[0].time}
          subtitle="In 25 minutes"
          color="purple"
        />
        <QuickStatCard
          icon={Zap}
          label="RGB Status"
          value={mockDeviceStatus.rgbStatus}
          subtitle="Tap to customize"
          color="cyan"
        />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

        {/* Daily Goal Widget */}
        <div className="lg:col-span-1">
          <DailyGoalWidget data={mockDailyGoal} />
        </div>

        {/* Today's Progress Chart */}
        <div className="lg:col-span-2">
          <TodayProgressWidget data={mockTodayData} />
        </div>

        {/* Weekly Trend */}
        <div className="lg:col-span-2">
          <WeeklyTrendWidget data={mockWeeklyData} />
        </div>

        {/* Upcoming Reminders */}
        <div className="lg:col-span-1">
          <UpcomingRemindersWidget reminders={mockUpcomingReminders} />
        </div>

        {/* Activity Timeline */}
        <div className="lg:col-span-2">
          <ActivityTimelineWidget activities={mockActivityTimeline} />
        </div>

        {/* Health Insights */}
        <div className="lg:col-span-1">
          <HealthInsightsWidget />
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// QUICK STAT CARD
// ============================================================================

const QuickStatCard = ({ icon: Icon, label, value, subtitle, color, trend }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-cyan-500',
    amber: 'from-amber-500 to-orange-500',
    purple: 'from-purple-500 to-pink-500',
    cyan: 'from-cyan-500 to-teal-500',
    green: 'from-green-500 to-emerald-500',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 hover:shadow-lg transition-shadow h-full">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg whitespace-nowrap">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-xs lg:text-sm text-gray-500">{label}</p>
        <p className="text-xl lg:text-2xl font-bold text-gray-800 mt-1 break-words">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>
    </div>
  );
};

// ============================================================================
// DAILY GOAL WIDGET
// ============================================================================

const DailyGoalWidget = ({ data }) => {
  const { current, target, percentage, streakDays } = data;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 lg:mb-6">Today's Goal</h2>

      <div className="flex flex-col items-center justify-center flex-1 py-4">
        {/* Circular Progress Ring */}
        <div className="relative w-40 h-40 lg:w-48 lg:h-48">
          <svg className="transform -rotate-90 w-40 h-40 lg:w-48 lg:h-48">
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

        {/* Streak Badge */}
        <div className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full flex items-center gap-2">
          <Award className="w-5 h-5" />
          <span className="font-semibold">{streakDays} Day Streak!</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// TODAY'S PROGRESS WIDGET
// ============================================================================

const TodayProgressWidget = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 lg:mb-6">Today's Progress</h2>

      <div className="flex-1 min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis
            dataKey="time"
            stroke="#9CA3AF"
            style={{ fontSize: '14px' }}
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: '14px' }}
            label={{ value: 'Milliliters', angle: -90, position: 'insideLeft', style: { fill: '#6B7280' } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value) => [`${value}ml`, 'Intake']}
          />
          <Line
            type="monotone"
            dataKey="ml"
            stroke="#3B82F6"
            strokeWidth={3}
            fill="url(#lineGradient)"
            dot={{ fill: '#3B82F6', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

// ============================================================================
// WEEKLY TREND WIDGET
// ============================================================================

const WeeklyTrendWidget = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 lg:mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Weekly Trend</h2>
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-lg">
          <TrendingUp className="w-4 h-4" />
          <span className="font-medium">+12% vs last week</span>
        </div>
      </div>

      <div className="flex-1 min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
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
          <Bar
            dataKey="goal"
            fill="#E5E7EB"
            radius={[8, 8, 0, 0]}
            maxBarSize={60}
            opacity={0.3}
          />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

// ============================================================================
// UPCOMING REMINDERS WIDGET
// ============================================================================

const UpcomingRemindersWidget = ({ reminders }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Next Reminders</h2>
        <Bell className="w-5 h-5 text-blue-500" />
      </div>

      <div className="space-y-3">
        {reminders.map((reminder, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{reminder.time}</p>
                <p className="text-xs text-gray-500">Every {reminder.interval} min</p>
              </div>
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        ))}

        <button className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow">
          Customize Schedule
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// ACTIVITY TIMELINE WIDGET
// ============================================================================

const ActivityTimelineWidget = ({ activities }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 lg:mb-6">Today's Activity</h2>

      <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          const isLast = index === activities.length - 1;

          const colorClasses = {
            green: 'bg-green-100 text-green-600',
            blue: 'bg-blue-100 text-blue-600',
            cyan: 'bg-cyan-100 text-cyan-600',
            amber: 'bg-amber-100 text-amber-600',
            purple: 'bg-purple-100 text-purple-600',
          };

          return (
            <div key={index} className="flex gap-4 relative">
              {/* Timeline Line */}
              {!isLast && (
                <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-200"></div>
              )}

              {/* Icon Circle */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${colorClasses[activity.color]}`}>
                <Icon className="w-5 h-5" />
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
// HEALTH INSIGHTS WIDGET
// ============================================================================

const HealthInsightsWidget = () => {
  const insights = [
    {
      title: "Great Progress!",
      message: "You've met your goal 5 out of 7 days this week.",
      icon: Award,
      color: "green"
    },
    {
      title: "Morning Routine",
      message: "Try drinking water right after waking up.",
      icon: Sun,
      color: "amber"
    },
    {
      title: "Evening Reminder",
      message: "Don't forget to hydrate before bed.",
      icon: Moon,
      color: "purple"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 h-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 lg:mb-6">Health Insights</h2>

      <div className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const colorClasses = {
            green: 'from-green-500 to-emerald-500',
            amber: 'from-amber-500 to-orange-500',
            purple: 'from-purple-500 to-pink-500',
          };

          return (
            <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${colorClasses[insight.color]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">{insight.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{insight.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
