// Please refrain from tampering with the setup code provided here,
// as the index.html and test files rely on this setup to work properly.
// Only add code (e.g., helper methods, variables, etc.) within the scope
// of the anonymous function on line 6

const polybiusModule = (function () {
  // ================================ POLYBIUS SQUARE DATA SET ======================================

  const polybius2 = [
    { coordinate: 11, letter: "a" },
    { coordinate: 21, letter: "b" },
    { coordinate: 31, letter: "c" },
    { coordinate: 41, letter: "d" },
    { coordinate: 51, letter: "e" },
    { coordinate: 12, letter: "f" },
    { coordinate: 22, letter: "g" },
    { coordinate: 32, letter: "h" },
    { coordinate: 42, letter: "(i/j)" },
    { coordinate: 52, letter: "k" },
    { coordinate: 13, letter: "l" },
    { coordinate: 23, letter: "m" },
    { coordinate: 33, letter: "n" },
    { coordinate: 43, letter: "o" },
    { coordinate: 53, letter: "p" },
    { coordinate: 14, letter: "q" },
    { coordinate: 24, letter: "r" },
    { coordinate: 34, letter: "s" },
    { coordinate: 44, letter: "t" },
    { coordinate: 54, letter: "u" },
    { coordinate: 15, letter: "v" },
    { coordinate: 25, letter: "w" },
    { coordinate: 35, letter: "x" },
    { coordinate: 45, letter: "y" },
    { coordinate: 55, letter: "z" },
  ];

  // =================================== HELPER FUNCTION 1: ENCODER ======================================

  function _encoder(input) {
    if (!input.match(/[a-z \s]/gi)) return false; // returns false if input includes any characters that arent a-z

    let endMessage = "";
    for (let char of input) {
      //loops through each character of the input string
      let result = char;
      const squareIndex = polybius2.findIndex(
        //squareIndex names an anonymous function that finds the index of the polybius2.letter value which matches char
        (element) => element.letter === char
      );

      if (char === "i" || char === "j") result = `42`; // returns "42" if char = i or j

      if (squareIndex !== -1) result = `${polybius2[squareIndex].coordinate}`;
      //returns template literal of coordinate value only if squareIndex doesn't fail to match char with one in the polybius2 array

      endMessage += result;
    }
    return endMessage;
  }

  // =================================== HELPER FUNCTION 2: DECODER ======================================

  function _decoder(input) {
    if (input.replace(/\s/g, "").length % 2 !== 0) return false; // checks if input (excluding spaces) has even numbers
    let endMessage = "";

    for (let i = 0; i < input.length; i += 2) {
      const x = input[i];
      const y = input[i + 1];
      const letterPos = Number(`${x}${y}`);
      const index = polybius2.findIndex(
        // index names an anonymous function that finds the index of the polybius2.coordinate value which matches letterPos
        (element) => letterPos === element.coordinate
      );
      let result = x;

      result === " " ? i-- : (result = polybius2[index].letter); // on spaces, this adds the space to result & iterates back by 1 before conintuing to iterate by 2

      endMessage += result;
    }
    return endMessage;
  }

  // ================================ PRIMARY FUNCTION ======================================

  function polybius(input, encode = true) {
    if (typeof input !== "string") return null; // returns null if input is anything but a string

    if (input.length === 0) return ""; // returns "" if input is an empty string

    return encode
      ? _encoder(input.toLowerCase())
      : _decoder(input.toLowerCase());
    // encodes if encode is truthy; decodes if encode is falsy
  }

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };
