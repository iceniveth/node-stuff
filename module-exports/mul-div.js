const MULTIPLY = 'MULTIPLY'

function multiply(x, y) {
  return x * y;
}

export const DIVIDE = "DIVIDE"

export function divide(x, y) {
  return x / y;
}

export {
  MULTIPLY,
  multiply
}

export default function () {
  return `${MULTIPLY}-${DIVIDE}`
}