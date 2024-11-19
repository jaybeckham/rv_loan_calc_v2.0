import React from 'react';
import { DollarSign, Calculator } from 'lucide-react';
import { LoanDetails } from '../types';

interface Props {
  loanDetails: LoanDetails;
  setLoanDetails: (details: LoanDetails) => void;
}

function TradeInCalculator({ loanDetails, setLoanDetails }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">RV Trade-In Calculator</h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="tradeInValue" className="block text-sm font-medium text-gray-700 mb-1">
            Trade-In Value
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="number"
              id="tradeInValue"
              min="0"
              max={loanDetails.price}
              value={loanDetails.tradeInValue}
              onChange={(e) => setLoanDetails({ ...loanDetails, tradeInValue: Math.max(0, Number(e.target.value)) })}
              className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-green-900 mb-4">Trade-In Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-green-800">RV Price:</span>
              <span className="font-medium text-green-900">${Math.round(loanDetails.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-800">Trade-In Value:</span>
              <span className="font-medium text-green-900">${Math.round(loanDetails.tradeInValue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-800">Down Payment:</span>
              <span className="font-medium text-green-900">${Math.round(loanDetails.downPayment)}</span>
            </div>
            <div className="pt-2 border-t border-green-200">
              <div className="flex justify-between">
                <span className="font-medium text-green-900">Amount to Finance:</span>
                <span className="font-bold text-green-900">
                  ${Math.round(loanDetails.price - loanDetails.downPayment - loanDetails.tradeInValue)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Tips for Trade-In Value</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Research current market values for your RV</li>
            <li>• Consider the age and condition of your RV</li>
            <li>• Get multiple dealer appraisals if possible</li>
            <li>• Keep maintenance records available</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TradeInCalculator;