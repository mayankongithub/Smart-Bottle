import React, { useState } from 'react';
import { 
  Smartphone,
  Battery,
  Wifi,
  WifiOff,
  Zap,
  Power,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Info,
  AlertCircle,
  CheckCircle,
  Bluetooth,
  Radio,
  Droplet,
  Lightbulb
} from 'lucide-react';

const DeviceControl = () => {
  const [deviceStatus, setDeviceStatus] = useState({
    connected: true,
    battery: 85,
    firmwareVersion: 'v2.3.1',
    lastSync: new Date().toLocaleTimeString(),
    bluetoothEnabled: true,
    rgbEnabled: true,
    temperature: 22,
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [rgbPreview, setRgbPreview] = useState({ r: 59, g: 130, b: 246 }); // Blue

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setDeviceStatus({ ...deviceStatus, lastSync: new Date().toLocaleTimeString() });
    }, 2000);
  };

  const handleRestart = () => {
    if (confirm('Are you sure you want to restart the device?')) {
      alert('Device restarting...');
    }
  };

  const handleFactoryReset = () => {
    if (confirm('WARNING: This will erase all device settings. Continue?')) {
      alert('Factory reset initiated...');
    }
  };

  const updateRgbPreview = (channel, value) => {
    setRgbPreview({ ...rgbPreview, [channel]: value });
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Device Control</h1>
        <p className="text-gray-500 mt-1">Manage your HydroSmart Cap hardware</p>
      </header>

      {/* Connection Status Banner */}
      <div className={`p-6 rounded-2xl border-2 ${
        deviceStatus.connected 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
          : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
              deviceStatus.connected 
                ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                : 'bg-gradient-to-br from-red-500 to-orange-500'
            }`}>
              {deviceStatus.connected ? (
                <CheckCircle className="w-8 h-8 text-white" />
              ) : (
                <AlertCircle className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {deviceStatus.connected ? 'Connected' : 'Disconnected'}
              </h2>
              <p className="text-sm text-gray-600">
                {deviceStatus.connected 
                  ? `Last synced: ${deviceStatus.lastSync}` 
                  : 'Please check your connection'}
              </p>
            </div>
          </div>
          <button
            onClick={handleSync}
            disabled={isSyncing || !deviceStatus.connected}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-800 rounded-xl font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
      </div>

      {/* Device Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard
          icon={Battery}
          label="Battery Level"
          value={`${deviceStatus.battery}%`}
          color="green"
          status={deviceStatus.battery > 20 ? 'Good' : 'Low'}
        />
        <InfoCard
          icon={Bluetooth}
          label="Bluetooth"
          value={deviceStatus.bluetoothEnabled ? 'Connected' : 'Disconnected'}
          color="blue"
          status={deviceStatus.bluetoothEnabled ? 'Active' : 'Inactive'}
        />
        <InfoCard
          icon={Zap}
          label="Firmware"
          value={deviceStatus.firmwareVersion}
          color="purple"
          status="Up to date"
        />
      </div>

      {/* Main Control Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        
        {/* RGB Light Control */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">RGB Light Control</h2>
          </div>

          {/* RGB Preview */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Live Preview</p>
            <div
              className="w-full h-32 rounded-xl border-4 border-gray-200 shadow-lg transition-all duration-300"
              style={{
                backgroundColor: `rgb(${rgbPreview.r}, ${rgbPreview.g}, ${rgbPreview.b})`,
                boxShadow: `0 0 40px rgba(${rgbPreview.r}, ${rgbPreview.g}, ${rgbPreview.b}, 0.6)`
              }}
            ></div>
          </div>

          {/* RGB Sliders */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Red: <span className="text-red-600">{rgbPreview.r}</span>
              </label>
              <input
                type="range"
                min="0"
                max="255"
                value={rgbPreview.r}
                onChange={(e) => updateRgbPreview('r', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Green: <span className="text-green-600">{rgbPreview.g}</span>
              </label>
              <input
                type="range"
                min="0"
                max="255"
                value={rgbPreview.g}
                onChange={(e) => updateRgbPreview('g', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blue: <span className="text-blue-600">{rgbPreview.b}</span>
              </label>
              <input
                type="range"
                min="0"
                max="255"
                value={rgbPreview.b}
                onChange={(e) => updateRgbPreview('b', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <button className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow">
              Apply to Device
            </button>
          </div>
        </div>

        {/* Device Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Device Actions</h2>
          </div>

          <div className="space-y-4">
            {/* Restart Device */}
            <button
              onClick={handleRestart}
              className="w-full flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Power className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">Restart Device</p>
                <p className="text-xs text-gray-500">Reboot the bottle cap</p>
              </div>
            </button>

            {/* Toggle Bluetooth */}
            <button
              onClick={() => setDeviceStatus({ ...deviceStatus, bluetoothEnabled: !deviceStatus.bluetoothEnabled })}
              className="w-full flex items-center gap-3 p-4 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                <Bluetooth className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">Bluetooth: {deviceStatus.bluetoothEnabled ? 'ON' : 'OFF'}</p>
                <p className="text-xs text-gray-500">Toggle Bluetooth connection</p>
              </div>
            </button>

            {/* Update Firmware */}
            <button className="w-full flex items-center gap-3 p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">Update Firmware</p>
                <p className="text-xs text-gray-500">Current: {deviceStatus.firmwareVersion}</p>
              </div>
            </button>

            {/* Export Data */}
            <button className="w-full flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl transition-colors">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">Export Data</p>
                <p className="text-xs text-gray-500">Download your hydration history</p>
              </div>
            </button>

            {/* Factory Reset */}
            <button
              onClick={handleFactoryReset}
              className="w-full flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">Factory Reset</p>
                <p className="text-xs text-gray-500">Erase all settings</p>
              </div>
            </button>
          </div>
        </div>

        {/* Device Specs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Device Specifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpecItem label="Model" value="HydroSmart Cap Pro" />
            <SpecItem label="Serial Number" value="HSC-2026-4271" />
            <SpecItem label="Firmware" value={deviceStatus.firmwareVersion} />
            <SpecItem label="Battery Type" value="Li-ion 500mAh" />
            <SpecItem label="Connectivity" value="Bluetooth 5.0" />
            <SpecItem label="RGB LEDs" value="12 RGB LEDs" />
            <SpecItem label="Water Resistance" value="IPX7" />
            <SpecItem label="Operating Temp" value="-10°C to 50°C" />
            <SpecItem label="Warranty" value="2 Years" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// INFO CARD COMPONENT
// ============================================================================

const InfoCard = ({ icon: Icon, label, value, color, status }) => {
  const colorClasses = {
    green: 'from-green-500 to-emerald-500',
    blue: 'from-blue-500 to-cyan-500',
    purple: 'from-purple-500 to-pink-500',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
      <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-lg inline-block">
        {status}
      </div>
    </div>
  );
};

// ============================================================================
// SPEC ITEM COMPONENT
// ============================================================================

const SpecItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
};

export default DeviceControl;
