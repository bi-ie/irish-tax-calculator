import {
  W, A,
  taxRates
} from './rates'
import { applyPeriod } from './utils'

// 2018 rates, Irish single person
export function Tax(period = A, taxCredits = taxRates.defaultTaxCredits, cutOff = taxRates.defaultStandardRateCutOff) {
  const srco = applyPeriod(cutOff, period)
  const sr = taxRates.standardRate
  const hr = taxRates.higherRate
  const credits = applyPeriod(taxCredits, period)
  const prsi = taxRates.employeePRSIRate

  return {
    standardRateCutOff(income) { return Math.min(income, srco) * (sr / 100) },
    standardRate(income) { return Math.min(income, srco) * (sr / 100) },
    higherRate(income) { return Math.max((income - srco), 0) * (hr / 100) },
    prsi(income) { return income * (prsi / 100) },
    usc(income) {
      return taxRates.universalSocialChargeRates.reduce((acc, rate, i) => {
        const cutOff = taxRates.universalSocialChargeCutOff[i]
        const tax = Math.min(acc.remainder, cutOff) * (rate / 100)

        return {
          tax: acc.tax + tax,
          remainder: Math.max(acc.remainder - cutOff, 0)
        }
      },
      { tax: 0, remainder: income }).tax
    },
    grossTax(income) { return this.standardRate(income) + this.higherRate(income) },
    tax(income) {
      return Math.max(this.grossTax(income) - credits, 0)
        + this.prsi(income)
        + this.usc(income)
    },
    taxRate(income, netTax) { return income ? (netTax / income) * 100 : 0 },
    netIncome: (income, netTax) => Math.max(income - netTax, 0),
  }
}

/**
 * Standard tax for a single person with no special allowances
 @returns {object} netTax effectiveTaxRate netIncome
 */
export function calculateIncomeTax(income, period = W, taxCredits, cutOff) {
  const taxation = new Tax(period, taxCredits, cutOff)
  const netTax = taxation.tax(income)
  const effectiveTaxRate = taxation.taxRate(income, netTax)
  const netIncome = taxation.netIncome(income, netTax)

  return {
    netTax,
    effectiveTaxRate,
    netIncome,
  }
}
