import React from 'react';
import { DollarSign, Calendar, PieChart } from 'lucide-react';
import { LoanDetails } from '../types';
import { calculateMonthlyPayment, calculateAmortizationSchedule, calculateTotalInterest } from '../utils/calculations';
import { getInterestRateForCreditScore } from '../utils/rates';

interface Props {
  loanDetails: LoanDetails;
  setLoanDetails: (details: LoanDetails) => void;
}

function LoanCalculator({ loanDetails, setLoanDetails }: Props) {
  const monthlyPayment = calculateMonthlyPayment(loanDetails);
  const schedule = calculateAmortizationSchedule(loanDetails);
  const totalInterest = calculateTotalInterest(schedule);
  const totalPrincipal = loanDetails.price - loanDetails.downPayment - loanDetails.tradeInValue;

  const handleInterestRateChange = (value: number) => {
    const formattedRate = Math.min(Math.max(0, Number(value.toFixed(2))), 30);
    setLoanDetails({ ...loanDetails, interestRate: formattedRate });
  };

  const handleCreditScoreChange = (score: number) => {
    const newRate = getInterestRateForCreditScore(score);
    setLoanDetails({
      ...loanDetails,
      creditScore: score,
      interestRate: newRate,
    });
  };

  const handleReset = () => {
    const defaultScore = 700;
    setLoanDetails({
      price: 50000,
      downPayment: 10000,
      tradeInValue: 0,
      loanTerm: 120,
      interestRate: getInterestRateForCreditScore(defaultScore),
      creditScore: defaultScore,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">RV Loan Details</h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            RV Price
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              id="price"
              min="1000"
              max="1000000"
              value={loanDetails.price}
              onChange={(e) => setLoanDetails({ ...loanDetails, price: Math.max(0, Number(e.target.value)) })}
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 mb-1">
            Down Payment
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              id="downPayment"
              min="0"
              max={loanDetails.price}
              value={loanDetails.downPayment}
              onChange={(e) => setLoanDetails({ ...loanDetails, downPayment: Math.max(0, Number(e.target.value)) })}
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span>Loan Term (months)</span>
            </div>
          </label>
          <select
            id="loanTerm"
            value={loanDetails.loanTerm}
            onChange={(e) => setLoanDetails({ ...loanDetails, loanTerm: Number(e.target.value) })}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            {[12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 180, 240].map((months) => (
              <option key={months} value={months}>
                {months} months ({Math.floor(months / 12)} years)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="creditScore" className="block text-sm font-medium text-gray-700 mb-1">
            Credit Score
          </label>
          <input
            type="range"
            id="creditScore"
            min="300"
            max="850"
            step="10"
            value={loanDetails.creditScore}
            onChange={(e) => handleCreditScoreChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Poor</span>
            <span className="font-medium">{loanDetails.creditScore}</span>
            <span>Excellent</span>
          </div>
        </div>

        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (%)
          </label>
          <div className="relative">
            <PieChart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              id="interestRate"
              step="0.01"
              min="0"
              max="30"
              value={loanDetails.interestRate.toFixed(2)}
              onChange={(e) => handleInterestRateChange(Number(e.target.value))}
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Reset Values
        </button>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">Your estimated RV monthly payment</h3>
        <p className="text-4xl font-bold text-blue-600 mb-4">${Math.round(monthlyPayment)}</p>
        
        <div className="space-y-3">
          <div className="flex justify-between text-blue-800">
            <span>Loan Term:</span>
            <span className="font-medium">{loanDetails.loanTerm} months</span>
          </div>
          <div className="flex justify-between text-blue-800">
            <span>Total Interest Cost:</span>
            <span className="font-medium">${Math.round(totalInterest)}</span>
          </div>
          <div className="flex justify-between text-blue-800">
            <span>Total Principal Paid:</span>
            <span className="font-medium">${Math.round(totalPrincipal)}</span>
          </div>
          <div className="flex justify-between text-blue-800 pt-2 border-t border-blue-200">
            <span>Amount to Finance:</span>
            <span className="font-medium">
              ${Math.round(loanDetails.price - loanDetails.downPayment - loanDetails.tradeInValue)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanCalculator;