import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Target, 
    ArrowLeft, 
    Loader2, 
    CheckCircle2, 
    XCircle,
    Calendar,
    TrendingUp,
    BarChart2,
    Clock
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const AddGoal = () => {
    const [goalType, setGoalType] = useState('');
    const [targetValue, setTargetValue] = useState('');
    const [currentValue, setCurrentValue] = useState(0);
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('not-started');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Emit custom event when goalType changes
        const event = new CustomEvent('goalTypeChanged', { 
            detail: { goalType } 
        });
        window.dispatchEvent(event);
    }, [goalType]);

    // Dynamically update labels based on goalType
    const getLabelForTargetValue = () => {
        switch (goalType) {
            case 'trees':
                return 'Tree Counts';
            case 'waste':
                return 'Waste (kg)';
            case 'water-saved':
                return 'Water Saved (liters)';
            case 'plastic-collected':
                return 'Plastic Collected (kg)';
            case 'awareness-events':
                return 'Number of Events';
            case 'carbon-reduction':
                return 'Tons of Carbon';
            case 'energy-saving':
                return 'Kilowatt Hours';
            default:
                return 'Target Value';
        }
    };

    const getLabelForCurrentValue = () => {
        switch (goalType) {
            case 'trees':
                return 'Current Tree Count';
            case 'waste':
                return 'Current Waste Recycled (kg)';
            case 'water-saved':
                return 'Current Water Saved (liters)';
            case 'plastic-collected':
                return 'Current Plastic Collected (kg)';
            case 'awareness-events':
                return 'Current Number of Events';
            case 'carbon-reduction':
                return 'Current Carbon Reduction (Tons)';
            case 'energy-saving':
                return 'Current Energy Saved (kWh)';
            default:
                return 'Current Value';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validate that the end date is after the start date
        if (new Date(endDate) <= new Date(startDate)) {
            setError('End date must be after the start date.');
            setLoading(false);
            return;
        }

        // Validate that the target and current values are positive numbers
        if (targetValue <= 0 || currentValue < 0) {
            setError('Target and current values must be positive numbers.');
            setLoading(false);
            return;
        }

        const goalData = {
            goalType,
            targetValue,
            currentValue,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            status
        };

        try {
            const response = await fetch('http://localhost:5000/api/goals/addgoal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(goalData)
            });

            if (!response.ok) {
                throw new Error('Failed to add goal');
            }

            const data = await response.json();
            console.log('Goal added:', data);
            setSuccess(true);
            
            // Emit custom event for new goal activity
            const activityEvent = new CustomEvent('newGoalActivity', {
                detail: {
                    goalType,
                    targetValue,
                    timestamp: new Date().toISOString()
                }
            });
            window.dispatchEvent(activityEvent);
            
            // Reset form after successful submission
            setGoalType('');
            setTargetValue('');
            setCurrentValue(0);
            setStartDate(new Date().toISOString().split('T')[0]);
            setEndDate('');
            setStatus('not-started');

            // Navigate after a short delay to show success message
            setTimeout(() => {
                navigate('/adminGoal');
            }, 1500);
        } catch (error) {
            console.error('Error adding goal:', error);
            setError('Failed to add goal. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={() => navigate('/adminGoal')}
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Goals
                        </button>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            Add New Goal
                        </h2>
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center animate-fade-in">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                            <p className="text-green-700">Goal added successfully!</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                            <XCircle className="w-5 h-5 text-red-500 mr-3" />
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Goal Type */}
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700 flex items-center">
                                <Target className="w-5 h-5 mr-2 text-green-500" />
                                Goal Type
                            </label>
                            <select
                                value={goalType}
                                onChange={(e) => setGoalType(e.target.value)}
                                className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                required
                            >
                                <option value="">Select Goal Type</option>
                                <option value="trees">Tree Plantation</option>
                                <option value="waste">Waste Recycled</option>
                                <option value="water-saved">Water Saved</option>
                                <option value="plastic-collected">Plastic Collected</option>
                                <option value="awareness-events">Awareness Events</option>
                                <option value="carbon-reduction">Carbon Reduction</option>
                                <option value="energy-saving">Energy Saving</option>
                            </select>
                        </div>

                        {/* Target Value */}
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700 flex items-center">
                                <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                                {getLabelForTargetValue()}
                            </label>
                            <input
                                type="number"
                                value={targetValue}
                                onChange={(e) => setTargetValue(e.target.value)}
                                className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                placeholder={`Enter ${getLabelForTargetValue().toLowerCase()}`}
                                required
                            />
                        </div>

                        {/* Current Value */}
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700 flex items-center">
                                <BarChart2 className="w-5 h-5 mr-2 text-purple-500" />
                                {getLabelForCurrentValue()}
                            </label>
                            <input
                                type="number"
                                value={currentValue}
                                onChange={(e) => setCurrentValue(e.target.value)}
                                className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                placeholder={`Enter ${getLabelForCurrentValue().toLowerCase()}`}
                                required
                            />
                        </div>

                        {/* Date Range */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-lg font-medium text-gray-700 flex items-center">
                                    <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-lg font-medium text-gray-700 flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-pink-500" />
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label className="block text-lg font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                required
                            >
                                <option value="not-started">Not Started</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
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
                                    Adding Goal...
                                </>
                            ) : (
                                'Add Goal'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddGoal;
