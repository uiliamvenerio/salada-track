import React from 'react';
import { ProgressRecord } from '../types';

interface ProgressChartProps {
  progressData: ProgressRecord[];
  metric: 'weight' | 'bodyFatPercentage' | 'waist' | 'hips' | 'chest' | 'arms' | 'thighs';
  color: string;
  unit: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ progressData, metric, color, unit }) => {
  // Sort data by date
  const sortedData = [...progressData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Extract values based on the metric
  const values = sortedData.map((record) => {
    if (metric === 'weight' || metric === 'bodyFatPercentage') {
      return record[metric] || 0;
    } else {
      return record.measurements?.[metric] || 0;
    }
  });

  // Get min and max values for scaling
  const minValue = Math.min(...values) * 0.95;
  const maxValue = Math.max(...values) * 1.05;
  const range = maxValue - minValue;

  // Define chart dimensions
  const chartHeight = 200;
  const chartWidth = 500;
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Calculate positions for data points
  const points = sortedData.map((record, index) => {
    const value = metric === 'weight' || metric === 'bodyFatPercentage' 
      ? record[metric] || 0 
      : record.measurements?.[metric] || 0;
    
    const x = (index / (sortedData.length - 1 || 1)) * innerWidth + padding.left;
    const y = innerHeight - ((value - minValue) / range) * innerHeight + padding.top;
    
    return { x, y, value, date: record.date };
  });

  // Calculate path for the line
  const linePath = points.map((point, i) => 
    (i === 0 ? `M ${point.x},${point.y}` : `L ${point.x},${point.y}`)
  ).join(' ');

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4 capitalize">
        {metric === 'bodyFatPercentage' ? 'Body Fat %' : metric} Progress
      </h3>
      <div className="overflow-x-auto">
        <svg width={chartWidth} height={chartHeight} className="mx-auto">
          {/* Y Axis */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={chartHeight - padding.bottom}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
          
          {/* X Axis */}
          <line
            x1={padding.left}
            y1={chartHeight - padding.bottom}
            x2={chartWidth - padding.right}
            y2={chartHeight - padding.bottom}
            stroke="#e2e8f0"
            strokeWidth="1"
          />
          
          {/* Y Axis labels */}
          <text
            x={padding.left - 5}
            y={padding.top}
            textAnchor="end"
            fontSize="12"
            fill="#64748b"
          >
            {maxValue.toFixed(1)}
          </text>
          
          <text
            x={padding.left - 5}
            y={chartHeight - padding.bottom}
            textAnchor="end"
            fontSize="12"
            fill="#64748b"
          >
            {minValue.toFixed(1)}
          </text>
          
          {/* Line */}
          <path d={linePath} fill="none" stroke={color} strokeWidth="2" />
          
          {/* Data points */}
          {points.map((point, i) => (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="white"
                stroke={color}
                strokeWidth="2"
              />
              
              {/* Value labels */}
              <text
                x={point.x}
                y={point.y - 10}
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
              >
                {point.value.toFixed(1)}{unit}
              </text>
              
              {/* Date labels */}
              <text
                x={point.x}
                y={chartHeight - padding.bottom + 20}
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
                transform={`rotate(45 ${point.x} ${chartHeight - padding.bottom + 20})`}
              >
                {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default ProgressChart;