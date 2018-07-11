const map: { [alphabet: string]: number } = {};

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
const alphabets = alphabet.split("");
const length = alphabets.length;

let i = 0;
let seed = 0;
let prev: string;

type YeastDecode = (str: string) => number;
type YeastEncode = (num: number) => string;

interface IYeast {
  (): string;
  encode: YeastEncode;
  decode: YeastDecode;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 */
function decode(str: string) {
  let decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 */
function encode(num: number) {
  let encoded = "";

  do {
    encoded = alphabets[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 */
const yeast: IYeast = Object.assign(
  () => {
    const now = encode(+new Date());

    if (now !== prev) {
      return (seed = 0), (prev = now);
    }
    return `${now}.${encode(seed++)}`;
  },
  { decode, encode }
);

//
// Map each character to its index.
//
for (; i < length; i++) {
  map[alphabets[i]] = i;
}

export default yeast;
