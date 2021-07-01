const expect = require("chai").expect;
const substitutionModule = require("../src/substitution");
const substitution = substitutionModule.substitution;

// ================================ HAPPY PATHS ======================================

describe("Substitution", () => {
  describe("Substitution: Happy Paths", () => {
    it("should encode if input consists of normal alphabet characters", () => {
      const input = "thinkful";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "jrufscpw";
      const actual = substitution(input, alphabet);
      expect(actual).to.equal(expected);
    });
    it("should decode if input consists of modified alphabet characters", () => {
      const input = "jrufscpw";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "thinkful";
      const actual = substitution(input, alphabet, false);
      expect(actual).to.equal(expected);
    });
  });

  // ================================ EDGE CASES ======================================

  describe("Substitution: Edge Cases", () => {
    it("should encode message if input has multiple words and/or spaces", () => {
      const input = "you are an excellent spy";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "elp xhm xf mbymwwmfj dne";
      const actual = substitution(input, alphabet);
      expect(actual).to.equal(expected);
    });
    it("should decode message if input has multiple words and/or spaces", () => {
      const input = "elp xhm xf mbymwwmfj dne";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "you are an excellent spy";
      const actual = substitution(input, alphabet, false);
      expect(actual).to.equal(expected);
    });
    it("should encode message if input has capital letters", () => {
      const input = "excellent";
      const upperCaseInput = input.toUpperCase();
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "mbymwwmfj";
      const actual = substitution(upperCaseInput, alphabet);
      expect(actual).to.equal(expected);
    });
    it("should decode message if input has capital letters", () => {
      const input = "mbymwwmfj";
      const upperCaseInput = input.toUpperCase();
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "excellent";
      const actual = substitution(upperCaseInput, alphabet, false);
      expect(actual).to.equal(expected);
    });
    it("encode: should return empty string if input = empty string", () => {
      const input = "";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "";
      const actual = substitution(input, alphabet);
      expect(actual).to.equal(expected);
    });
    it("decode: should return empty string if input = empty string", () => {
      const input = "";
      const alphabet = "xoyqmcgrukswaflnthdjpzibev";
      const expected = "";
      const actual = substitution(input, alphabet, false);
      expect(actual).to.equal(expected);
    });
    describe("Substitution: Returning Null", () => {
      const testNumber = Math.floor(Math.random() * 100) + 1;

      it("encode: return null if input is null", () => {
        const alphabet = "xoyqmcgrukswaflnthdjpzibev";
        const actual = substitution(null, alphabet);
        expect(actual).to.be.null;
      });
      it("decode: return null if input is null", () => {
        const alphabet = "xoyqmcgrukswaflnthdjpzibev";
        const actual = substitution(null, alphabet, false);
        expect(actual).to.be.null;
      });
      it("encode: return null if input is undefined", () => {
        const alphabet = "xoyqmcgrukswaflnthdjpzibev";
        const actual = substitution(undefined, alphabet);
        expect(actual).to.be.null;
      });
      it("decode: return null if input is undefined", () => {
        const alphabet = "xoyqmcgrukswaflnthdjpzibev";
        const actual = substitution(undefined, alphabet, false);
        expect(actual).to.be.null;
      });
      it(`encode: return null if input is a number | test number: ${testNumber}`, () => {
        const alphabet = "xoyqmcgrukswaflnthdjpzibev";
        const actual = substitution(testNumber, alphabet);
        expect(actual).to.be.null;
      });
      it(`decode: return null if input is a number | test number: ${testNumber}`, () => {
        const alphabet = "xoyqmcgrukswaflnthdjpzibev";
        const actual = substitution(testNumber, alphabet, false);
        expect(actual).to.be.null;
      });
    });
  });

  // ================================ ERROR HANDLING ======================================

  describe("Substitution: Error Handling", () => {
    it("should return false if alphabet missing", () => {
      const input = "thinkful";
      const actual = substitution(input);
      expect(actual).to.be.false;
    });
    it("should return false if alphabet is not exactly 26 charachters", () => {
      const input = "thinkful";
      const alphabet = "short";
      const actual = substitution(input, alphabet);
      expect(actual).to.be.false;
    });
    it("should return false if alphabet inlcudes repeating characters", () => {
      const input = "thinkful";
      const alphabet = "abcabcabcabcabcabcabcabcyz";
      const actual = substitution(input, alphabet);
      expect(actual).to.be.false;
    });
    it("encode: should return false if encoder input entails symbols not in the normal aplhabet", () => {
      const encoderInput = "y&ii$r&";
      const alphabet = "$wae&zrdxtfcygvuhbijnokmpl";
      const actual = substitution(encoderInput, alphabet);
      expect(actual).to.be.false;
    });
    it("decode: should return false if decoder input entails symbols not in the modified aplhabet", () => {
      const decoderInput = "y@ii%r@";
      const alphabet = "$wae&zrdxtfcygvuhbijnokmpl";
      const actual = substitution(decoderInput, alphabet, false);
      expect(actual).to.be.false;
    });
  });
});
