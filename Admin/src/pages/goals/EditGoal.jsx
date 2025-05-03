import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    Target, 
    ArrowLeft, 
    Loader2, 
    CheckCircle2, 
    XCircle,
    Calendar,
    TrendingUp,
    BarChart2,
    Clock,
    Save,
    AlertCircle
} from 'lucide-react';

const EditGoal = () => {
    const [goalType, setGoalType] = useState('');
    const [targetValue, setTargetValue] = useState('');
    const [currentValue, setCurrentValue] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('not-started');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/goals/getgoal/${id}`);
                const data = await response.json();
                if (response.ok) {
                    const goal = data.data;
                    setGoalType(goal.goalType);
                    setTargetValue(goal.targetValue);
                    setCurrentValue(goal.currentValue);
                    setStartDate(new Date(goal.startDate).toISOString().split('T')[0]);
                    setEndDate(new Date(goal.endDate).toISOString().split('T')[0]);
                    setStatus(goal.status);
                } else {
                    setError('Goal not found');
                }
            } catch (error) {
                console.error('Error fetching goal data:', error);
                setError('Error fetching goal data');
            } finally {
                setLoading(false);
            }
        };

        fetchGoal();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        const updatedGoal = {
            goalType,
            targetValue,
            currentValue,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            status
        };

        try {
            const response = await fetch(`http://localhost:5000/api/goals/putgoal/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedGoal),
            });

            if (!response.ok) {
                throw new Error('Failed to update goal');
            }

            const data = await response.json();
            console.log('Goal updated:', data);
            setSuccess(true);
            
            // Navigate after a short delay to show success message
            setTimeout(() => {
                navigate('/adminGoal');
            }, 1500);
        } catch (error) {
            console.error('Error updating goal:', error);
            setError('Failed to update goal. Please try again.');
        } finally {
            setSaving(false);
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
                            Edit Goal
                        </h2>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
                        </div>
                    ) : (
                        <>
                            {/* Success Message */}
                            {success && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center animate-fade-in">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                                    <p className="text-green-700">Goal updated successfully!</p>
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
                                    <input
                                        type="text"
                                        value={goalType}
                                        onChange={(e) => setGoalType(e.target.value)}
                                        className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                        placeholder="Enter goal type"
                                        required
                                    />
                                </div>

                                {/* Target Value */}
                                <div className="space-y-2">
                                    <label className="block text-lg font-medium text-gray-700 flex items-center">
                                        <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                                        Target Value
                                    </label>
                                    <input
                                        type="number"
                                        value={targetValue}
                                        onChange={(e) => setTargetValue(e.target.value)}
                                        className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                        placeholder="Enter target value"
                                        required
                                    />
                                </div>

                                {/* Current Value */}
                                <div className="space-y-2">
                                    <label className="block text-lg font-medium text-gray-700 flex items-center">
                                        <BarChart2 className="w-5 h-5 mr-2 text-purple-500" />
                                        Current Value
                                    </label>
                                    <input
                                        type="number"
                                        value={currentValue}
                                        onChange={(e) => setCurrentValue(e.target.value)}
                                        className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                        placeholder="Enter current value"
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
                                    disabled={saving}
                                    className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Saving Changes...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditGoal;
