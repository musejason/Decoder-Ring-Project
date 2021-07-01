const expect = require("chai").expect;
const caesarModule = require("../src/caesar");
const caesar = caesarModule.caesar;

// ================================ HAPPY PATHS ======================================

describe("Ceasar Shift", () => {
  describe("Ceasar: Happy Paths", () => {
    it("should encode message given a valid shift (-25 < 0 < 25)", () => {
      const input = "thinkful";
      const expected = "wklqnixo";
      const actual = caesar(input, 3);
      expect(actual).to.equal(expected);
    });
    it("should decode message given a valid shift (-25 < 0 < 25)", () => {
      const input = "wklqnixo";
      const expected = "thinkful";
      const actual = caesar(input, 3, false);
      expect(actual).to.equal(expected);
    });
  });

  // ================================ EDGE CASES ======================================

  describe("Ceasar: Edge Cases", () => {
    it("should encode message if input has multiple words and/or spaces", () => {
      const input = "this is a secret message!";
      const expected = "bpqa qa i amkzmb umaaiom!";
      const actual = caesar(input, 8);
      expect(actual).to.equal(expected);
    });
    it("should decode message if input has multiple words and/or spaces", () => {
      const input = "bpqa qa i amkzmb umaaiom!";
      const expected = "this is a secret message!";
      const actual = caesar(input, 8, false);
      expect(actual).to.equal(expected);
    });
    it("should encode message if input has capital letters", () => {
      const input = "THIS IS A SECRET MESSAGE!";
      const expected = "bpqa qa i amkzmb umaaiom!";
      const actual = caesar(input, 8);
      expect(actual).to.equal(expected);
    });
    it("should decode message if input has capital letters", () => {
      const input = "BPQA QA I AMKZMB UMAAIOM!";
      const expected = "this is a secret message!";
      const actual = caesar(input, 8, false);
      expect(actual).to.equal(expected);
    });
    it("should encode message if input has nonalphabetic symbols", () => {
      const input = "#1 dad";
      const expected = "#1 lil";
      const actual = caesar(input, 8);
      expect(actual).to.equal(expected);
    });
    it("should decode message if input has nonalphabetic symbols", () => {
      const input = "#1 lil";
      const expected = "#1 dad";
      const actual = caesar(input, 8, false);
      expect(actual).to.equal(expected);
    });
  });

  // ================================ ERROR HANDLING ======================================

  describe("Ceasar: Error Handling", () => {
    it("should return false if shift amount is not provided", () => {
      const actual = caesar("c");
      expect(actual).to.be.false;
    });
    it("should return false if shift amount is greater than 25", () => {
      const shift = 26;
      const actual = caesar("c", shift);
      expect(actual).to.be.false;
    });
    it("should return false if shift amount is 0", () => {
      const shift = 0;
      const actual = caesar("c", shift);
      expect(actual).to.be.false;
    });
    it("should return false if shift amount is less than -25", () => {
      const shift = -26;
      const actual = caesar("c", shift);
      expect(actual).to.be.false;
    });
  });
});
