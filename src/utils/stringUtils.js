/**
 * Replaces all occurrences of a specified substring with another substring.
 *
 * @param {string} input - The input string.
 * @param {string} searchValue - The substring to search for.
 * @param {string} replaceValue - The substring to replace with.
 * @returns {string} - The modified string with replacements.
 */
export const replaceSubstring = (input, searchValue, replaceValue) => {
	const pattern = new RegExp(searchValue, 'g'); // Create a global regular expression

	return input.replace(pattern, replaceValue);
};
