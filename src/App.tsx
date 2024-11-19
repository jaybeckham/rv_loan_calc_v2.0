import React from 'react';
import { Mail, Globe, Calculator } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import LoanCalculator from './components/LoanCalculator';
import TradeInCalculator from './components/TradeInCalculator';
import RateComparison from './components/RateComparison';
import AmortizationSchedule from './components/AmortizationSchedule';
import AmortizationChart from './components/AmortizationChart';
import RVLoanInfo from './components/RVLoanInfo';

export default function App() {
  const [loanDetails, setLoanDetails] = React.useState({
    price: 50000,
    downPayment: 10000,
    tradeInValue: 0,
    loanTerm: 120,
    interestRate: 6.99,
    creditScore: 700,
  });

  return (
    <>
      <Helmet>
        <title>RV Loan Calculator | Compare Rates & Calculate Payments</title>
        <meta name="description" content="Calculate RV loan payments instantly with our free RV loan calculator. Compare rates, estimate monthly payments, and view amortization schedules for new and used RVs." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Calculator className="h-8 w-8 text-indigo-600" />
              RV Loan Calculator
            </h1>
          </nav>
        </header>

        <div className="relative h-[500px] bg-indigo-900 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://www.winnebago.com/Admin/Public/GetImage.ashx?Width=1920&Height=1080&Crop=1&Compression=75&DoNotUpscale=True&FillCanvas=False&Image=/Files/Images/Winnebago/Class-Pages/Class-A/Class-A-banner.jpg"
              alt="Luxury Winnebago RV on the road"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-indigo-900/5" />
          </div>
          
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6 drop-shadow-lg">
              RV Loan Calculator
            </h1>
            <p className="max-w-3xl text-xl text-white mb-8 drop-shadow-md">
              Calculate RV loan payments instantly with our free RV loan calculator. Compare rates, estimate monthly payments, and view amortization schedules for new and used RVs.
            </p>
            <a
              href="#calculator"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-200"
            >
              Calculate Now
            </a>
          </div>
        </div>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div id="calculator" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <LoanCalculator 
                loanDetails={loanDetails} 
                setLoanDetails={setLoanDetails} 
              />
              <TradeInCalculator 
                loanDetails={loanDetails} 
                setLoanDetails={setLoanDetails} 
              />
            </div>
            <div id="rates" className="space-y-6">
              <RateComparison creditScore={loanDetails.creditScore} />
            </div>
          </div>

          <div className="mt-6">
            <AmortizationChart loanDetails={loanDetails} />
          </div>

          <div className="mt-6">
            <AmortizationSchedule loanDetails={loanDetails} />
          </div>

          <div id="faq" className="mt-6">
            <RVLoanInfo />
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg text-center text-sm text-gray-600">
            This calculator provides estimates for informational purposes only. Actual rates and terms may vary based on credit approval and other factors.
          </div>
        </main>

        <footer className="bg-white mt-auto">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About Us</h3>
                <p className="text-gray-600 text-sm">
                  We provide comprehensive RV loan calculators and resources to help you make informed decisions about your RV purchase.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#calculator" className="text-indigo-600 hover:text-indigo-800 transition-colors">Loan Calculator</a>
                  </li>
                  <li>
                    <a href="#rates" className="text-indigo-600 hover:text-indigo-800 transition-colors">Current Rates</a>
                  </li>
                  <li>
                    <a href="#faq" className="text-indigo-600 hover:text-indigo-800 transition-colors">FAQ</a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    info@rvloancalculatoronline.com
                  </li>
                  <li className="flex items-center gap-2 text-gray-600">
                    <Globe className="h-4 w-4" />
                    www.rvloancalculatoronline.com
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} RV Loan Calculator. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}