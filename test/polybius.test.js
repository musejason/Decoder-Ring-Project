const expect = require("chai").expect;
const polybiusModule = require("../src/polybius");
const polybius = polybiusModule.polybius;

// ================================ HAPPY PATHS ======================================

describe("Polybius Square", () => {
  describe("Polybius: Happy Paths", () => {
    it("should encode if input consists of normal english letters", () => {
      const expected = "3251131343";
      const actual = polybius("hello");
      expect(actual).to.equal(expected);
    });
    it("should decode if input consists of even amounts of numbers", () => {
      const expected = "hello";
      const actual = polybius("3251131343", false);
      expect(actual).to.equal(expected);
    });
  });

  // ================================ EDGE CASES ======================================

  describe("Polybius: Edge Cases", () => {
    it("should encode message if input has multiple words and/or spaces", () => {
      const input = "hello world";
      const expected = "3251131343 2543241341";
      const actual = polybius(input);
      expect(actual).to.equal(expected);
    });
    it("should decode message if input has even amounts of numbers (excluding spaces)", () => {
      const input = "3251131343 2543241341";
      const expected = "hello world";
      const actual = polybius(input, false);
      expect(actual).to.equal(expected);
    });
    it("should encode message if input has capital letters", () => {
      const input = "HELLO WORLD";
      const expected = "3251131343 2543241341";
      const actual = polybius(input);
      expect(actual).to.equal(expected);
    });
    it("should decode message if input has even numbers", () => {
      const input = "3251131343";
      const expected = "hello";
      const actual = polybius(input, false);
      expect(actual).to.equal(expected);
    });
    it("encode: should return empty string if input = empty string", () => {
      const input = "";
      const expected = "";
      const actual = polybius(input);
      expect(actual).to.equal(expected);
    });
    it("decode: should return empty string if input = empty string", () => {
      const input = "";
      const expected = "";
      const actual = polybius(input);
      expect(actual).to.equal(expected);
    });
    describe("Polybius: Returning Null", () => {
      const testNumber = Math.floor(Math.random() * 100) + 1;

      it("encode: return null if input is null", () => {
        const actual = polybius(null);
        expect(actual).to.be.null;
      });
      it("decode: return null if input is null", () => {
        const actual = polybius(null, false);
        expect(actual).to.be.null;
      });
      it("encode: return null if input is undefined", () => {
        const actual = polybius(undefined);
        expect(actual).to.be.null;
      });
      it("decode: return null if input is undefined", () => {
        const actual = polybius(undefined, false);
        expect(actual).to.be.null;
      });
      it(`encode: return null if input is a number | number = ${testNumber}`, () => {
        const actual = polybius(testNumber);
        expect(actual).to.be.null;
      });
      it(`decode: return null if input is a number | number = ${testNumber}`, () => {
        const actual = polybius(testNumber, false);
        expect(actual).to.be.null;
      });
    });
  });

  // ================================ ERROR HANDLING ======================================

  describe("Polybius: Error Handling", () => {
    it("encode: should return false if input entail non alphabetic characters", () => {
      const actual = polybius("!@##$%");
      expect(actual).to.be.false;
    });
    it("decode: should return false if input has uneven amounts of numbers", () => {
      const actual = polybius("44324233521254134", false);
      expect(actual).to.be.false;
    });
  });
});
