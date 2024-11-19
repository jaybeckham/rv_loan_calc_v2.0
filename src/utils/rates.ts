interface Rate {
  type: string;
  excellent: number;
  good: number;
  fair: number;
}

export function getCurrentRates(creditScore: number): Rate[] {
  // Base rates - these would typically come from an API
  const baseRates: Rate[] = [
    {
      type: 'New RV',
      excellent: 6.99,
      good: 7.99,
      fair: 9.99,
    },
    {
      type: 'Used RV',
      excellent: 7.99,
      good: 8.99,
      fair: 10.99,
    },
  ];

  // Adjust rates based on credit score
  if (creditScore >= 720) {
    return baseRates;
  } else if (creditScore >= 690) {
    return baseRates.map(rate => ({
      ...rate,
      excellent: rate.excellent + 0.5,
      good: rate.good,
      fair: rate.fair,
    }));
  } else {
    return baseRates.map(rate => ({
      ...rate,
      excellent: rate.excellent + 1,
      good: rate.good + 0.5,
      fair: rate.fair,
    }));
  }
}

export function getInterestRateForCreditScore(creditScore: number): number {
  // Returns the appropriate interest rate based on credit score
  if (creditScore >= 720) {
    return 6.99; // Excellent credit
  } else if (creditScore >= 690) {
    return 7.99; // Good credit
  } else if (creditScore >= 630) {
    return 9.99; // Fair credit
  } else {
    return 12.99; // Poor credit
  }
}