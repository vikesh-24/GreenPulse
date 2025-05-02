import React, { useState } from 'react';
import { 
    Settings2, 
    Bell, 
    Lock, 
    Palette, 
    Mail, 
    Shield, 
    Save, 
    Loader2,
    CheckCircle2,
    XCircle,
    ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [darkMode, setDarkMode] = useState(false);  // Dark mode state
    const [settings, setSettings] = useState({
        notifications: true,
        emailUpdates: true,
        twoFactorAuth: false,
        language: 'en',
        timezone: 'UTC'
    });

    // Handle changes for form inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'darkMode') {
            setDarkMode(checked);
            return;
        }
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError('Failed to save settings. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen py-10 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>
            <div className="max-w-4xl mx-auto">
                <div className={`bg-white/80 ${darkMode ? 'dark:bg-gray-800/80' : ''} backdrop-blur-lg rounded-xl shadow-lg p-8`}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Dashboard
                        </button>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center">
                            <Settings2 className="w-8 h-8 mr-3" />
                            Settings
                        </h2>
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center animate-fade-in">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                            <p className="text-green-700">Settings saved successfully!</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                            <XCircle className="w-5 h-5 text-red-500 mr-3" />
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Notifications Section */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <div className="flex items-center mb-4">
                                <Bell className="w-6 h-6 text-blue-500 mr-3" />
                                <h3 className="text-xl font-semibold text-gray-800">Notifications</h3>
                            </div>
                            <div className="space-y-4">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        name="notifications"
                                        checked={settings.notifications}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-green-500 rounded focus:ring-green-500"
                                    />
                                    <span className="text-gray-700">Enable notifications</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        name="emailUpdates"
                                        checked={settings.emailUpdates}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-green-500 rounded focus:ring-green-500"
                                    />
                                    <span className="text-gray-700">Email updates</span>
                                </label>
                            </div>
                        </div>

                        {/* Security Section */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <div className="flex items-center mb-4">
                                <Shield className="w-6 h-6 text-purple-500 mr-3" />
                                <h3 className="text-xl font-semibold text-gray-800">Security</h3>
                            </div>
                            <div className="space-y-4">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        name="twoFactorAuth"
                                        checked={settings.twoFactorAuth}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-green-500 rounded focus:ring-green-500"
                                    />
                                    <span className="text-gray-700">Two-factor authentication</span>
                                </label>
                            </div>
                        </div>

                        {/* Appearance Section */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <div className="flex items-center mb-4">
                                <Palette className="w-6 h-6 text-pink-500 mr-3" />
                                <h3 className="text-xl font-semibold text-gray-800">Appearance</h3>
                            </div>
                            <div className="space-y-4">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        name="darkMode"
                                        checked={darkMode}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-green-500 rounded focus:ring-green-500"
                                    />
                                    <span className="text-gray-700">Dark mode</span>
                                </label>
                            </div>
                        </div>

                        {/* Preferences Section */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <div className="flex items-center mb-4">
                                <Mail className="w-6 h-6 text-indigo-500 mr-3" />
                                <h3 className="text-xl font-semibold text-gray-800">Preferences</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Language
                                    </label>
                                    <select
                                        name="language"
                                        value={settings.language}
                                        onChange={handleChange}
                                        className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Timezone
                                    </label>
                                    <select
                                        name="timezone"
                                        value={settings.timezone}
                                        onChange={handleChange}
                                        className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    >
                                        <option value="UTC">UTC</option>
                                        <option value="EST">Eastern Time</option>
                                        <option value="PST">Pacific Time</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Saving Changes...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    Save Settings
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
