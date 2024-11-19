import React from 'react';
import { Info, CreditCard, DollarSign, Clock, Shield } from 'lucide-react';

function RVLoanInfo() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
      <div className="prose prose-indigo max-w-none">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Info className="h-8 w-8 text-indigo-600" />
          RV Loan Calculator: Plan Your Adventure on Wheels
        </h2>
        
        <p className="text-gray-600 leading-relaxed mb-8">
          Embarking on an RV adventure can offer unparalleled freedom on the open road. Whether you're eyeing a 
          <span className="text-indigo-600 font-medium"> luxurious motorhome</span>, a 
          <span className="text-indigo-600 font-medium"> cozy travel trailer</span>, or a 
          <span className="text-indigo-600 font-medium"> compact camper</span>, an RV loan can help turn your road trip dreams into reality. 
          Our RV Loan Calculator is designed to help you navigate the financial aspects of your RV purchase.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-indigo-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-indigo-900 mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Key Factors in RV Financing
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li><span className="font-medium text-indigo-700">RV Price:</span> Ranges from under $10,000 to six figures</li>
              <li><span className="font-medium text-indigo-700">Down Payment:</span> Typically 10-20% minimum</li>
              <li><span className="font-medium text-indigo-700">Loan Amount:</span> Price minus down payment</li>
              <li><span className="font-medium text-indigo-700">Interest Rate:</span> Based on credit and term</li>
              <li><span className="font-medium text-indigo-700">Loan Term:</span> 5 to 20 years available</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Steps to Secure an RV Loan
            </h3>
            <ol className="space-y-3 text-gray-700 list-decimal list-inside">
              <li>Set a realistic budget</li>
              <li>Prepare your down payment</li>
              <li>Check and improve your credit score</li>
              <li>Compare lenders and their offers</li>
              <li>Determine your ideal loan term</li>
            </ol>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: "What credit score do I need for an RV loan?",
              a: "Most lenders prefer a score of 660 or higher, but some may work with lower scores."
            },
            {
              q: "Can I get an RV loan with no money down?",
              a: "While possible, it's rare. Most lenders require at least 10% down."
            },
            {
              q: "How long can you finance an RV?",
              a: "Typically, RV loans range from 5 to 20 years, depending on the loan amount and lender."
            },
            {
              q: "Are RV loan interest rates higher than auto loan rates?",
              a: "Generally, yes. RV loans are often considered luxury items and may carry slightly higher rates."
            },
            {
              q: "Can I use my RV as collateral for the loan?",
              a: "Yes, most RV loans are secured by the RV itself."
            },
            {
              q: "Is it better to finance through a dealer or a bank?",
              a: "Compare offers from both. Dealers might offer promotions, but banks may have lower rates."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-indigo-900 mb-2">{faq.q}</h4>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pro Tips for RV Financing
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li>• Consider seasonal payment plans for off-season flexibility</li>
            <li>• Account for depreciation when choosing loan terms</li>
            <li>• Check for prepayment penalties before signing</li>
            <li>• Factor in additional costs like insurance and maintenance</li>
            <li>• Keep documentation ready for faster loan processing</li>
          </ul>
        </div>

        <div className="mt-8 text-gray-600">
          <p className="text-center italic">
            By using our RV Loan Calculator and understanding these key aspects of RV financing, 
            you'll be better prepared to make an informed decision about your RV purchase. Happy camping!
          </p>
        </div>
      </div>
    </div>
  );
}

export default RVLoanInfo;