export function calculateBasicIncome(earnings, taxRate = 45, basicIncome = 188) {
  const grossIncome = earnings + basicIncome
  const grossTax = earnings * (taxRate / 100)
  const netTax = Math.max(earnings - grossIncome + grossTax, 0)
  const netIncome = grossIncome - grossTax
  const effectiveTaxRate = earnings ? ((netTax / earnings) * 100) || 0 : 0

  return {
    earnings,
    basicIncome,
    totalIncome: earnings + basicIncome,
    grossTax,
    taxRate,
    effectiveTaxRate,
    netIncome
  }
}
