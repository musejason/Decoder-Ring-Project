// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const substitutionModule = (function () {
  // ================================ SUBSTITUTION CYPHER DATA SET ======================================

  const alphaNorm = "abcdefghijklmnopqrstuvwxyz".split(""); // creates array of characters for normal alphabet

  // ================================ HELPER FUNCTION 1: CHECKING ALPHABET ======================================

  // This helper function checks three conditions:
  //    1) if alphabet is falsy
  //    2) if alphabet isn't exactly 26 characters
  //    3) if any alphabet characters repeat
  // Returns true only if ALL above conditions ARE met

  function _checkAlphabet(alphabet) {
    if (!alphabet || alphabet.length !== 26) return false;
    for (let i = 0; i < alphabet.length; i++)
      if (alphabet.indexOf(alphabet[i]) !== alphabet.lastIndexOf(alphabet[i]))
        return false;
    return true;
  }

  // ================================ HELPER FUNCTION 2: CODER ======================================

  function _coder(lowerInput, alphaMod, encode) {
    let endMessage = "";
    const startArray = encode ? alphaNorm : alphaMod;
    const endArray = encode ? alphaMod : alphaNorm;
    // 2 conditional varibales created based on the boolean value of encode
    // (Default) encode = true: start array = alphaNorm & end array = alphaMod
    // (Otherwise) encode = false: the respective values of each variable are swapped
    // This means the boolena value of decode determines which array is the starting array and which is the ending array

    for (let char of lowerInput) {
      let result = char;

      if (!startArray.includes(char) && char !== " ") return false;
      // returns false if char is both not in the starting array and is not a space

      if (char !== " ") result = endArray[startArray.indexOf(char)];
      // if char is not a space, result = ending array char at the same index

      endMessage += result; // adds result to the endMessage string (including spaces)
    }
    return endMessage;
  }

  // ================================ PRIMARY FUNCTION ======================================

  function substitution(input, alphabet, encode = true) {
    if (!_checkAlphabet(alphabet)) return false; // returns false if any 1 of 3 criteria fails (see _checkAplphabet)

    if (typeof input !== "string") return null; // returns null if input is anything but a string

    if (input.length === 0) return ""; // returns "" if input is an empty string

    return _coder(input.toLowerCase(), alphabet.split(""), encode);
    // encodes if encode = true; decodes if encode = false
  }

  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
