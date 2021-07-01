// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const caesarModule = (function () {
  // ================================ CAESAR SHIFT DATA SET ======================================

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split(""); // creates array of characters for normal alphabet

  // ================================ HELPER FUNCTION: CHARACTER SHIFTER ======================================

  function _charShifter(char, shift) {
    if (!alphabet.includes(char)) return char;

    let newIndex = (((alphabet.indexOf(char) + shift) % 26) + 26) % 26; // ensures the new index is between 0 & 25

    return alphabet[newIndex];
  }

  // ================================ PRIMARY FUNCTION ======================================

  function caesar(input, shift, encode = true) {
    if (!shift || shift >= 26 || shift == 0 || shift <= -26) return false;

    let endMessage = "";

    if (!encode) shift *= -1;

    for (let char of input)
      endMessage += _charShifter(char.toLowerCase(), shift);

    return endMessage;
  }

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };
