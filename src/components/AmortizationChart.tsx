{/* Previous imports remain the same */}
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LoanDetails } from '../types';
import { calculateAmortizationSchedule } from '../utils/calculations';

interface Props {
  loanDetails: LoanDetails;
}

interface VisibleSeries {
  balance: boolean;
  principalPaid: boolean;
  interestPaid: boolean;
}

function AmortizationChart({ loanDetails }: Props) {
  const [visibleSeries, setVisibleSeries] = useState<VisibleSeries>({
    balance: true,
    principalPaid: true,
    interestPaid: true,
  });

  const schedule = calculateAmortizationSchedule(loanDetails);
  
  const chartData = schedule
    .filter((_, index) => index % 12 === 0 || index === schedule.length - 1)
    .map((payment, index) => {
      const monthNumber = index * 12;
      const totalPrincipalPaid = loanDetails.price - loanDetails.downPayment - loanDetails.tradeInValue - payment.remainingBalance;
      const totalInterestPaid = schedule
        .slice(0, monthNumber + 1)
        .reduce((sum, p) => sum + p.interest, 0);

      return {
        month: monthNumber + 1,
        balance: Math.round(payment.remainingBalance),
        principalPaid: Math.round(totalPrincipalPaid),
        interestPaid: Math.round(totalInterestPaid),
      };
    });

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  const formatTooltipValue = (value: number) => `$${value.toLocaleString()}`;

  const handleLegendClick = (series: keyof VisibleSeries) => {
    setVisibleSeries(prev => ({
      ...prev,
      [series]: !prev[series],
    }));
  };

  const CustomLegend = () => (
    <div className="flex flex-wrap justify-center gap-4 pt-4">
      <button
        onClick={() => handleLegendClick('balance')}
        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
          visibleSeries.balance 
            ? 'bg-red-100 text-red-800' 
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        Remaining Balance
      </button>
      <button
        onClick={() => handleLegendClick('principalPaid')}
        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
          visibleSeries.principalPaid 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        Principal Paid
      </button>
      <button
        onClick={() => handleLegendClick('interestPaid')}
        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${
          visibleSeries.interestPaid 
            ? 'bg-indigo-100 text-indigo-800' 
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
        Interest Paid
      </button>
    </div>
  );

  const lastDataPoint = chartData[chartData.length - 1];
  const totalAmountPaid = lastDataPoint.principalPaid + lastDataPoint.interestPaid;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">RV Loan Balance Over Time</h2>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 60, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              label={{ 
                value: 'Month', 
                position: 'insideBottom', 
                offset: -25 
              }}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              width={60}
            />
            <Tooltip 
              formatter={formatTooltipValue}
              labelFormatter={(label) => `Month ${label}`}
            />
            {visibleSeries.balance && (
              <Line
                type="monotone"
                dataKey="balance"
                name="Remaining Balance"
                stroke="#EF4444"
                strokeWidth={2}
                dot={false}
              />
            )}
            {visibleSeries.principalPaid && (
              <Line
                type="monotone"
                dataKey="principalPaid"
                name="Principal Paid"
                stroke="#059669"
                strokeWidth={2}
                dot={false}
              />
            )}
            {visibleSeries.interestPaid && (
              <Line
                type="monotone"
                dataKey="interestPaid"
                name="Interest Paid"
                stroke="#6366F1"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <CustomLegend />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-800">Total Amount Paid</h3>
          <p className="text-lg font-semibold text-purple-900">
            {formatCurrency(totalAmountPaid)}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Total Principal Paid</h3>
          <p className="text-lg font-semibold text-green-900">
            {formatCurrency(lastDataPoint.principalPaid)}
          </p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-indigo-800">Total Interest Paid</h3>
          <p className="text-lg font-semibold text-indigo-900">
            {formatCurrency(lastDataPoint.interestPaid)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AmortizationChart;