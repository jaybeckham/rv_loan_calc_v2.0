import { LoanDetails } from '../types';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface PaymentSchedule {
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export function calculateMonthlyPayment(loanDetails: LoanDetails): number {
  const principal = loanDetails.price - loanDetails.downPayment - loanDetails.tradeInValue;
  const monthlyRate = loanDetails.interestRate / 100 / 12;
  const numberOfPayments = loanDetails.loanTerm;

  if (monthlyRate === 0) return principal / numberOfPayments;

  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );
}

export function calculateAmortizationSchedule(loanDetails: LoanDetails): PaymentSchedule[] {
  const schedule: PaymentSchedule[] = [];
  const monthlyPayment = calculateMonthlyPayment(loanDetails);
  const monthlyRate = loanDetails.interestRate / 100 / 12;
  let remainingBalance = loanDetails.price - loanDetails.downPayment - loanDetails.tradeInValue;

  for (let i = 0; i < loanDetails.loanTerm; i++) {
    const interest = remainingBalance * monthlyRate;
    const principal = monthlyPayment - interest;
    remainingBalance -= principal;

    schedule.push({
      payment: monthlyPayment,
      principal: principal,
      interest: interest,
      remainingBalance: Math.max(0, remainingBalance),
    });
  }

  return schedule;
}

export function calculateTotalInterest(schedule: PaymentSchedule[]): number {
  return schedule.reduce((total, payment) => total + payment.interest, 0);
}

export function generatePDF(loanDetails: LoanDetails, schedule: PaymentSchedule[]): void {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('RV Loan Amortization Schedule', 14, 20);

  doc.setFontSize(12);
  doc.text(`RV Price: $${Math.round(loanDetails.price)}`, 14, 30);
  doc.text(`Down Payment: $${Math.round(loanDetails.downPayment)}`, 14, 37);
  doc.text(`Trade-In Value: $${Math.round(loanDetails.tradeInValue)}`, 14, 44);
  doc.text(`Interest Rate: ${loanDetails.interestRate}%`, 14, 51);
  doc.text(`Loan Term: ${loanDetails.loanTerm} months`, 14, 58);

  (doc as any).autoTable({
    startY: 65,
    head: [['Month', 'Payment', 'Principal', 'Interest', 'Balance']],
    body: schedule.map((payment, index) => [
      index + 1,
      `$${Math.round(payment.payment)}`,
      `$${Math.round(payment.principal)}`,
      `$${Math.round(payment.interest)}`,
      `$${Math.round(payment.remainingBalance)}`,
    ]),
  });

  doc.save('rv-loan-amortization.pdf');
}