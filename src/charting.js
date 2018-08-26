import { applyPeriod, Income } from './utils'
import { W, payPeriods } from './rates'
import { calculateBasicIncome } from './basic-income'
import { calculateIncomeTax } from './tax'

// get chart data for a tax rate and basic income rate
export function plotBasicIncomeForRates(income, payPeriod, flatTaxRate, basicIncome) {
  const bi = calculateBasicIncome(income[payPeriod], basicIncome, flatTaxRate)
  const incomeTax = calculateIncomeTax(income[payPeriod], payPeriods[payPeriod])

  return {
    earnings: income[payPeriod],
    payPeriod,
    basicIncome: bi,
    incomeTax
  }
}

export const plotBasicIncomeAgainstIncomeTax = (flatTaxRate, basicIncome, payPeriod = 'weekly', options = {}) => {
  const increment = options.salaryIncrement || applyPeriod(200, payPeriods[payPeriod], W)
  const points = Array((options.pointsToPlot || 11)).fill()

  return points.map((v, i) => {
    const income = new Income(i * increment, payPeriods[payPeriod])
    return plotBasicIncomeForRates(income, payPeriod, flatTaxRate, basicIncome)
  })
}
