/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = function (s) {
  const dp = Array.from({ length: s.length }).map((_, i) => {
    return Array.from({ length: s.length }).map((_, j) => {
      return i === j || null;
    });
  });
  let res = '';
  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = i; j < s.length; j++) {
      if (i === j) {
        dp[i][j] = true;
      } else if (i + 1 === j && s[i] === s[j]) {
        dp[i][j] = true;
      } else if (dp[i + 1][j - 1] && s[i] === s[j]) {
        dp[i][j] = true;
      } else {
        dp[i][j] = false;
      }
      if (dp[i][j] && j - i + 1 > res.length) {
        res = s.slice(i, j + 1);
      }
    }
  }
  return res;
};

// const res = longestPalindrome('abaxbabx');
// @lc code=end
