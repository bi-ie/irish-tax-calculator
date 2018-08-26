export const W = 52
export const BW = 26
export const A = 1
export const M = 12

export const payPeriods = Object.freeze({
  annual: A,
  weekly: W,
  monthly: M,
  biWeekly: BW
})

export const standardRate = 20
export const higherRate = 40
export const employeePRSIRate = 4
export const universalSocialChargeRates = [0.5, 2, 4.75, 8]
export const universalSocialChargeCutOff = [12012, 19372, 70044, Infinity]
export const defaultStandardRateCutOff = 34550
export const defaultTaxCredits = 3300

export const taxRates = Object.freeze({
  standardRate,
  higherRate,
  employeePRSIRate,
  universalSocialChargeRates,
  universalSocialChargeCutOff,
  defaultStandardRateCutOff,
  defaultTaxCredits
})
