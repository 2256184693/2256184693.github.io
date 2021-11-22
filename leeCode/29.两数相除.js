/*
 * @lc app=leetcode.cn id=29 lang=javascript
 *
 * [29] 两数相除
 */

// @lc code=start
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
const divide = function (dividend, divisor) {
  if (dividend === 0) {
    return 0;
  }

  const MAX = 2 ** 31 - 1;

  const MIN = -(2 ** 31);

  if (dividend === MIN && divisor === -1) {
    return MAX;
  }

  if (dividend === MIN && divisor === 1) {
    return MIN;
  }

  const isNegative = (dividend ^ divisor) < 0;

  let [a, b] = [Math.abs(dividend), Math.abs(divisor)];

  let res = 0;

  for (let i = 31; i >= 0; i--) {
    if (a >>> i >= b) {
      res += 1 << i;
      a -= b << i;
    }
  }

  return isNegative ? -res : res;
};

// 位运算 超时？？
const divide2 = function (dividend, divisor) {
  if (dividend === 0) {
    return 0;
  }

  const MAX = 2 ** 31 - 1;

  const MIN = -(2 ** 31);

  if (dividend === MIN && divisor === -1) {
    return MAX;
  }

  if (dividend === MIN && divisor === 1) {
    return MIN;
  }

  const isNegative = (dividend ^ divisor) < 0;

  let [a, b] = [Math.abs(dividend), Math.abs(divisor)];

  let res = 0;

  for (let i = 31; i >= 0; i--) {
    if (a >>> i >= b) {
      res += 1 << i;
      a -= b << i;
    }
  }

  return isNegative ? -res : res;
};

// 位运算 超时？？
const divide3 = function (dividend, divisor) {
  const isNegative = (dividend ^ divisor) < 0;

  let [a, b] = [Math.abs(dividend), Math.abs(divisor)];

  let res = 0;

  while (a <= b) {
    a -= b;
    res++;
  }

  return isNegative ? -res : res;
};

// @lc code=end
