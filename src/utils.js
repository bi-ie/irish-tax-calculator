import {
  W, M, A, BW,
} from './rates'

export function Income(euroValue = 0, earningsPeriod = W) {
  let annualEarnings = applyPeriod(euroValue, A, earningsPeriod)

  return {
    get annual() {
      return annualEarnings
    },
    get weekly() {
      return applyPeriod(annualEarnings, W)
    },
    get monthly() {
      return applyPeriod(annualEarnings, M)
    },
    get biWeekly() {
      return applyPeriod(annualEarnings, BW)
    },
    set annual(amount) {
      annualEarnings = amount
    },
    set weekly(amount) {
      annualEarnings = applyPeriod(amount, A, W)
    },
    set monthly(amount) {
      annualEarnings = applyPeriod(amount, A, M)
    },
    set biWeekly(amount) {
      annualEarnings = applyPeriod(amount, A, BW)
    }
  }
}

// Adjust figure by annual/monthly/weekly
// (optional originalPeriod arg to convert from non-annual figure)
export function applyPeriod(euroValue, period = W, originalPeriod = A) {
  const annualAmout = euroValue * (originalPeriod)
  return Math.round(annualAmout / period)
}
