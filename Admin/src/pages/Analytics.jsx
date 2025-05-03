import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import * as tf from '@tensorflow/tfjs';

// Mock data for demonstration
const metrics = {
  trees: [100, 150, 200, 250, 300, 400, 500],
  waste: [50, 80, 120, 160, 200, 250, 300],
  donations: [1000, 1200, 1500, 1700, 2000, 2500, 3000],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
};

// Simple linear regression prediction using TensorFlow.js
function predictNext(data) {
  const xs = tf.tensor1d(data.map((_, i) => i));
  const ys = tf.tensor1d(data);

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  return model.fit(xs, ys, { epochs: 200 }).then(() => {
    // Predict the next value
    return model.predict(tf.tensor2d([data.length], [1, 1])).dataSync()[0];
  });
}

const goalTypes = [
  { key: 'trees', label: 'Trees Planted' },
  { key: 'waste', label: 'Waste Saved (kg)' },
  { key: 'plastic-collected', label: 'Plastic Collected (kg)' },
  { key: 'awareness-events', label: 'Awareness Events' },
  { key: 'carbon-reduction', label: 'Carbon Reduction (tons)' },
  { key: 'energy-saving', label: 'Energy Saved (kWh)' },
];

const Admindashboard = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/goals/getgoal")
      .then(res => {
        setGoals(res.data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Calculate sums for each goal type
  const goalTypeSums = goalTypes.reduce((acc, { key }) => {
    acc[key] = goals
      .filter(goal => goal.goalType === key)
      .reduce((sum, goal) => sum + (goal.currentValue || 0), 0);
    return acc;
  }, {});

  const [predictions, setPredictions] = useState({
    trees: null,
    waste: null,
    donations: null,
  });

  useEffect(() => {
    async function getPredictions() {
      const [trees, waste, donations] = await Promise.all([
        predictNext(metrics.trees),
        predictNext(metrics.waste),
        predictNext(metrics.donations),
      ]);
      setPredictions({
        trees: Math.round(trees),
        waste: Math.round(waste),
        donations: Math.round(donations),
      });
    }
    getPredictions();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">GreenPulse</h1>
      {loading ? (
        <p>Loading analytics...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {goalTypes.map(({ key, label }) => (
            <div key={key} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <span className="text-lg font-semibold text-gray-700 mb-2">{label}</span>
              <span className="text-3xl font-bold text-green-600">{goalTypeSums[key]}</span>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Trees Planted */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Trees Planted</h2>
          <Line
            data={{
              labels: metrics.labels,
              datasets: [
                {
                  label: 'Trees Planted',
                  data: metrics.trees,
                  borderColor: 'green',
                  backgroundColor: 'rgba(34,197,94,0.2)',
                },
              ],
            }}
          />
          {predictions.trees && (
            <div className="mt-4 text-green-700">
              <strong>AI Prediction (next month):</strong> {predictions.trees}
            </div>
          )}
        </div>
        {/* Waste Recycled */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Waste Recycled (kg)</h2>
          <Bar
            data={{
              labels: metrics.labels,
              datasets: [
                {
                  label: 'Waste Recycled',
                  data: metrics.waste,
                  backgroundColor: 'rgba(59,130,246,0.5)',
                  borderColor: 'blue',
                },
              ],
            }}
          />
          {predictions.waste && (
            <div className="mt-4 text-blue-700">
              <strong>AI Prediction (next month):</strong> {predictions.waste} kg
            </div>
          )}
        </div>
        {/* Donations Received */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Donations Received ($)</h2>
          <Line
            data={{
              labels: metrics.labels,
              datasets: [
                {
                  label: 'Donations',
                  data: metrics.donations,
                  borderColor: 'orange',
                  backgroundColor: 'rgba(251,191,36,0.2)',
                },
              ],
            }}
          />
          {predictions.donations && (
            <div className="mt-4 text-yellow-700">
              <strong>AI Prediction (next month):</strong> ${predictions.donations}
            </div>
          )}
        </div>
      </div>
      <div className="mt-10 text-gray-600">
        <p>
          <strong>Unique Feature:</strong> This dashboard uses AI (linear regression) to predict next month's metrics based on historical data.
        </p>
      </div>
    </div>
  );
};

export default Admindashboard; 
 