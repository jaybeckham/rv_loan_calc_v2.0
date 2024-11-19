import React, { useState } from 'react';
import { FileDown } from 'lucide-react';
import { LoanDetails } from '../types';
import { calculateAmortizationSchedule, generatePDF } from '../utils/calculations';

interface Props {
  loanDetails: LoanDetails;
}

function AmortizationSchedule({ loanDetails }: Props) {
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const schedule = calculateAmortizationSchedule(loanDetails);

  const handleDownloadPDF = () => {
    generatePDF(loanDetails, schedule);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">RV Amortization Schedule</h2>
        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <FileDown className="w-4 h-4 mr-2" />
          Download PDF
        </button>
      </div>

      <div className="w-full">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-[10%] py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
              <th className="w-[20%] py-3 text-right text-xs font-medium text-gray-500 uppercase">Payment</th>
              <th className="w-[20%] py-3 text-right text-xs font-medium text-gray-500 uppercase">Principal</th>
              <th className="w-[20%] py-3 text-right text-xs font-medium text-gray-500 uppercase">Interest</th>
              <th className="w-[30%] py-3 text-right text-xs font-medium text-gray-500 uppercase">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {(showFullSchedule ? schedule : schedule.slice(0, 3)).map((payment, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 text-sm text-gray-900">{index + 1}</td>
                <td className="py-3 text-sm text-gray-900 text-right">${Math.round(payment.payment).toLocaleString()}</td>
                <td className="py-3 text-sm text-gray-900 text-right">${Math.round(payment.principal).toLocaleString()}</td>
                <td className="py-3 text-sm text-gray-900 text-right">${Math.round(payment.interest).toLocaleString()}</td>
                <td className="py-3 text-sm text-gray-900 text-right">${Math.round(payment.remainingBalance).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {schedule.length > 3 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowFullSchedule(!showFullSchedule)}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {showFullSchedule ? 'Show Less' : 'Show Full Schedule'}
          </button>
        </div>
      )}
    </div>
  );
}

export default AmortizationSchedule;