import React, { useState } from 'react';
import {
  Bell,
  BellOff,
  Clock,
  Palette,
  Zap,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Coffee,
  Sunset,
  Sparkles,
  Save,
  RotateCcw,
  Droplet
} from 'lucide-react';

const Settings = () => {
  // Reminder Settings
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [reminderInterval, setReminderInterval] = useState(45);
  const [smartReminders, setSmartReminders] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // RGB Light Settings
  const [rgbEnabled, setRgbEnabled] = useState(true);
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [lightPattern, setLightPattern] = useState('pulse');
  const [brightness, setBrightness] = useState(75);
  
  // Time-based Settings
  const [morningTime, setMorningTime] = useState('08:00');
  const [eveningTime, setEveningTime] = useState('22:00');
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  
  // Daily Goal
  const [dailyGoal, setDailyGoal] = useState(3.0);

  const rgbColors = [
    { name: 'Blue', hex: '#3B82F6', gradient: 'from-blue-500 to-blue-600' },
    { name: 'Green', hex: '#10B981', gradient: 'from-green-500 to-green-600' },
    { name: 'Purple', hex: '#8B5CF6', gradient: 'from-purple-500 to-purple-600' },
    { name: 'Pink', hex: '#EC4899', gradient: 'from-pink-500 to-pink-600' },
    { name: 'Cyan', hex: '#06B6D4', gradient: 'from-cyan-500 to-cyan-600' },
    { name: 'Amber', hex: '#F59E0B', gradient: 'from-amber-500 to-amber-600' },
    { name: 'Red', hex: '#EF4444', gradient: 'from-red-500 to-red-600' },
    { name: 'Teal', hex: '#14B8A6', gradient: 'from-teal-500 to-teal-600' },
  ];

  const lightPatterns = [
    { id: 'solid', name: 'Solid', icon: Sparkles },
    { id: 'pulse', name: 'Pulse', icon: Zap },
    { id: 'blink', name: 'Blink', icon: Sparkles },
    { id: 'rainbow', name: 'Rainbow', icon: Palette },
  ];

  const handleSaveSettings = () => {
    // TODO: Save settings to backend
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    setRemindersEnabled(true);
    setReminderInterval(45);
    setSmartReminders(true);
    setRgbEnabled(true);
    setSelectedColor('#3B82F6');
    setLightPattern('pulse');
    setBrightness(75);
    setDailyGoal(3.0);
    alert('Settings reset to defaults!');
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-1">Customize your HydroSmart experience</p>
      </header>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
        <button
          onClick={handleResetSettings}
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Reset to Default
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        
        {/* Reminder Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Reminder Settings</h2>
          </div>

          <div className="space-y-6">
            {/* Enable Reminders */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {remindersEnabled ? (
                  <Bell className="w-5 h-5 text-blue-600" />
                ) : (
                  <BellOff className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <p className="font-medium text-gray-700">Enable Reminders</p>
                  <p className="text-xs text-gray-500">Get notified to drink water</p>
                </div>
              </div>
              
              <button
                onClick={() => setRemindersEnabled(!remindersEnabled)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  remindersEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    remindersEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Reminder Interval */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Reminder Interval: <span className="text-blue-600">{reminderInterval} minutes</span>
              </label>
              <input
                type="range"
                min="15"
                max="120"
                step="15"
                value={reminderInterval}
                onChange={(e) => setReminderInterval(Number(e.target.value))}
                disabled={!remindersEnabled}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>15 min</span>
                <span>60 min</span>
                <span>120 min</span>
              </div>
            </div>

            {/* Quick Interval Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Quick Select</label>
              <div className="grid grid-cols-4 gap-2">
                {[30, 45, 60, 90].map((interval) => (
                  <button
                    key={interval}
                    onClick={() => setReminderInterval(interval)}
                    disabled={!remindersEnabled}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      reminderInterval === interval && remindersEnabled
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md'
                        : remindersEnabled
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {interval}m
                  </button>
                ))}
              </div>
            </div>

            {/* Smart Reminders */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Smart Reminders</p>
                <p className="text-xs text-gray-500">AI-powered timing based on activity</p>
              </div>
              <button
                onClick={() => setSmartReminders(!smartReminders)}
                disabled={!remindersEnabled}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  smartReminders && remindersEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    smartReminders && remindersEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Sound Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-blue-600" />
                ) : (
                  <VolumeX className="w-5 h-5 text-gray-400" />
                )}
                <div>
                  <p className="font-medium text-gray-700">Sound Alerts</p>
                  <p className="text-xs text-gray-500">Play sound with reminders</p>
                </div>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                disabled={!remindersEnabled}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  soundEnabled && remindersEnabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    soundEnabled && remindersEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* RGB Light Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">RGB Light Settings</h2>
          </div>

          <div className="space-y-6">
            {/* Enable RGB */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Enable RGB Light</p>
                <p className="text-xs text-gray-500">Visual alerts on bottle cap</p>
              </div>
              <button
                onClick={() => setRgbEnabled(!rgbEnabled)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  rgbEnabled ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    rgbEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Color Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Light Color</label>
              <div className="grid grid-cols-4 gap-3">
                {rgbColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color.hex)}
                    disabled={!rgbEnabled}
                    className={`relative h-14 rounded-xl bg-gradient-to-br ${color.gradient} transition-all ${
                      selectedColor === color.hex ? 'ring-4 ring-offset-2 ring-gray-300 scale-110' : ''
                    } ${!rgbEnabled ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'}`}
                  >
                    {selectedColor === color.hex && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-gray-800" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Light Pattern */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Light Pattern</label>
              <div className="grid grid-cols-2 gap-3">
                {lightPatterns.map((pattern) => {
                  const Icon = pattern.icon;
                  return (
                    <button
                      key={pattern.id}
                      onClick={() => setLightPattern(pattern.id)}
                      disabled={!rgbEnabled}
                      className={`flex items-center gap-2 p-3 rounded-xl transition-all ${
                        lightPattern === pattern.id && rgbEnabled
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md'
                          : rgbEnabled
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{pattern.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brightness */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Brightness: <span className="text-purple-600">{brightness}%</span>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="10"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                disabled={!rgbEnabled}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Quiet Hours</h2>
          </div>

          <div className="space-y-6">
            {/* Enable Quiet Hours */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-700">Enable Quiet Hours</p>
                <p className="text-xs text-gray-500">No reminders during sleep time</p>
              </div>
              <button
                onClick={() => setQuietHoursEnabled(!quietHoursEnabled)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  quietHoursEnabled ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    quietHoursEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Evening Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Sunset className="w-4 h-4" />
                  Sleep Time (Quiet starts)
                </div>
              </label>
              <input
                type="time"
                value={eveningTime}
                onChange={(e) => setEveningTime(e.target.value)}
                disabled={!quietHoursEnabled}
                className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  !quietHoursEnabled ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              />
            </div>

            {/* Morning Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  Wake Time (Quiet ends)
                </div>
              </label>
              <input
                type="time"
                value={morningTime}
                onChange={(e) => setMorningTime(e.target.value)}
                disabled={!quietHoursEnabled}
                className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  !quietHoursEnabled ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              />
            </div>

            {/* Preview */}
            {quietHoursEnabled && (
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-sm text-indigo-800">
                  🌙 Quiet hours: <span className="font-semibold">{eveningTime}</span> to{' '}
                  <span className="font-semibold">{morningTime}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Daily Goal */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Droplet className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Daily Goal</h2>
          </div>

          <div className="space-y-6">
            {/* Goal Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Target: <span className="text-cyan-600 text-xl font-bold">{dailyGoal.toFixed(1)}L</span>
              </label>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>1.0L</span>
                <span>3.0L</span>
                <span>5.0L</span>
              </div>
            </div>

            {/* Preset Goals */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Recommended Presets</label>
              <div className="grid grid-cols-3 gap-3">
                {[2.0, 2.5, 3.0, 3.5, 4.0].map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setDailyGoal(goal)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                      dailyGoal === goal
                        ? 'bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {goal}L
                  </button>
                ))}
              </div>
            </div>

            {/* Health Info */}
            <div className="p-4 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl border border-cyan-100">
              <div className="flex items-start gap-3">
                <Coffee className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-cyan-900">Health Tip</p>
                  <p className="text-xs text-cyan-700 mt-1">
                    Adults should drink 2-3 liters of water daily. Adjust based on activity level and climate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
