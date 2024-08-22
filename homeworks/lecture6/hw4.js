/**
 * add `,` to the number every 3 digits
 * example: 12345678 => 12,345,678
 * example: 1234.56 => 1,234.56
 * @param {number} num
 */
function format(num) {
  // your code here
  const numStr = num.toString();
  const [integerPart, decimalPart] = numStr.split(".");
  //\B asserts that the cursor is not at a word boundary.
  //(?= ... )This is a positive lookahead assertion. It asserts that what follows the current position must match the pattern inside the parentheses
  //The +mmeans that this group of three digits can repeat one or more times
  //(?!\d)This is a negative lookahead assertion. It asserts that what follows the current position is not a digit.
  //This prevents erroneous matches right before the final group of three digits,
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3}) + (?!d))/g,
    ","
  );
  return decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;
}
