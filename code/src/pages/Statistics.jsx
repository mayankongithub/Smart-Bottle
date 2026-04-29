import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  Award,
  Target,
  Calendar,
  Droplet,
  Clock,
  Flame,
  Medal,
  Trophy
} from 'lucide-react';

// ============================================================================
// MOCK DATA
// ============================================================================

const monthlyData = [
  { month: 'Jan', intake: 85, goal: 100 },
  { month: 'Feb', intake: 78, goal: 100 },
  { month: 'Mar', intake: 92, goal: 100 },
  { month: 'Apr', intake: 88, goal: 100 },
  { month: 'May', intake: 95, goal: 100 },
  { month: 'Jun', intake: 90, goal: 100 },
];

const dailyPatternData = [
  { hour: '6 AM', avg: 150 },
  { hour: '8 AM', avg: 320 },
  { hour: '10 AM', avg: 450 },
  { hour: '12 PM', avg: 680 },
  { hour: '2 PM', avg: 520 },
  { hour: '4 PM', avg: 390 },
  { hour: '6 PM', avg: 310 },
  { hour: '8 PM', avg: 180 },
];

const weekdayData = [
  { day: 'Mon', value: 2.8 },
  { day: 'Tue', value: 3.1 },
  { day: 'Wed', value: 2.6 },
  { day: 'Thu', value: 3.2 },
  { day: 'Fri', value: 2.9 },
  { day: 'Sat', value: 2.4 },
  { day: 'Sun', value: 2.2 },
];

const achievementsData = [
  { name: '7-Day Streak', icon: Flame, color: 'orange', unlocked: true, date: 'Apr 20, 2026' },
  { name: '30-Day Streak', icon: Trophy, color: 'amber', unlocked: true, date: 'Apr 15, 2026' },
  { name: 'Early Bird', icon: Medal, color: 'blue', unlocked: true, date: 'Apr 10, 2026' },
  { name: 'Hydration Master', icon: Award, color: 'purple', unlocked: false, date: 'Locked' },
  { name: '100% Week', icon: Target, color: 'green', unlocked: true, date: 'Apr 5, 2026' },
  { name: 'Marathon', icon: Trophy, color: 'cyan', unlocked: false, date: 'Locked' },
];

const complianceData = [
  { name: 'Completed', value: 22, color: '#10B981' },
  { name: 'Partial', value: 6, color: '#F59E0B' },
  { name: 'Missed', value: 2, color: '#EF4444' },
];

// ============================================================================
// STATISTICS PAGE
// ============================================================================

const Statistics = () => {
  const [timeRange, setTimeRange] = useState('month');

  const stats = [
    { label: 'Avg Daily', value: '2.8L', trend: '+12%', up: true },
    { label: 'Best Streak', value: '30 days', trend: 'Current', up: true },
    { label: 'Compliance', value: '87%', trend: '+5%', up: true },
    { label: 'Total Intake', value: '84L', trend: 'This month', up: true },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Statistics</h1>
          <p className="text-gray-500 mt-1">Track your hydration journey</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-200">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium text-sm capitalize transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </header>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                stat.up ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">

        {/* Monthly Trend */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Monthly Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '14px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '14px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}%`, 'Achievement']}
              />
              <Area
                type="monotone"
                dataKey="intake"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#areaGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Pattern */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Daily Drinking Pattern</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyPatternData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="hour" stroke="#9CA3AF" style={{ fontSize: '14px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '14px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}ml`, 'Avg Intake']}
              />
              <Line
                type="monotone"
                dataKey="avg"
                stroke="#06B6D4"
                strokeWidth={3}
                dot={{ fill: '#06B6D4', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Weekday Performance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Weekday Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weekdayData}>
              <defs>
                <linearGradient id="weekdayGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" stroke="#9CA3AF" style={{ fontSize: '14px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '14px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}L`, 'Intake']}
              />
              <Bar
                dataKey="value"
                fill="url(#weekdayGradient)"
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Goal Compliance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Goal Compliance (30 Days)</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={complianceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {complianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`${value} days`, 'Count']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {complianceData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievementsData.map((achievement, index) => {
            const Icon = achievement.icon;
            const colorClasses = {
              orange: 'from-orange-500 to-red-500',
              amber: 'from-amber-500 to-orange-500',
              blue: 'from-blue-500 to-cyan-500',
              purple: 'from-purple-500 to-pink-500',
              green: 'from-green-500 to-emerald-500',
              cyan: 'from-cyan-500 to-teal-500',
            };

            return (
              <div
                key={index}
                className={`p-6 rounded-2xl border-2 transition-all ${
                  achievement.unlocked
                    ? 'border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg'
                    : 'border-dashed border-gray-300 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                    achievement.unlocked
                      ? `bg-gradient-to-br ${colorClasses[achievement.color]}`
                      : 'bg-gray-300'
                  }`}>
                    <Icon className={`w-8 h-8 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{achievement.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {achievement.unlocked ? `Unlocked: ${achievement.date}` : achievement.date}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
