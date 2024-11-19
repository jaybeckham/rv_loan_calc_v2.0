import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getCurrentRates } from '../utils/rates';

interface Props {
  creditScore: number;
}

function RateComparison({ creditScore }: Props) {
  const rates = getCurrentRates(creditScore);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Current RV Loan Rates</h2>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rates}
            margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="type" 
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis 
              label={{ 
                value: 'Rate (%)', 
                angle: -90, 
                position: 'insideLeft', 
                offset: 10,
                fontSize: 12 
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ fontSize: '12px' }}
              formatter={(value) => [`${value}%`]}
            />
            <Legend 
              verticalAlign="bottom"
              height={80}
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '12px',
                lineHeight: '20px'
              }}
            />
            <Bar 
              dataKey="excellent" 
              name="Excellent Credit (720+)" 
              fill="#059669" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="good" 
              name="Good Credit (690-719)" 
              fill="#0284C7" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="fair" 
              name="Fair Credit (630-689)" 
              fill="#D97706" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-green-900 mb-2">New RV Rates</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="text-green-800">Excellent Credit: {rates[0].excellent}%</li>
            <li className="text-green-800">Good Credit: {rates[0].good}%</li>
            <li className="text-green-800">Fair Credit: {rates[0].fair}%</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Used RV Rates</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="text-blue-800">Excellent Credit: {rates[1].excellent}%</li>
            <li className="text-blue-800">Good Credit: {rates[1].good}%</li>
            <li className="text-blue-800">Fair Credit: {rates[1].fair}%</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RateComparison;